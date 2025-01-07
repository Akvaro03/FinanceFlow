using System.ComponentModel.DataAnnotations;

namespace FinanceFlowApi.Dto
{
    public class RegisterUserDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string FullName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;

        [Required]
        public int RoleId { get; set; }
    }

}
