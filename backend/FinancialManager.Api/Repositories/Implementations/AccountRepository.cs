using Microsoft.EntityFrameworkCore;
using FinancialManager.Api.Data;
using FinancialManager.Api.Models;
using FinancialManager.Api.Repositories.Interfaces;

namespace FinancialManager.Api.Repositories.Implementations;

public class AccountRepository : IAccountRepository
{
    private readonly FinancialContext _context;

    public AccountRepository(FinancialContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Account>> GetAllAsync()
    {
        return await _context.Accounts
            .Include(a => a.AccountType)
            .Where(a => a.IsActive)
            .ToListAsync();
    }

    public async Task<Account?> GetByIdAsync(int id)
    {
        return await _context.Accounts
            .Include(a => a.AccountType)
            .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);
    }

    public async Task<Account> CreateAsync(Account account)
    {
        account.CreatedAt = DateTime.UtcNow;
        account.UpdatedAt = DateTime.UtcNow;
        
        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();
        
        return account;
    }

    public async Task<Account> UpdateAsync(Account account)
    {
        account.UpdatedAt = DateTime.UtcNow;
        
        _context.Entry(account).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        
        return account;
    }

    public async Task DeleteAsync(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account != null)
        {
            account.IsActive = false;
            account.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Account>> GetByAccountTypeAsync(int accountTypeId)
    {
        return await _context.Accounts
            .Include(a => a.AccountType)
            .Where(a => a.AccountTypeId == accountTypeId && a.IsActive)
            .ToListAsync();
    }
}