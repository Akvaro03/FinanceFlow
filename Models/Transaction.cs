using System;
using System.Collections.Generic;

namespace FinanceFlowApi.Models
{
    public partial class Transaction
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
