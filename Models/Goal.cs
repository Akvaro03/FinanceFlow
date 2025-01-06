using System;
using System.Collections.Generic;

namespace FinanceFlowApi.Models
{
    public partial class Goal
    {
        public int GoalId { get; set; }
        public int UserId { get; set; }
        public string GoalName { get; set; } = null!;
        public decimal TargetAmount { get; set; }
        public decimal? CurrentAmount { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
