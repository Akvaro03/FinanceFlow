using System;
using System.Collections.Generic;

namespace FinanceFlowApi.Models
{
    public partial class User
    {
        public User()
        {
            Budgets = new HashSet<Budget>();
            Goals = new HashSet<Goal>();
            Transactions = new HashSet<Transaction>();
        }

        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Budget> Budgets { get; set; }
        public virtual ICollection<Goal> Goals { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
