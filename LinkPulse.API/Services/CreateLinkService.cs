
using MySqlConnector;

namespace LinkPulse.API.Services;

public class CreateLinkService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<int> ExecuteAsync(string url, string? title, string? category)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "INSERT INTO Links (Url, Title, Category, CreatedAt) VALUES (@Url, @Title, @Category, @CreatedAt); SELECT LAST_INSERT_ID();";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Url", url);
        command.Parameters.AddWithValue("@Title", (object?)title ?? DBNull.Value);
        command.Parameters.AddWithValue("@Category", (object?)category ?? string.Empty);
        command.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);

        var insertedId = await command.ExecuteScalarAsync();
        return Convert.ToInt32(insertedId);
    }
}