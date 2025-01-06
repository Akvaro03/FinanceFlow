# FinanceFlow: Personal Finance Management Application

## Overview
**FinanceFlow** is a personal finance management application designed to help users track their expenses, monitor income, set financial goals, and gain insights into their financial health. The application leverages secure backend services built with .NET and integrates modern front-end frameworks for an intuitive user experience.

---

## Features

### 1. **Authentication and User Management**
- Secure user registration and login with encrypted passwords.
- Two-factor authentication for added security.
- Role-based access for standard and premium features.

### 2. **Expense and Income Tracking**
- Add, edit, or delete transactions categorized as income or expenses.
- Categorization of transactions (e.g., Food, Transport, Utilities, Entertainment).
- Recurring transactions with customizable intervals.

### 3. **Budget Planning**
- Set monthly or yearly budgets.
- Notifications for overspending or reaching budget thresholds.

### 4. **Financial Goals**
- Create and track progress towards financial goals (e.g., saving for a trip or emergency fund).
- Visual indicators to monitor goal completion.

### 5. **Data Visualization**
- Interactive dashboards with charts showing spending patterns, income trends, and budget adherence.
- Export data as PDF or CSV.

### 6. **Reports and Insights**
- Generate detailed reports for custom date ranges.
- Insights into spending habits and suggestions for savings.

### 7. **Cloud Sync and Multi-Device Support**
- Secure cloud storage for user data.
- Seamless synchronization across multiple devices.

---

## Architecture

### Backend
- Framework: .NET 6
- Database: SQL Server
- API: RESTful API with token-based authentication (JWT).

### Frontend
- Framework: React with TypeScript
- State Management: Redux
- UI Library: Material-UI

### Infrastructure
- Deployment: Docker containers hosted on AWS.
- CI/CD: GitHub Actions for automated testing and deployment.

---

## Palette of Colors

| **Element**           | **Color**       | **Hex**     |
|------------------------|-----------------|-------------|
| Primary Background    | Blue            | `#2C3E50`  |
| Accent Elements       | Green           | `#27AE60`  |
| Alerts and Highlights | Orange          | `#E67E22`  |
| Neutral Background    | Light Gray      | `#ECF0F1`  |
| Text                  | White           | `#FFFFFF`  |

---

## Installation

### Prerequisites
- .NET 6 SDK installed.
- SQL Server instance.
- Node.js and npm installed for frontend setup.
- Docker (optional for deployment).

### Steps
1. Clone the repository and navigate to the project folder.
2. Set up the backend by restoring dependencies and starting the server.
3. Set up the frontend by installing dependencies and running the application.
4. Configure the database by updating the connection string and running migrations.
5. Access the application in your browser.

---

## API Endpoints

### Authentication
- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Authenticate and retrieve a JWT token.

### Transactions
- **GET /api/transactions** - Retrieve all transactions for the logged-in user.
- **POST /api/transactions** - Add a new transaction.
- **PUT /api/transactions/{id}** - Update an existing transaction.
- **DELETE /api/transactions/{id}** - Delete a transaction. 

### Reports

- **GET /api/reports** - For a specified date range.

---

## Roadmap

1. **Phase 1**: Core features (authentication, transaction tracking, dashboards).
2. **Phase 2**: Budget planning and financial goals.
3. **Phase 3**: Cloud sync and advanced insights with AI-powered suggestions.

---

## Contribution

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes and push.
4. Open a pull request with a detailed description of your changes.

---


## Contact
For any inquiries or support, please contact:
- **Email**: alvaroballarini03@gmail.com
