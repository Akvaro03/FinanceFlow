using FinanceFlowApi.Dto;
using FinanceFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceFlowApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FinanceFlowContext _context;

        public AuthController(FinanceFlowContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerDto)
        {
            if (registerDto == null)
                return BadRequest("Invalid user data.");

            // Validar si el correo ya existe
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                return BadRequest("Email is already in use.");

            // Crear hash para la contraseña (ejemplo simplificado)
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            // Crear el nuevo usuario
            var newUser = new User
            {
                FullName = registerDto.FullName,
                Email = registerDto.Email,
                PasswordHash = hashedPassword,
                RoleId = registerDto.RoleId,
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Register", new { id = newUser.UserId }, new
                {
                    newUser.UserId,
                    newUser.FullName,
                    newUser.Email,
                    RoleId = newUser.RoleId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

    }
}
