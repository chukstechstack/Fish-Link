using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;

namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/links")]
public class UpdateLinkController(UpdateLinkService updateLinkService) : ControllerBase
{
    public record UpdateLinkRequest(string Url, string? Title, string? Category);

    [HttpPut("{id:int}")]
    public async Task<IActionResult> ExecuteAsync(int id, [FromBody] UpdateLinkRequest request)
    {
        var updated = await updateLinkService.ExecuteAsync(id, request.Url, request.Title, request.Category);

        if (!updated)
        {
            return NotFound(new { message = $"Link with ID {id} not found." });
        }

        return NoContent(); // 204 No Content is standard for a successful update
    }
}