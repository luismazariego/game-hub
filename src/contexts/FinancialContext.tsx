import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Account, CreditCard, AccountType } from '../types/Account';
import initialAccounts from '../data/accounts';
import initialCreditCards from '../data/creditCards';

interface FinancialContextType {
  accounts: Account[];
  creditCards: CreditCard[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addCreditCard: (creditCard: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const useFinancialContext = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancialContext must be used within a FinancialProvider');
  }
  return context;
};

interface FinancialProviderProps {
  children: ReactNode;
}

export const FinancialProvider: React.FC<FinancialProviderProps> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [creditCards, setCreditCards] = useState<CreditCard[]>(initialCreditCards);

  const addAccount = (accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: Account = {
      ...accountData,
      id: Math.max(...accounts.map(a => a.id), 0) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const addCreditCard = (creditCardData: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCreditCard: CreditCard = {
      ...creditCardData,
      id: Math.max(...creditCards.map(c => c.id), 0) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCreditCards(prev => [...prev, newCreditCard]);
  };

  const value: FinancialContextType = {
    accounts,
    creditCards,
    addAccount,
    addCreditCard,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};