using FinancialManager.Api.Models;

namespace FinancialManager.Api.Repositories.Interfaces;

public interface IAccountRepository
{
    Task<IEnumerable<Account>> GetAllAsync();
    Task<Account?> GetByIdAsync(int id);
    Task<Account> CreateAsync(Account account);
    Task<Account> UpdateAsync(Account account);
    Task DeleteAsync(int id);
    Task<IEnumerable<Account>> GetByAccountTypeAsync(int accountTypeId);
}