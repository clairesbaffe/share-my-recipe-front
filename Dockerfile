# BUILDER nodejs
FROM node:22 AS build

WORKDIR /src

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# RUNNER
FROM nginx

COPY --from=build /src/build /usr/share/nginx/html