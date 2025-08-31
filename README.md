# Financial Manager - Personal Financial Management Application

A comprehensive personal financial management application built with React TypeScript (PWA) frontend and .NET 8 Web API backend.

## Features

- **Account Management**: Track savings, checking, investment, cash, and retirement accounts
- **Credit Card Management**: Monitor credit cards, limits, and balances
- **Dashboard**: Visual overview of all financial accounts and balances
- **PWA Support**: Install as mobile/desktop app with offline capabilities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **Chakra UI** for component library and styling
- **PWA** (Progressive Web App) capabilities
- **Axios** for API communication

### Backend
- **.NET 8** Web API
- **Entity Framework Core** for data access
- **SQL Server** database support
- **Clean Architecture** pattern
- **Repository Pattern** for data layer

## Project Structure

```
/
├── src/                          # Frontend React application
│   ├── components/               # React components
│   │   ├── Dashboard.tsx         # Main dashboard
│   │   ├── AccountCard.tsx       # Account display cards
│   │   ├── AccountsList.tsx      # Account type navigation
│   │   └── ...
│   ├── types/                    # TypeScript interfaces
│   ├── hooks/                    # Custom React hooks
│   ├── data/                     # Static data and sample data
│   └── services/                 # API communication
├── backend/                      # .NET 8 Web API
│   └── FinancialManager.Api/
│       ├── Controllers/          # API controllers
│       ├── Models/               # Data models
│       ├── Data/                 # Entity Framework DbContext
│       ├── Repositories/         # Repository pattern implementation
│       └── Services/             # Business logic services
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **.NET 8 SDK**
- **SQL Server** or **SQL Server LocalDB**

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/FinancialManager.Api
```

2. Update the connection string in `appsettings.json` if needed:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=FinancialManagerDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

3. Create and apply database migrations:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

4. Run the API:
```bash
dotnet run
```

The API will be available at `https://localhost:7000` (HTTPS) and `http://localhost:5000` (HTTP)

### API Documentation

When running in development mode, Swagger UI is available at:
- `https://localhost:7000/swagger`

## API Endpoints

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Soft delete account
- `GET /api/accounts/by-type/{accountTypeId}` - Get accounts by type

### Account Types
- `GET /api/accounttypes` - Get all account types
- `GET /api/accounttypes/{id}` - Get account type by ID

## Database Schema

### AccountTypes
- Id (int, PK)
- Name (string)
- Slug (string)
- Description (string)
- Icon (string)

### Accounts
- Id (int, PK)
- Name (string)
- AccountTypeId (int, FK)
- Balance (decimal)
- Currency (string)
- Description (string)
- IsActive (bool)
- CreatedAt (datetime)
- UpdatedAt (datetime)

### CreditCards
- Id (int, PK)
- Name (string)
- Bank (string)
- Last4Digits (string)
- CreditLimit (decimal)
- CurrentBalance (decimal)
- DueDate (datetime)
- MinPayment (decimal)
- InterestRate (decimal)
- IsActive (bool)
- CreatedAt (datetime)
- UpdatedAt (datetime)

### Transactions
- Id (int, PK)
- AccountId (int, FK)
- Amount (decimal)
- Description (string)
- Category (string)
- Date (datetime)
- Type (enum: Income, Expense, Transfer)
- CreatedAt (datetime)

## PWA Features

- **Installable**: Can be installed on mobile devices and desktop
- **Offline capable**: Works offline with cached data
- **Responsive**: Adapts to different screen sizes
- **App-like experience**: Native app feel

## Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production  
npm run preview      # Preview production build
```

### Backend Development
```bash
dotnet run           # Run API in development
dotnet build         # Build the project
dotnet test          # Run tests (when added)
```

## Future Enhancements

- User authentication and authorization
- Transaction management and history
- Budget planning and tracking
- Financial reports and analytics
- Data import/export functionality
- Multi-currency support
- Bank account integration
- Investment portfolio tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.