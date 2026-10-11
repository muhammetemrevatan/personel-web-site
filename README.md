# Personal website

Next.js portfolio and blog with Turkish / English content managed in PocketBase.

## Local development
Use Node.js 22.13+.
1. Run `npm ci`.
2. Run `docker compose up -d pocketbase`.
3. Copy `.env.example` to `.env.local`; set POCKETBASE_URL to `http://127.0.0.1:8090`.
4. Create a superuser using the installer link printed in `docker compose logs pocketbase`. Local port 8090 is loopback-only and bypasses the Access gateway for development.
5. Open `http://127.0.0.1:8090/_/` and manage content.
6. Run `npm run dev`.

## Publishing content
Collections are created automatically by tracked migrations.
- `projects`: title, slug, description, Markdown content, language, date, category, tags, cover, outcome, optional demo/source URLs, order.
- `posts`: title, slug, description, Markdown content, language, date, category, tags, cover.
- Select `tr` or `en`. Create a separate record for each translation, with a unique slug (e.g. `my-project-tr` / `my-project-en`).
- Tags are a JSON string array, e.g. `["backend", "product"]`.
- Set `published` to publish. Draft records are not publicly readable.
- Select `featured` on projects to show them on the home page. Smaller order values appear first.
- Project content can use headings such as Problem, Approach, My contribution, and Result.
- Existing six Markdown posts are imported once. Files in `content/blog` are retained as an archive; edits must now be made in PocketBase.
- Markdown supports tables and code fences. HTML and executable MDX are not supported.
- Uploaded covers are public assets; do not upload confidential images.
- Website reads use public rules, never admin credentials. Only superusers can write.
- Changes are loaded on each request; no website rebuild is needed.
- Language switch shows only published records in that language; translations are written by you.

## Dokploy
Keep the existing domain and application. Choose either configuration:

### Existing website application + separate PocketBase application
1. Add a PocketBase application in the same Dokploy environment, from this repository.
2. Build with `pocketbase/Dockerfile`, using `pocketbase` as the build context.
3. Route a CMS subdomain (e.g. `cms.muhammetemrevatan.com`) to port 8080 (the JWT gateway), never to the raw API port 8090.
4. Mount a persistent volume at `/pb/pb_data`.
5. On the website, set `POCKETBASE_URL=http://personalwebsite-pocketbase-7kxai3:8090`. Both applications share dokploy-network. Images are served through the website media route, so the protected CMS origin is never exposed to visitors.
6. Deploy PocketBase, create your superuser from its log installer link, then deploy the website using its existing Dockerfile (port 3000).

### Compose application
Use `compose.yaml`. Route website to port 3000. Production CMS traffic goes to gateway port 8080; 8090 is for the internal API only.
Set CF_ACCESS_ISSUER and CF_ACCESS_AUD on the PocketBase application when using the Access gateway. The supplied host port bindings are loopback-only for local use; Dokploy routes to container ports.
Do not deploy a second website to the same domain alongside your existing app without replacing the old routing.

### Operations
Enable scheduled PocketBase backups under Settings > Backups, ideally to an external S3 bucket. Back up before upgrades.
Never delete the `pocketbase_data` volume on redeploy.
Pin PocketBase version in its Dockerfile. The initial version is 0.40.5.
Dashboard schema changes generate migrations inside the running container: export and commit them before rebuilding, or the generated migration files will be lost (the database itself is in the persistent volume).
No Dokploy deployment has been performed by this checkout's changes.

## Validation
`npm run build` and `npx tsc --noEmit`.

## CMS security
The PocketBase image runs two listeners: raw API 8090 on the internal Docker network, and an Access gateway on 8080. Never publish raw port 8090 on the Internet. Dokploy domain routing must target 8080.
Set CF_ACCESS_ISSUER to https://YOUR-TEAM.cloudflareaccess.com and CF_ACCESS_AUD to the CMS application's audience. If settings or a valid Cloudflare JWT are missing, the gateway returns 403. It validates RS256 signature, issuer, audience, expiry, and required claims before forwarding any CMS request. PocketBase superuser login remains required.
Use the existing Cloudflare Tunnel for cms.muhammetemrevatan.com and an Access Allow policy limited to the owner's email. Direct origin requests without a signed Access JWT are also refused.
The website media proxy allows only projects/posts and only the published record's configured cover. Unpublishing a record also revokes the website cover route; no-store prevents browser/proxy cache retention.
Validate the gateway with node --test pocketbase/gateway/server.test.mjs (after npm ci --prefix pocketbase/gateway).