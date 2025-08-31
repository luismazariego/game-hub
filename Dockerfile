# Frontend (React + Vite)
FROM node:18-alpine as frontend
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Backend (.NET 8)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY ["backend/FinancialManager.Api/FinancialManager.Api.csproj", "backend/FinancialManager.Api/"]
RUN dotnet restore "backend/FinancialManager.Api/FinancialManager.Api.csproj"
COPY backend/ backend/
WORKDIR "/src/backend/FinancialManager.Api"
RUN dotnet build "FinancialManager.Api.csproj" -c Release -o /app/build

FROM backend-build AS publish
RUN dotnet publish "FinancialManager.Api.csproj" -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=frontend /app/frontend/dist ./wwwroot
ENTRYPOINT ["dotnet", "FinancialManager.Api.dll"]