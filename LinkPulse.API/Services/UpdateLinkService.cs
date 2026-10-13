using MySqlConnector;

namespace LinkPulse.API.Services;

public class UpdateLinkService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<bool> ExecuteAsync(int id, string url, string? title, string? category)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "UPDATE Links SET Url = @Url, Title = @Title, Category = @Category WHERE Id = @Id";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Id", id);
        command.Parameters.AddWithValue("@Url", url);
        command.Parameters.AddWithValue("@Title", (object?)title ?? DBNull.Value);
        command.Parameters.AddWithValue("@Category", (object?)category ?? string.Empty);

        var rowsAffected = await command.ExecuteNonQueryAsync();
        return rowsAffected > 0;
    }
}