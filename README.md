# 🧾 Order Management System (Full Stack)

A full-stack Order Management System built using modern technologies like **React 19**, **Node.js (Express 5)**, and **Prisma ORM** with SQL database. The system allows managing **customers, products, and orders**, including stock tracking, order detail viewing, and dynamic UI updates with animation and notifications.

---

## 🚀 Tech Stack

| Layer     | Technology                                                                 |
|-----------|-----------------------------------------------------------------------------|
| Frontend  | React 19, Vite, TailwindCSS, DaisyUI, Axios, React Query, Framer Motion     |
| Backend   | Node.js (Express 5), Prisma ORM, SQL database                               |
| Auth/Utils| JSON Web Token (JWT), bcryptjs, dotenv, cors                                |
| UI/UX     | SweetAlert2, Lucide Icons, Animations with Framer Motion                    |

---

## ✨ Features

### 🧑‍💼 Customers
- Create new customers
- View all customers
- View customer order history

### 📦 Products
- Create, update, and delete products
- View list of products with stock counts

### 🛒 Orders
- Place orders with multiple products
- View order details (products, quantity, prices)
- Automatically update stock upon order placement

---

## 📁 Folder Structure

project-root/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── app.js
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── seed.js
│ ├── .env.example
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ └── App.jsx
├── public/
└── package.json


---

## ⚙️ Getting Started

### 🛠 Backend Setup

1. Go to the backend folder:
   ```bash
   cd backend

npm install

DATABASE_URL="your_sql_connection_string"

npx prisma migrate dev --name init
npx prisma db seed

npm run dev

By default, backend runs on: http://localhost:5000

🌐 Frontend Setup

cd frontend

npm install

npm run dev

By default, frontend runs on: http://localhost:5173

🔌 API Endpoints
Customers:
POST /api/customers – Add customer
GET /api/customers – List all customers
GET /api/customers/:id/orders – Get a customer’s order history

Products
POST /api/products – Add new product
PUT /api/products/:id – Update product
DELETE /api/products/:id – Delete product
GET /api/products – Get all products

Orders
POST /api/orders – Create an order
GET /api/orders/:id – Get order detail

🧠 Technologies Highlight

React 19 + Vite – Modern and fast frontend development
React Query – Smart data fetching and caching
Prisma ORM – Modern Type-safe SQL ORM
SweetAlert2 – Clean modal alerts for user actions
Framer Motion – Smooth UI animations
TailwindCSS + DaisyUI – Fast and responsive UI building
Lucide Icons – Minimal, clean icons
JWT + bcryptjs – Authentication-ready setup (future-proof)

👨‍💻 Author
Abdullah Al Akash
GitHub: @Abdullah-Al-Akash

