# 🚀 Suggesto - Product Reco. System

**Live Site:** 🌐 [https://suggesto-product-reco.web.app/](https://suggesto-product-reco.web.app/)

## 📘 Project Overview

**Suggesto** is a full-featured Product Recommendation Platform where users can:
- Add, update, and delete product-related queries.
- View and explore other users' queries.
- Recommend alternative products to others.
- Manage their own queries, recommendations, and view suggestions made for them.

This project is built using **React**, **Firebase Auth**, **Express.js**, and **MongoDB**, and styled with **TailwindCSS**. It features JWT authentication, protected routes, and dynamic UI components.

---

## 🎯 Key Features

### ✅ Authentication & Authorization
- Email/Password and Google Sign-in (Firebase)
- JWT token generation and verification
- Conditional navigation rendering based on login status
- Protected/private routes

### ✅ Query Management
- Add, update, and delete personal queries
- View all public queries from all users
- Responsive card layout with layout toggle (1/2/3 column)
- Recommendation count displayed with each query

### ✅ Recommendation System
- Recommend alternative products on any query
- View and delete personal recommendations
- View recommendations made *for you* by others
- Live recommendation count updates (using MongoDB `$inc` operator)

### ✅ UI/UX
- Beautiful Home Page with slider
- Responsive and animative sections (using Framer Motion & Lottie)
- Loading spinners, toast notifications, confirmation modals
- Search functionality for queries (by product name)

---

## 🌐 Pages & Routes

### Public Routes
- `/` – Home page with slider & featured sections
- `/queries` – All public product queries
- `/login` & `/register` – Auth system with Google login

### Private Routes (JWT Protected)
- `/my-queries` – Manage your added queries
- `/add-query` – Add new product-related query
- `/update/:id` – Update specific query
- `/recommendations-for-me` – View others’ recommendations for you
- `/my-recommendations` – View and manage your own recommendations
- `/queries/:id` – View single query details & recommend a product

---

## 🛠️ Tech Stack

### Client
- **React**
- **React Router DOM**
- **Firebase Authentication**
- **Axios**
- **TailwindCSS + DaisyUI**
- **Framer Motion**
- **Lottie React**
- **React Icons**
- **React Tooltip**
- **SwiperJS Carousel**

### Server
- **Express.js**
- **MongoDB**
- **JWT**
- **CORS**
- **Dotenv**
- **Cookie Parser**

---

## 📦 NPM Packages Used

### Frontend
```bash
@tailwindcss/vite
axios
firebase
framer-motion
lottie-react
lucide-react
react
react-dom
react-icons
react-responsive-carousel
react-router
react-tooltip
sweetalert2
swiper
tailwindcss
