import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { generateKeyPair, SignJWT, exportJWK, createLocalJWKSet } from "jose";
import { accessVerifier, createGateway } from "./server.mjs";
const issuer = "https://test.cloudflareaccess.com", audience = "test-cms";
const {privateKey, publicKey} = await generateKeyPair("RS256");
const jwk = await exportJWK(publicKey);
jwk.kid = "test-key";
const verifier = accessVerifier(issuer, audience, createLocalJWKSet({keys:[jwk]}));
async function token(aud=audience, iss=issuer, exp="5m") {
 return new SignJWT({email:"owner@example.invalid"}).setProtectedHeader({alg:"RS256",kid:"test-key"}).setIssuer(iss).setAudience(aud).setSubject("owner").setIssuedAt().setExpirationTime(exp).sign(privateKey);
}
test("signed Access JWTs require the correct issuer, audience, expiry and signature",async()=>{
 await verifier(await token());
 await assert.rejects(verifier(await token("other-cms")));
 await assert.rejects(verifier(await token(audience,"https://other.cloudflareaccess.com")));
 await assert.rejects(verifier(await token(audience,issuer,"-2m")));
 await assert.rejects(verifier("forged"));
 await assert.rejects(verifier(undefined));
 const good=await token();
 const pieces=good.split(".");pieces[1]=Buffer.from(JSON.stringify({aud:audience,iss:issuer,exp:9999999999})).toString("base64url");
 await assert.rejects(verifier(pieces.join(".")));
});
test("gateway refuses direct access and streams authenticated requests to PocketBase",async()=>{
 const upstream=http.createServer((req,res)=>{assert.equal(req.headers["cf-access-jwt-assertion"],undefined);let body="";req.on("data",c=>body+=c);req.on("end",()=>res.end(req.url+" "+body));});
 await new Promise(r=>upstream.listen(0,"127.0.0.1",r));
 const gateway=createGateway(verifier,`http://127.0.0.1:${upstream.address().port}`);
 await new Promise(r=>gateway.listen(0,"127.0.0.1",r));
 const base=`http://127.0.0.1:${gateway.address().port}`;
 try {
  assert.equal((await fetch(base+"/_/")).status,403);
  assert.equal((await fetch(base+"/api/settings",{headers:{"Cf-Access-Jwt-Assertion":"forged"}})).status,403);
  const response=await fetch(base+"/api/example?x=1",{method:"POST",headers:{"Cf-Access-Jwt-Assertion":await token()},body:"payload"});
  assert.equal(response.status,200);assert.equal(await response.text(),"/api/example?x=1 payload");
  assert.equal((await fetch(base+"/gateway-health")).status,200);
 }finally{await Promise.all([new Promise(r=>gateway.close(r)),new Promise(r=>upstream.close(r))]);}
});
