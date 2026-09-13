# ---- Tahap 1: build aplikasi React dengan Vite ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Tahap 2: sajikan hasil build lewat Nginx ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Konfigurasi supaya routing React Router (/karya, /cerita, dst) tidak 404 saat refresh
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
