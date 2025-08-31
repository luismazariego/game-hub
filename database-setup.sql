-- Create database for Financial Manager
-- This script can be used for both SQL Server and PostgreSQL with minor modifications

-- For SQL Server
CREATE DATABASE FinancialManagerDb;
GO

USE FinancialManagerDb;
GO

-- Account Types table
CREATE TABLE AccountTypes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Slug NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(200) NOT NULL,
    Icon NVARCHAR(10) NOT NULL
);

-- Accounts table
CREATE TABLE Accounts (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    AccountTypeId INT NOT NULL,
    Balance DECIMAL(18,2) NOT NULL DEFAULT 0,
    Currency NVARCHAR(3) NOT NULL DEFAULT 'USD',
    Description NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    FOREIGN KEY (AccountTypeId) REFERENCES AccountTypes(Id)
);

-- Credit Cards table
CREATE TABLE CreditCards (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Bank NVARCHAR(100) NOT NULL,
    Last4Digits NVARCHAR(4) NOT NULL,
    CreditLimit DECIMAL(18,2) NOT NULL,
    CurrentBalance DECIMAL(18,2) NOT NULL DEFAULT 0,
    DueDate DATETIME2 NOT NULL,
    MinPayment DECIMAL(18,2) NOT NULL,
    InterestRate DECIMAL(5,2) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Transactions table
CREATE TABLE Transactions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AccountId INT NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    Description NVARCHAR(200) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Date DATETIME2 NOT NULL,
    Type INT NOT NULL, -- 0=Income, 1=Expense, 2=Transfer
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    FOREIGN KEY (AccountId) REFERENCES Accounts(Id)
);

-- Insert seed data for Account Types
INSERT INTO AccountTypes (Name, Slug, Description, Icon) VALUES
('Savings', 'savings', 'Savings accounts for emergency funds and long-term goals', '💰'),
('Checking', 'checking', 'Checking accounts for daily transactions and bill payments', '🏦'),
('Investment', 'investment', 'Investment accounts including stocks, bonds, and mutual funds', '📈'),
('Cash', 'cash', 'Physical cash and cash equivalents', '💵'),
('Retirement', 'retirement', '401k, IRA, and other retirement accounts', '🏖️');

-- Insert sample accounts
INSERT INTO Accounts (Name, AccountTypeId, Balance, Description) VALUES
('Emergency Fund', 1, 15000.00, '6-month emergency fund'),
('Main Checking', 2, 3500.75, 'Primary checking account'),
('Stock Portfolio', 3, 45000.25, 'Diversified stock portfolio'),
('Wallet Cash', 4, 250.00, 'Cash in wallet'),
('401k', 5, 75000.00, 'Company 401k plan');

-- Create indexes for better performance
CREATE INDEX IX_Accounts_AccountTypeId ON Accounts(AccountTypeId);
CREATE INDEX IX_Accounts_IsActive ON Accounts(IsActive);
CREATE INDEX IX_Transactions_AccountId ON Transactions(AccountId);
CREATE INDEX IX_Transactions_Date ON Transactions(Date);
CREATE INDEX IX_CreditCards_IsActive ON CreditCards(IsActive);

GO