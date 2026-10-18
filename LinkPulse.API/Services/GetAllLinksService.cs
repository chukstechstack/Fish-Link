using MySqlConnector;
using LinkPulse.API.Models;

namespace LinkPulse.API.Services;

public class GetAllLinksService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<IEnumerable<Link>> ExecuteAsync()
    {
        var links = new List<Link>();

        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "SELECT Id, Url, Title, Category, CreatedAt FROM Links";
        using var command = new MySqlCommand(query, connection);

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            links.Add(new Link
            {
                Id = reader.GetInt32("Id"),
                Url = reader.GetString("Url"),
                Title = reader.IsDBNull(reader.GetOrdinal("Title")) ? null! : reader.GetString("Title"),
                Category = reader.IsDBNull(reader.GetOrdinal("Category")) ? string.Empty : reader.GetString("Category"),
                CreatedAt = reader.GetDateTime("CreatedAt")
            });
        }

        return links;
    }
}