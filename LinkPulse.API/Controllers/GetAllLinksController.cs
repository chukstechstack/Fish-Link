using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Models;
using LinkPulse.API.Services;

namespace LinkPulse.API.Controllers;

[Route("api/links")]
[ApiController]
public class GetAllLinksController(GetAllLinksService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Link>>> GetAll()
    {
        var links = await service.ExecuteAsync();
        return Ok(links);
    }
}