import { AccountType } from '../types/Account';

export default [
  {
    id: 1,
    name: "Savings",
    slug: "savings",
    description: "Savings accounts for emergency funds and long-term goals",
    icon: "💰"
  },
  {
    id: 2,
    name: "Checking",
    slug: "checking", 
    description: "Checking accounts for daily transactions and bill payments",
    icon: "🏦"
  },
  {
    id: 3,
    name: "Investment",
    slug: "investment",
    description: "Investment accounts including stocks, bonds, and mutual funds",
    icon: "📈"
  },
  {
    id: 4,
    name: "Cash",
    slug: "cash",
    description: "Physical cash and cash equivalents",
    icon: "💵"
  },
  {
    id: 5,
    name: "Retirement",
    slug: "retirement",
    description: "401k, IRA, and other retirement accounts",
    icon: "🏖️"
  }
] as AccountType[];