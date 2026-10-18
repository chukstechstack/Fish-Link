using MySqlConnector;

namespace LinkPulse.API.Services;

public record FolderDto(int Id, string Name);

public class FolderService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<IEnumerable<FolderDto>> GetAllAsync()
    {
        var folders = new List<FolderDto>();
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "SELECT Id, Name FROM Folders ORDER BY CreatedAt DESC";
        using var command = new MySqlCommand(query, connection);
        using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            folders.Add(new FolderDto(
                reader.GetInt32("Id"),
                reader.GetString("Name")
            ));
        }

        return folders;
    }

    public async Task<int> CreateAsync(string name)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "INSERT INTO Folders (Name, CreatedAt) VALUES (@Name, @CreatedAt); SELECT LAST_INSERT_ID();";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Name", name);
        command.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);

        var insertedId = await command.ExecuteScalarAsync();
        return Convert.ToInt32(insertedId);
    }
    public async Task<bool> UpdateAsync(int id, string name)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "UPDATE Folders SET Name = @Name WHERE Id = @Id";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Id", id);
        command.Parameters.AddWithValue("@Name", name);

        var rowsAffected = await command.ExecuteNonQueryAsync();
        return rowsAffected > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "DELETE FROM Folders WHERE Id = @Id";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Id", id);

        var rowsAffected = await command.ExecuteNonQueryAsync();
        return rowsAffected > 0;
    }
}