using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;
namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(RegisterUserService registerUserService) : ControllerBase
{
    // A quick data blueprint for what the frontend needs to send us
    public record RegisterRequest(string Email, string Password);

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // 1. Basic validation check
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Email and password are required." });
        }

        // 2. Call our service to check the DB and hash the password
        var success = await registerUserService.ExecuteAsync(request.Email, request.Password);

        // 3. Handle the result
        if (!success)
        {
            return BadRequest(new { message = "Email is already taken." });
        }

        // 4. Success! Send back a 201 Created status
        return StatusCode(201, new { message = "User registered successfully!" });
    }
}