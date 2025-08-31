import { CreditCard } from '../types/Account';

export default [
  {
    id: 1,
    name: "Chase Sapphire Preferred",
    bank: "Chase Bank",
    last4Digits: "1234",
    creditLimit: 10000.00,
    currentBalance: 2500.75,
    dueDate: new Date('2024-02-15'),
    minPayment: 50.00,
    interestRate: 18.99,
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: "Capital One Venture",
    bank: "Capital One",
    last4Digits: "5678",
    creditLimit: 15000.00,
    currentBalance: 1200.25,
    dueDate: new Date('2024-02-20'),
    minPayment: 35.00,
    interestRate: 22.99,
    isActive: true,
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 3,
    name: "Discover it Cash Back",
    bank: "Discover",
    last4Digits: "9012",
    creditLimit: 5000.00,
    currentBalance: 0.00,
    dueDate: new Date('2024-02-10'),
    minPayment: 0.00,
    interestRate: 16.99,
    isActive: true,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-15')
  }
] as CreditCard[];