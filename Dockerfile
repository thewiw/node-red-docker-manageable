ARG NODE_VERSION=16
ARG NODE_RED_VERSION=3.0.2
FROM nodered/node-red:${NODE_RED_VERSION}-${NODE_VERSION}

LABEL org.opencontainers.image.created="2022/08/04" \
      org.opencontainers.image.authors="Damien SIRONI" \
      org.opencontainers.image.url="https://hub.docker.com/repository/docker/thewiwcorp/node-red-manageable" \
      org.opencontainers.image.documentation="https://github.com/thewiw/node-red-docker-manageable" \
      org.opencontainers.image.source="https://github.com/thewiw/node-red-docker-manageable" \
      org.opencontainers.image.version="0.0.1" \
      org.opencontainers.image.vendor="The WiW (contact@thewiw.com)" \
      org.opencontainers.image.licenses="Apache 2.0" \
      org.opencontainers.image.title="Easy to manage node red instance" \
      org.opencontainers.image.description="NodeRed container whose settings can be defined through environment variables" \
      org.opencontainers.image.base.name="nodered/${NODE_RED_VERSION}-${NODE_VERSION}"

COPY admin /admin/
COPY data/* /data/

RUN cp /usr/src/node-red/node_modules/node-red/settings.js /data/settings.js && \
    sed -i '$ a\\nObject.assign(module.exports,require("/admin/settings_manageable.js"))' /data/settings.js

