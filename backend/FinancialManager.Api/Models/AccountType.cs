using System.ComponentModel.DataAnnotations;

namespace FinancialManager.Api.Models;

public class AccountType
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [StringLength(50)]
    public string Slug { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Description { get; set; } = string.Empty;
    
    [StringLength(10)]
    public string Icon { get; set; } = string.Empty;
    
    public ICollection<Account> Accounts { get; set; } = new List<Account>();
}