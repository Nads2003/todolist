FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# variables vite qui sont injectées dans le build pas au runtime
ARG VITE_API_TITLE
ENV VITE_API_TITLE=$VITE_API_TITLE

RUN npm run build

#---- RUN ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD curl --fail http://localhost/ || exit 1
