using FinancialManager.Api.Models;

namespace FinancialManager.Api.Repositories.Interfaces;

public interface ICreditCardRepository
{
    Task<IEnumerable<CreditCard>> GetAllAsync();
    Task<CreditCard?> GetByIdAsync(int id);
    Task<CreditCard> CreateAsync(CreditCard creditCard);
    Task<CreditCard> UpdateAsync(CreditCard creditCard);
    Task DeleteAsync(int id);
}