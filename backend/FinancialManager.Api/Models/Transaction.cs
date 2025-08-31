using System.ComponentModel.DataAnnotations;

namespace FinancialManager.Api.Models;

public class Transaction
{
    public int Id { get; set; }
    
    public int AccountId { get; set; }
    public Account Account { get; set; } = null!;
    
    [Range(double.MinValue, double.MaxValue)]
    public decimal Amount { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Description { get; set; } = string.Empty;
    
    [StringLength(50)]
    public string Category { get; set; } = string.Empty;
    
    public DateTime Date { get; set; }
    
    [Required]
    public TransactionType Type { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum TransactionType
{
    Income,
    Expense,
    Transfer
}