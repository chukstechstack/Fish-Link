using Microsoft.AspNetCore.Mvc;
using LinkPulse.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace LinkPulse.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
    RegisterUserService registerUserService,
    LoginUserService loginUserService,
    JwtTokenService jwtTokenService) : ControllerBase
{
    // --- Data Blueprints ---
    public record RegisterRequest(string Email, string Password);
    public record LoginRequest(string Email, string Password);

    // --- REGISTER ENDPOINT ---
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Email and password are required." });
        }

        var success = await registerUserService.ExecuteAsync(request.Email, request.Password);

        if (!success)
        {
            return BadRequest(new { message = "Email is already taken." });
        }

        return StatusCode(201, new { message = "User registered successfully!" });
    }

    // --- LOGIN ENDPOINT ---
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // 1. Basic validation check
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Email and password are required." });
        }

        // 2. Call our login service to check DB and verify password
        var isValidUser = await loginUserService.ExecuteAsync(request.Email, request.Password);

        // 3. Handle the result
        if (!isValidUser)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // 4. Generate the JWT token for the verified user
        var token = jwtTokenService.GenerateToken(request.Email);

        // 5. Success! Send back the token
        return Ok(new 
        { 
            message = "Login successful!", 
            token = token 
        });
    }

    // --- PROTECTED TEST ENDPOINT ---
    [HttpGet("me")]
    [Authorize]
    public IActionResult GetCurrentUser()
    {
        // Extract email from the claims inside the verified JWT token
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

        return Ok(new { message = $"You are authorized! Welcome back, {email}" });
    }
}