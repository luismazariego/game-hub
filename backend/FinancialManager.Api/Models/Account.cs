using System.ComponentModel.DataAnnotations;

namespace FinancialManager.Api.Models;

public class Account
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    public int AccountTypeId { get; set; }
    public AccountType AccountType { get; set; } = null!;
    
    [Range(0, double.MaxValue, ErrorMessage = "Balance must be positive")]
    public decimal Balance { get; set; }
    
    [Required]
    [StringLength(3)]
    public string Currency { get; set; } = "USD";
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}