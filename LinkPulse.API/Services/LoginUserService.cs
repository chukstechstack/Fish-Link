using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;
using MySqlConnector;

namespace LinkPulse.API.Services;

public class LoginUserService(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.");

    public async Task<bool> ExecuteAsync(string email, string password)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        // 1. Fetch the stored password hash for this email
        var query = "SELECT PasswordHash FROM Users WHERE Email = @Email";
        using var command = new MySqlCommand(query, connection);
        command.Parameters.AddWithValue("@Email", email);

        var storedHashString = await command.ExecuteScalarAsync() as string;

        // If email doesn't exist in DB, fail safely
        if (string.IsNullOrEmpty(storedHashString))
        {
            return false;
        }

        // 2. Verify the typed password against the stored hash
        return VerifyPassword(password, storedHashString);
    }

    // Helper method to unpack the salt and check the Argon2id hash
    private static bool VerifyPassword(string enteredPassword, string storedHashString)
    {
        // Convert the Base64 string back into raw bytes (salt + hash combined)
        byte[] hashBytes = Convert.FromBase64String(storedHashString);

        // Extract the 16-byte salt from the front
        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        // Extract the 32-byte hash from the rest
        byte[] storedHash = new byte[32];
        Array.Copy(hashBytes, 16, storedHash, 0, 32);

        // Run the entered password through Argon2id using the extracted salt
        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(enteredPassword))
        {
            Salt = salt,
            DegreeOfParallelism = 2,
            MemorySize = 19456, // 19 MB (OWASP minimum)
            Iterations = 2
        };

        byte[] generatedHash = argon2.GetBytes(32);

        // Securely compare the newly generated hash with the stored hash
        return CryptographicOperations.FixedTimeEquals(generatedHash, storedHash);
    }
}