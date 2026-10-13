using MySqlConnector;

namespace LinkPulse.API.Services;

public class DeleteLinkService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<bool> ExecuteAsync(int id)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "DELETE FROM Links WHERE Id = @Id";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Id", id);

        var rowsAffected = await command.ExecuteNonQueryAsync();
        return rowsAffected > 0;
    }
}