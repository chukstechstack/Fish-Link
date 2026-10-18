using System.Text;
using DotNetEnv;
using LinkPulse.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

// Load the .env file from the project root before building the configuration
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Ensure ASP.NET Core reads environment variables (including those from .env)
builder.Configuration.AddEnvironmentVariables();

// 1. Register CORS Policy for the React Frontend
var allowedOrigins = new List<string> { "http://localhost:5173" };
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL");
if (!string.IsNullOrWhiteSpace(frontendUrl))
{
    allowedOrigins.Add(frontendUrl.TrimEnd('/'));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins.ToArray())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Register our Custom Services
builder.Services.AddScoped<RegisterUserService>();
builder.Services.AddScoped<LoginUserService>();
builder.Services.AddScoped<JwtTokenService>();


builder.Services.AddScoped<CreateLinkService>();
builder.Services.AddScoped<GetAllLinksService>();
builder.Services.AddScoped<FolderService>();
builder.Services.AddScoped<UpdateLinkService>();
builder.Services.AddScoped<DeleteLinkService>();

// 3. Configure JWT Authentication
var jwtSecret = builder.Configuration["JwtSettings:Secret"]
    ?? throw new InvalidOperationException("JWT Secret not found.");
var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

// 4. Enable CORS Middleware (Must be placed before Authentication and Authorization)
app.UseCors("AllowReactFrontend");

// 5. Enable Authentication & Authorization middleware (Order matters!)
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();