using Microsoft.AspNetCore.Mvc;
using FinancialManager.Api.Models;
using FinancialManager.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinancialManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountTypesController : ControllerBase
{
    private readonly FinancialContext _context;

    public AccountTypesController(FinancialContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AccountType>>> GetAccountTypes()
    {
        var accountTypes = await _context.AccountTypes.ToListAsync();
        return Ok(accountTypes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AccountType>> GetAccountType(int id)
    {
        var accountType = await _context.AccountTypes.FindAsync(id);
        
        if (accountType == null)
        {
            return NotFound();
        }

        return Ok(accountType);
    }
}