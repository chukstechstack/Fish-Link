# Stage 1: Build the .NET application
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Copy built app from build stage
COPY --from=build /app/publish .

# Set the entry point to your compiled API DLL (matching your project name)
ENTRYPOINT ["dotnet", "LinkPulse.API.dll"]