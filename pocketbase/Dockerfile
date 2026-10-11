FROM alpine:3.22 AS pocketbase
ARG PB_VERSION=0.40.5
ARG TARGETARCH=amd64
RUN apk add --no-cache ca-certificates unzip wget
RUN wget -q "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" -O /tmp/pb.zip \
    && unzip /tmp/pb.zip -d /pb && rm /tmp/pb.zip

FROM node:22-alpine
WORKDIR /gateway
COPY gateway/package.json gateway/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY gateway/server.mjs ./
COPY --from=pocketbase /pb/pocketbase /pb/pocketbase
COPY pb_migrations /pb/pb_migrations
ENV GATEWAY_START=1
# 8090 remains internal: website reads published content on the Docker network.
# Route the CMS hostname ONLY to 8080, which validates Cloudflare Access JWTs.
EXPOSE 8080
CMD ["node", "server.mjs"]
