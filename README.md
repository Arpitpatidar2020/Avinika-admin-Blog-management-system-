# 🚀 Avinika Blog Management System (MERN)

A robust, modern, and fully dynamic Blog Management System built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). This project provides a powerful Admin Dashboard for managing content and a seamless Frontend for public viewing.

---

## 🏗️ Project Architecture

The system is split into three main components:
-   **Backend**: Node.js & Express API with MongoDB for data persistence and Cloudinary for image management.
-   **Admin Frontend**: A secure React-based dashboard for content creators to manage blogs and profiles.
-   **Main Frontend**: A fast, public-facing website for readers to consume content.

---

## 🔥 Key Features

### 🛠️ Admin Dashboard
-   **Secure Authentication**: JWT-based login with persistent sessions.
-   **Dynamic Blog Editor**: Full-featured Rich Text Editor (Quill) with support for inline images, links, and formatting.
-   **Image Management**: Optimized image uploads with automatic Cloudinary synchronization.
-   **Auto-Cleanup**: Intelligent backend logic that automatically deletes old or unreferenced images from Cloudinary to save storage.
-   **Profile Synchronization**: Instant profile updates across the dashboard and header without page refreshes.

### 📝 Content Management
-   **Excerpt Support**: Automatic summary generation for blog listings.
-   **SEO Friendly**: Customizable slugs and descriptive metadata for better search rankings.
-   **Categorization**: Organize content by categories and tags for easier navigation.

---

## 🛠️ Tech Stack

**Backend:**
-   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
-   ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
-   ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
-   ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
-   ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white)

**Frontend:**
-   ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
-   ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
-   ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
-   ![Lucide React](https://img.shields.io/badge/Lucide_React-FFB13B?style=flat-square&logo=lucide&logoColor=white)

---

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js installed on your machine.
-   MongoDB Atlas account or local MongoDB instance.
-   Cloudinary account for image hosting.

### 1. Clone the repository
```bash
git clone https://github.com/Arpitpatidar2020/Avinika-admin-Blog-management-system-.git
cd Avinika-admin-Blog-management-system-
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the backend root:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup
```bash
# Repeat for both Admin and Main frontend
cd ../frontend
npm install
npm run dev
```

---

## 🔒 Security Features
-   Protected API routes with custom Auth middleware.
-   Input validation and sanitized content handling.
-   Secure image deletion policies to prevent unauthorized file removal.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author
**Arpit Patidar**
-   GitHub: [@Arpitpatidar2020](https://github.com/Arpitpatidar2020)
-   Website: [avinikasolution.in](https://avinikasolution.in)

---
*Developed with ❤️ by Avinika Solution*
