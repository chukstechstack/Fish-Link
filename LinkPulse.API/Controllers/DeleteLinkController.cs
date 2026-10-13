using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;

namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/links")]
public class DeleteLinkController(DeleteLinkService deleteLinkService) : ControllerBase
{
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> ExecuteAsync(int id)
    {
        var deleted = await deleteLinkService.ExecuteAsync(id);

        if (!deleted)
        {
            return NotFound(new { message = $"Link with ID {id} not found." });
        }

        return NoContent(); // 204 No Content on successful deletion
    }
}