FROM node:22-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache curl bash

RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL=/root/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH

WORKDIR /app

COPY . .
RUN bun install

EXPOSE 3000
CMD ["npm", "run", "dev"]
