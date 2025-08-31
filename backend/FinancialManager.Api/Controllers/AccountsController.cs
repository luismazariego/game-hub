using Microsoft.AspNetCore.Mvc;
using FinancialManager.Api.Models;
using FinancialManager.Api.Repositories.Interfaces;

namespace FinancialManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly IAccountRepository _accountRepository;

    public AccountsController(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
    {
        var accounts = await _accountRepository.GetAllAsync();
        return Ok(accounts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> GetAccount(int id)
    {
        var account = await _accountRepository.GetByIdAsync(id);
        
        if (account == null)
        {
            return NotFound();
        }

        return Ok(account);
    }

    [HttpPost]
    public async Task<ActionResult<Account>> CreateAccount(Account account)
    {
        var createdAccount = await _accountRepository.CreateAsync(account);
        return CreatedAtAction(nameof(GetAccount), new { id = createdAccount.Id }, createdAccount);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAccount(int id, Account account)
    {
        if (id != account.Id)
        {
            return BadRequest();
        }

        var updatedAccount = await _accountRepository.UpdateAsync(account);
        return Ok(updatedAccount);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(int id)
    {
        await _accountRepository.DeleteAsync(id);
        return NoContent();
    }

    [HttpGet("by-type/{accountTypeId}")]
    public async Task<ActionResult<IEnumerable<Account>>> GetAccountsByType(int accountTypeId)
    {
        var accounts = await _accountRepository.GetByAccountTypeAsync(accountTypeId);
        return Ok(accounts);
    }
}