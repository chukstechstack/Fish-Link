using MySqlConnector;
using LinkPulse.API.Models;

namespace LinkPulse.API.Services;

public class GetLinkByIdService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection") 
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<Link?> ExecuteAsync(int id)
    {
        // 1. Open the database connection
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        // 2. Setup the query with a safe parameter placeholder
        var query = "SELECT Id, Url, Title FROM Links WHERE Id = @Id";
        using var command = new MySqlCommand(query, connection);
        
        command.Parameters.AddWithValue("@Id", id);

        // 3. Execute the reader stream
        using var reader = await command.ExecuteReaderAsync();
        
        // 4. Explicitly wait for the reader, and store the true/false result in a boolean variable
        bool foundRow = await reader.ReadAsync();

        // 5. Evaluate the explicit boolean variable
        if (foundRow)
        {
            return new Link
            {
                Id = reader.GetInt32("Id"),
                Url = reader.GetString("Url"),
                Title = reader.IsDBNull(reader.GetOrdinal("Title")) ? null! : reader.GetString("Title")
            };
        }

        // 6. If foundRow was false, return null
        return null;
    }
}