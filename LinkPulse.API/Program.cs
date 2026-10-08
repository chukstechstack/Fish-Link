using LinkPulse.API.Services;

// 1. Create the server builder (The Setup Crew)
var builder = WebApplication.CreateBuilder(args);

// 2. Register our raw MySQL service for dependency injection
builder.Services.AddScoped<GetAllLinksService>();
builder.Services.AddScoped<GetLinkByIdService>();
// 3. Register controllers so your API can handle web routes
builder.Services.AddControllers();

// 4. Lock in the settings and build the app (The Server)
var app = builder.Build();

// 5. Map your controllers so incoming web requests can hit your code
app.MapControllers();

// 6. Turn the server ON and start listening for requests
app.Run();