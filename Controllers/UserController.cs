using FinanceFlowApi.Dto;
using FinanceFlowApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceFlowApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FinanceFlowContext _context;

        public UserController(FinanceFlowContext context)
        {
            _context = context;
        }

        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
                IList<User> result = _context.Users.ToList();
                return Ok(result);
        }
        // POST api/User
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] CreateUserDto newUserDto)
        {
            if (newUserDto == null)
            {
                return BadRequest("Invalid data.");
            }
            // Validación básica
            if (string.IsNullOrWhiteSpace(newUserDto.FullName) ||
                string.IsNullOrWhiteSpace(newUserDto.Email) ||
                string.IsNullOrWhiteSpace(newUserDto.PasswordHash))
            {
                return BadRequest("All fields are required.");
            }
            try
            {
                // Crear nuevo usuario a partir del DTO
                var newUser = new User
                {
                    RoleId = newUserDto.RoleId,
                    FullName = newUserDto.FullName,
                    Email = newUserDto.Email,
                    PasswordHash = newUserDto.PasswordHash,
                    CreatedAt = DateTime.UtcNow
                };

                // Agregar y guardar el usuario en la base de datos
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                // Retornar el recurso creado
                return CreatedAtAction(nameof(GetUserById), new { id = newUser.UserId }, newUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            using (FinanceFlowContext db = new FinanceFlowContext())
            {
                var user = await db.Users.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
        }

    }
}
