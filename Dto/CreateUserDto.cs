namespace FinanceFlowApi.Dto
{
    public class CreateUserDto
    {
        public int RoleId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
    }
}
