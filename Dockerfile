# ============================
# 1. Build ASP.NET API
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build_api
WORKDIR /src

COPY StudentAPI/ ./StudentAPI/
RUN dotnet restore StudentAPI/StudentAPI.csproj
RUN dotnet publish StudentAPI/StudentAPI.csproj -c Release -o /app/api

# ============================
# 2. Build React frontend
# ============================
FROM node:18 AS build_front
WORKDIR /src

COPY studentfront/ ./studentfront/
WORKDIR /src/studentfront
RUN npm install
RUN npm run build

# ============================
# 3. Final stage: Nginx + API
# ============================
FROM nginx:alpine

# Copy React build
COPY --from=build_front /src/studentfront/build /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy ASP.NET API
COPY --from=build_api /app/api /app/api

# Install ASP.NET runtime
RUN apk add --no-cache icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

EXPOSE 80

CMD ["sh", "-c", "dotnet /app/api/StudentAPI.dll & nginx -g 'daemon off;'"]
