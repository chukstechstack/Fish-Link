using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;

namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/links")]
public class CreateLinkController(CreateLinkService createLinkService) : ControllerBase
{
    public record CreateLinkRequest(string Url, string? Title, string? Category);

    [HttpPost]
    public async Task<IActionResult> ExecuteAsync([FromBody] CreateLinkRequest request)
    {
        var newId = await createLinkService.ExecuteAsync(request.Url, request.Title, request.Category);
        return StatusCode(201, new { id = newId, request.Url, request.Title, request.Category });
    }
}