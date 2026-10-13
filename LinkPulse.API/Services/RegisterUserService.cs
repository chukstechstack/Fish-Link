using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;
using MySqlConnector;

namespace LinkPulse.API.Services;

public class RegisterUserService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<bool> ExecuteAsync(string email, string password)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        // 1. Check if user already exists
        var checkQuery = "SELECT COUNT(1) FROM Users WHERE Email = @Email";
        using var checkCommand = new MySqlCommand(checkQuery, connection);
        checkCommand.Parameters.AddWithValue("@Email", email);
        
        var existingCount = Convert.ToInt32(await checkCommand.ExecuteScalarAsync());
        if (existingCount > 0)
        {
            return false; // Email is already taken
        }

        // 2. Hash the password securely with Argon2
        string passwordHash = HashPassword(password);

        // 3. Insert the new user into the database
        var insertQuery = "INSERT INTO Users (Email, PasswordHash) VALUES (@Email, @PasswordHash)";
        using var insertCommand = new MySqlCommand(insertQuery, connection);

        insertCommand.Parameters.AddWithValue("@Email", email);
        insertCommand.Parameters.AddWithValue("@PasswordHash", passwordHash);

        var rowsAffected = await insertCommand.ExecuteNonQueryAsync();
        return rowsAffected > 0;
    }

    // Helper method to handle the Argon2 cryptographic scrambling
    private string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(16); // 128-bit unique salt
        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = 2,
            MemorySize = 19456, // 19 MB (OWASP minimum recommendation)
            Iterations = 2
        };

        byte[] hash = argon2.GetBytes(32); // 256-bit hash

        // Combine salt and hash into a single byte array for easy storage
        byte[] hashBytes = new byte[salt.Length + hash.Length];
        Array.Copy(salt, 0, hashBytes, 0, salt.Length);
        Array.Copy(hash, 0, hashBytes, salt.Length, hash.Length);

        return Convert.ToBase64String(hashBytes);
    }
}