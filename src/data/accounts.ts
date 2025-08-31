import { Account } from '../types/Account';

export default [
  {
    id: 1,
    name: "Emergency Fund",
    accountType: { id: 1, name: "Savings", slug: "savings", description: "Savings accounts", icon: "💰" },
    balance: 15000.00,
    currency: "USD",
    description: "6-month emergency fund",
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: "Main Checking",
    accountType: { id: 2, name: "Checking", slug: "checking", description: "Checking accounts", icon: "🏦" },
    balance: 3500.75,
    currency: "USD", 
    description: "Primary checking account",
    isActive: true,
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 3,
    name: "Stock Portfolio",
    accountType: { id: 3, name: "Investment", slug: "investment", description: "Investment accounts", icon: "📈" },
    balance: 45000.25,
    currency: "USD",
    description: "Diversified stock portfolio",
    isActive: true,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 4,
    name: "Wallet Cash",
    accountType: { id: 4, name: "Cash", slug: "cash", description: "Physical cash", icon: "💵" },
    balance: 250.00,
    currency: "USD",
    description: "Cash in wallet",
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 5,
    name: "401k",
    accountType: { id: 5, name: "Retirement", slug: "retirement", description: "Retirement accounts", icon: "🏖️" },
    balance: 75000.00,
    currency: "USD",
    description: "Company 401k plan",
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15')
  }
] as Account[];