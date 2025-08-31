using Microsoft.EntityFrameworkCore;
using FinancialManager.Api.Models;

namespace FinancialManager.Api.Data;

public class FinancialContext : DbContext
{
    public FinancialContext(DbContextOptions<FinancialContext> options) : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
    public DbSet<AccountType> AccountTypes { get; set; }
    public DbSet<CreditCard> CreditCards { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure decimal precision
        modelBuilder.Entity<Account>()
            .Property(a => a.Balance)
            .HasPrecision(18, 2);

        modelBuilder.Entity<CreditCard>()
            .Property(c => c.CreditLimit)
            .HasPrecision(18, 2);

        modelBuilder.Entity<CreditCard>()
            .Property(c => c.CurrentBalance)
            .HasPrecision(18, 2);

        modelBuilder.Entity<CreditCard>()
            .Property(c => c.MinPayment)
            .HasPrecision(18, 2);

        modelBuilder.Entity<CreditCard>()
            .Property(c => c.InterestRate)
            .HasPrecision(5, 2);

        modelBuilder.Entity<Transaction>()
            .Property(t => t.Amount)
            .HasPrecision(18, 2);

        // Seed data
        modelBuilder.Entity<AccountType>().HasData(
            new AccountType { Id = 1, Name = "Savings", Slug = "savings", Description = "Savings accounts for emergency funds and long-term goals", Icon = "💰" },
            new AccountType { Id = 2, Name = "Checking", Slug = "checking", Description = "Checking accounts for daily transactions and bill payments", Icon = "🏦" },
            new AccountType { Id = 3, Name = "Investment", Slug = "investment", Description = "Investment accounts including stocks, bonds, and mutual funds", Icon = "📈" },
            new AccountType { Id = 4, Name = "Cash", Slug = "cash", Description = "Physical cash and cash equivalents", Icon = "💵" },
            new AccountType { Id = 5, Name = "Retirement", Slug = "retirement", Description = "401k, IRA, and other retirement accounts", Icon = "🏖️" }
        );
    }
}