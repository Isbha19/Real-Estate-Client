FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

RUN npm install -g @angular/cli

COPY . .

RUN npm run build-prod

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/Real-Estate-Client/browser /usr/share/nginx/html

EXPOSE 80

