using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;
using LinkPulse.API.Models;

namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/links")]
public class GetLinkByIdController(GetLinkByIdService getLinkByIdService) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Link>> ExecuteAsync(int id)
    {
        // 1. Call the specific service for this request
        var link = await getLinkByIdService.ExecuteAsync(id);

        // 2. Handle the 404 if the link doesn't exist
        if (link == null)
        {
            return NotFound(new { message = $"Link with ID {id} not found." });
        }

        // 3. Return 200 OK with the payload
        return Ok(link);
    }
}