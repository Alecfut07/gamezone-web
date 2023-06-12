# Stage 1
FROM node:20.1.0-alpine AS builder

ARG BASE_URL_ARG

ENV REACT_APP_BASE_URL=$BASE_URL_ARG

ARG STRIPE_PUBLISHABLE_KEY_ARG

ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY_ARG

ARG STRIPE_SECRET_KEY_ARG

ENV REACT_APP_STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY_ARG

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run build


# Stage 2
FROM nginx:1.25.0-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
