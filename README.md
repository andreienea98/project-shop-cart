# ProjectShopCart

A full-stack e-commerce application built with React, Node.js, Express and MySQL.

## Features

* Browse and filter products
* View individual product details
* Add, remove and update products in the cart
* User registration and login
* Session-based authentication
* Protected authentication endpoints
* Responsive interface

## Technologies

### Frontend

* React
* JavaScript
* React Router
* Tailwind CSS
* Context API
* Vite

### Backend

* Node.js
* Express
* MySQL
* Express Session
* Express MySQL Session
* bcrypt
* REST API

## Getting Started

### Requirements

* Node.js
* MySQL
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/andreienea98/project-shop-cart.git
cd project-shop-cart
```

Install the frontend dependencies:

```bash
npm install
```

Install the backend dependencies:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=project_shop_cart
SESSION_SECRET=your_session_secret
```

### Database Setup

Create the database and `users` table in MySQL:

```sql
CREATE DATABASE project_shop_cart;

USE project_shop_cart;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The application uses `express-mysql-session` to store authentication sessions in MySQL.

### Running the Application

Start the backend:

```bash
cd backend
node server.js
```

The backend API runs on:

```text
http://localhost:3000
```

Open a separate terminal in the project root and start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Authentication

Authentication uses server-side sessions. User sessions are stored in MySQL, while the React frontend uses Context API to keep track of the current authentication state.

## Status

This project is currently under development as I continue building and expanding the application.

## Author

Andrei Enea

[GitHub](https://github.com/andreienea98)
