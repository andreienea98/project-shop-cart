# ProjectShopCart

A full-stack e-commerce application built with React, Node.js, Express, and MySQL, featuring session-based authentication and Stripe checkout integration.

**Live Demo:** [https://project-shop-cart.vercel.app](https://project-shop-cart.vercel.app)

**Backend API:** [Express REST API](https://project-shop-cart-api.onrender.com) *(deployed on Render)*

**Source Code:** [GitHub Repository](https://github.com/andreienea98/project-shop-cart)

## Features

- **Product Catalogue** — Browse, filter, and view individual product details.
- **Shopping Cart** — Add products, update quantities, remove items, and calculate the cart total.
- **User Authentication** — Register and log in using securely hashed passwords.
- **Session Management** — Server-side sessions stored in MySQL, with HTTP-only session cookies.
- **Checkout Integration** — Stripe Checkout for processing test payments.
- **Payment Verification** — Verify payment status through the backend before clearing the shopping cart.
- **Responsive UI** — Interface built with React and Tailwind CSS.
- **REST API** — Express endpoints for authentication and payment-related operations.

## Tech Stack

### Frontend
- React
- JavaScript
- React Router
- Tailwind CSS
- Context API
- Vite
- Stripe.js

### Backend
- Node.js
- Express
- REST API
- MySQL
- `mysql2`
- `express-session`
- `express-mysql-session`
- `bcrypt`
- `cors`
- Stripe API

### Database
- MySQL
- TiDB Cloud for the deployed database

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** TiDB Cloud
- **Payments:** Stripe (test mode)

## Architecture

The application separates the frontend, backend API, and database.

1. The React frontend provides the shopping interface and communicates with the backend through HTTP requests.
2. The Express backend handles authentication, session management, and payment-related requests.
3. MySQL stores application data, while the MySQL session store persists server-side authentication sessions.
4. Stripe Checkout handles the payment interface, and the backend verifies the resulting payment status.

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) or a compatible MySQL database
- [Git](https://git-scm.com/)
- A [Stripe account](https://stripe.com/) for testing checkout functionality

### Installation

Clone the repository:

```bash
git clone https://github.com/andreienea98/project-shop-cart.git
cd project-shop-cart
```

Install the frontend dependencies from the project root:

```bash
npm install
```

Install the backend dependencies:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=project_shop_cart
SESSION_SECRET=your_long_random_session_secret
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

Create a `.env` file in the project root for the frontend:

```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

Replace the example values with your own credentials. Use Stripe test-mode keys for local development.

**Important:** Never commit `.env` files or expose your Stripe secret key. Ensure they are included in `.gitignore`.

### Database Setup

Create the database:

```sql
CREATE DATABASE project_shop_cart;
```

Create the `users` table:

```sql
USE project_shop_cart;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The application also requires the `sessions` table used by `express-mysql-session`. The session store can create this table automatically when configured to do so.

Ensure any other tables required by the application's product and payment functionality are also created before running the application.

### Running Locally

Start the backend from the `backend` directory:

```bash
npm run dev
```

If you do not have a development script configured, you can start it with:

```bash
node server.js
```

The backend runs at:

[http://localhost:3000](http://localhost:3000)

Open a second terminal in the project root and start the frontend:

```bash
npm run dev
```

The frontend runs at:

[http://localhost:5173](http://localhost:5173)

## Authentication and Security

The application uses server-side session-based authentication rather than storing authentication tokens in browser storage.

- Passwords are hashed using bcrypt before being stored.
- Session data is persisted in MySQL.
- HTTP-only cookies help prevent client-side JavaScript from reading session cookies.
- CORS is configured to allow requests from the frontend origin.
- Payment status is checked through the backend.

The application is deployed for demonstration purposes. Stripe payments currently run in test mode, and the project should undergo further security review before being used in a real production business.

## Future Improvements

- Order persistence and order history
- Automated tests for API endpoints and authentication flows
- More comprehensive input validation and error handling
- Additional account and checkout security measures

## Author

**Andrei Enea**

- [GitHub](https://github.com/andreienea98)
