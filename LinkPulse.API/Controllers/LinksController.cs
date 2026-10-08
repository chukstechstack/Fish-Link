using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using LinkPulse.API.Models;

namespace LinkPulse.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LinksController(IConfiguration configuration) : ControllerBase
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found in appsettings.json.");

    // 1. Get ALL links (plural)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Link>>> GetLinks()
    {
        var links = new List<Link>();

        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "SELECT Id, Url, Title FROM Links";
        using var command = new MySqlCommand(query, connection);

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            links.Add(new Link
            {
                Id = reader.GetInt32("Id"),
                Url = reader.GetString("Url"),
                Title = reader.IsDBNull(reader.GetOrdinal("Title")) ? string.Empty : reader.GetString("Title")
            });
        }

        return links;
    }

    // 2. Get ONE link by ID (singular)
    [HttpGet("{id}")]
    public async Task<ActionResult<Link>> GetLink(int id)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "SELECT Id, Url, Title FROM Links WHERE Id = @id";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@id", id);

        using var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            var link = new Link
            {
                Id = reader.GetInt32("Id"),
                Url = reader.GetString("Url"),
                Title = reader.IsDBNull(reader.GetOrdinal("Title")) ? string.Empty : reader.GetString("Title")
            };
            return link;
        }

        return NotFound();
    }

    // 3. Post method using raw SQL
    [HttpPost]
    public async Task<ActionResult<Link>> PostLink(Link link)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = "INSERT INTO Links (Url, Title) VALUES (@Url, @Title); SELECT LAST_INSERT_ID();";
        using var command = new MySqlCommand(query, connection);

        command.Parameters.AddWithValue("@Url", link.Url);
        command.Parameters.AddWithValue("@Title", link.Title ?? (object)DBNull.Value);

        var newId = await command.ExecuteScalarAsync();
        if (newId != null)
        {
            link.Id = Convert.ToInt32(newId);
        }

        return CreatedAtAction(nameof(GetLink), new { id = link.Id }, link);
    }
}


// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using LinkPulse.API.Data;
// using LinkPulse.API.Models;
// using System.Runtime.Versioning;

// namespace LinkPulse.API.Controllers;

// [Route("api/[controller]")]
// [ApiController]
// public class LinksController(TiDbContext context) : ControllerBase
// {
//     // 1. Get ALL links (plural)
//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<Link>>> GetLinks()
//     {
//         return await context.Links.ToListAsync();
//     }

//     // 2. Get ONE link by ID (singular) - This is what CreatedAtAction points to!
//     [HttpGet("{id}")]
//     public async Task<ActionResult<Link>> GetLink(int id)
//     {
//         var link = await context.Links.FindAsync(id);
//         if (link == null) return NotFound();
//         return link;
//     }

//     // 3. Your Post method pointing to the singular lookup
//     [HttpPost]
//     public async Task<ActionResult<Link>> PostLink(Link link)
//     {
//         context.Links.Add(link);
//         await context.SaveChangesAsync();

//         // Notice it points to GetLink (singular) so the ID matches up!
//         return CreatedAtAction(nameof(GetLink), new { id = link.Id }, link);
//     }

// }
