using System.ComponentModel.DataAnnotations;

namespace FinancialManager.Api.Models;

public class CreditCard
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string Bank { get; set; } = string.Empty;
    
    [Required]
    [StringLength(4)]
    public string Last4Digits { get; set; } = string.Empty;
    
    [Range(0, double.MaxValue)]
    public decimal CreditLimit { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal CurrentBalance { get; set; }
    
    public DateTime DueDate { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal MinPayment { get; set; }
    
    [Range(0, 100)]
    public decimal InterestRate { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}