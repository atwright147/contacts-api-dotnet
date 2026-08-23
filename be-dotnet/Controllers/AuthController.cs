using contacts_api.Auth;
using contacts_api.Entities;
using contacts_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace contacts_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController(UserManager<ApplicationUser> userManager, ITokenService tokenService) : ControllerBase
  {
    // POST: api/Auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
      var existingUser = await userManager.FindByEmailAsync(request.Email);
      if (existingUser != null)
      {
        return BadRequest($"A user with email '{request.Email}' is already registered.");
      }

      var user = new ApplicationUser
      {
        FirstName = request.FirstName,
        LastName = request.LastName,
        UserName = request.Email,
        Email = request.Email
      };

      var result = await userManager.CreateAsync(user, request.Password);
      if (!result.Succeeded)
      {
        return BadRequest(result.Errors.Select(e => e.Description));
      }

      await userManager.AddToRoleAsync(user, Roles.User);

      return Ok("User registered successfully.");
    }

    // POST: api/Auth/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
      var user = await userManager.FindByEmailAsync(request.Email);

      // Returning the same Unauthorized response whether the user is missing or the
      // password is wrong prevents leaking which emails are registered (email enumeration).
      if (user == null || !await userManager.CheckPasswordAsync(user, request.Password))
      {
        return Unauthorized();
      }

      var roles = await userManager.GetRolesAsync(user);
      var (token, expiresAt) = tokenService.CreateToken(user, roles);

      return Ok(new AuthResponse(user.Id, user.Email!, roles, token, expiresAt));
    }
  }
}
