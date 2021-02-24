FROM node:14-alpine AS builder
WORKDIR /app
COPY src ./src
COPY yarn.lock ./
COPY tsconfig.json tsconfig.build.json ./
COPY package.json ./package.json
RUN yarn install --frozen-lockfile
RUN yarn build


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/yarn.lock ./ 
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN yarn install --frozen-lockfile
EXPOSE 3001
CMD ["yarn", "start:prod"]



