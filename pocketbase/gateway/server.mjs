import http from "node:http";
import { spawn } from "node:child_process";
import { createRemoteJWKSet, jwtVerify } from "jose";

export function accessVerifier(issuer, audience, jwks) {
  return async token => {
    if (!issuer || !audience || !token || token.length > 16000) throw new Error("Access denied");
    return jwtVerify(token, jwks, { issuer, audience, algorithms: ["RS256"], requiredClaims: ["exp", "iat", "sub"], clockTolerance: 15 });
  };
}
export function createGateway(verify, upstream = "http://127.0.0.1:8090") {
  const target = new URL(upstream);
  return http.createServer(async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.url === "/gateway-health") { res.writeHead(200); res.end("ok"); return; }
    const token = req.headers["cf-access-jwt-assertion"];
    try {
      if (typeof token !== "string") throw new Error("Missing token");
      await verify(token);
    } catch { res.writeHead(403); res.end("Cloudflare Access authentication required."); return; }
    if (Number(req.headers["content-length"] || 0) > 12 * 1024 * 1024) { res.writeHead(413); res.end(); return; }
    const headers = { ...req.headers, host: target.host };
    delete headers["cf-access-jwt-assertion"];
    delete headers.connection;
    const request = http.request({
      hostname: target.hostname, port: target.port, path: req.url,
      method: req.method, headers, timeout: 300000,
    }, response => {
      res.writeHead(response.statusCode || 502, response.headers);
      response.pipe(res);
      response.on("error", () => res.destroy());
    });
    request.on("timeout", () => request.destroy());
    request.on("error", () => { if (!res.headersSent) res.writeHead(502); res.end("Content service unavailable."); });
    let size = 0;
    req.on("data", chunk => {
      size += chunk.length;
      if (size > 12 * 1024 * 1024) { request.destroy(); req.destroy(); }
    });
    req.on("aborted", () => request.destroy());
    res.on("close", () => { if (!res.writableFinished) request.destroy(); });
    req.pipe(request);
  });
}
if (process.env.GATEWAY_START === "1") {
  const issuer = (process.env.CF_ACCESS_ISSUER || "").replace(/\/$/, "");
  const audience = process.env.CF_ACCESS_AUD || "";
  if (issuer && !/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer)) throw new Error("Invalid Access issuer");
  const jwks = issuer ? createRemoteJWKSet(new URL(issuer + "/cdn-cgi/access/certs")) : null;
  const verify = jwks ? accessVerifier(issuer, audience, jwks) : async () => { throw new Error("Access not configured"); };
  const pb = spawn("/pb/pocketbase", ["serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations"], {stdio:"inherit"});
  const server = createGateway(verify);
  server.listen(8080, "0.0.0.0", () => console.log("CMS gateway listening on 8080; Access token required."));
  pb.on("exit", code => { server.close(); process.exit(code || 1); });
  for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, () => { pb.kill(signal); server.close(); });
}
