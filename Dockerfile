# Stage 1
FROM node:20.1.0-alpine AS builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run build


# Stage 2
FROM node:20.1.0-alpine AS final

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 3000

RUN npm install -g serve

CMD serve -n -l 3000