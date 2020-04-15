# setup stage
FROM node:lts-alpine as setup-stage
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .

# build stage
FROM setup-stage as build-stage
ENV NODE_ENV=production
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

