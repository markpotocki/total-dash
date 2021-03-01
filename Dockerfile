FROM node:alpine AS angular-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

FROM nginx:alpine
COPY --from=angular-build /app/dist/total-dashboard /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
EXPOSE 80
