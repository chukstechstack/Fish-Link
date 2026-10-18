using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;
using MySqlConnector;

namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/folders")]
public class FoldersController(FolderService folderService) : ControllerBase
{
    public record CreateFolderRequest(string Name);
    public record UpdateFolderRequest(string Name);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var folders = await folderService.GetAllAsync();
        return Ok(folders);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFolderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "Folder name is required." });
        }

        try
        {
            var id = await folderService.CreateAsync(request.Name.Trim());
            return StatusCode(201, new { id, name = request.Name.Trim() });
        }
        catch (MySqlException ex) when (ex.Number == 1062) // Duplicate entry error code
        {
            return BadRequest(new { message = "A folder with this name already exists." });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateFolderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "Folder name is required." });
        }

        try
        {
            var updated = await folderService.UpdateAsync(id, request.Name.Trim());
            if (!updated)
            {
                return NotFound(new { message = $"Folder with ID {id} not found." });
            }
            return NoContent();
        }
        catch (MySqlException ex) when (ex.Number == 1062)
        {
            return BadRequest(new { message = "A folder with this name already exists." });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await folderService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = $"Folder with ID {id} not found." });
        }
        return NoContent();
    }
}