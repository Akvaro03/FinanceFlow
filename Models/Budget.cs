using System;
using System.Collections.Generic;

namespace FinanceFlowApi.Models
{
    public partial class Budget
    {
        public int BudgetId { get; set; }
        public int UserId { get; set; }
        public string Category { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
