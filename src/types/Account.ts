export interface Account {
  id: number;
  name: string;
  accountType: AccountType;
  balance: number;
  currency: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountType {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface CreditCard {
  id: number;
  name: string;
  bank: string;
  last4Digits: string;
  creditLimit: number;
  currentBalance: number;
  dueDate: Date;
  minPayment: number;
  interestRate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: number;
  accountId: number;
  amount: number;
  description: string;
  category: string;
  date: Date;
  type: 'income' | 'expense' | 'transfer';
}