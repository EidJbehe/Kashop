# Kashop 🛒

Kashop is a modern **Front-End E-commerce web application** built with **React + Vite**. The project consumes a ready-made API provided by a supervisor and focuses on **clean architecture**, **secure authentication**, and a smooth, production-like user experience.

This project demonstrates real-world front-end practices, including **token-based authentication with refresh token handling**, scalable state management, and responsive UI design.

---

## 🌐 Live Demo

> *Coming soon* (can be deployed easily to Vercel / Netlify)

---

## 🚀 Features

* User authentication (Login / Logout)
* Secure token-based authentication using **Access Token & Refresh Token**
* Automatic access token refresh without forcing user re-login
* Product listing and category browsing
* Shopping cart functionality (add / update / remove items)
* Multi-language support (**Arabic / English**) with RTL & LTR handling
* Fully responsive UI using **Material UI (MUI)**
* Global client-side state management with **Zustand**
* Server-state management, caching, and refetching using **React Query**

---

## 🧱 Tech Stack

* **React** (Vite)
* **JavaScript (ES6+)**
* **Material UI (MUI)**
* **Zustand** – lightweight global state management
* **React Query (@tanstack/react-query)** – server-state handling
* **Axios** – centralized HTTP client

---

## 🔐 Authentication & Security Flow

The application uses a modern **JWT-based authentication strategy** designed to balance security and user experience.

### 🔑 Tokens Used

* **Access Token**

  * Short-lived
  * Attached to every authenticated API request

* **Refresh Token**

  * Long-lived
  * Securely used to request a new Access Token when the current one expires

### 🔄 How the Flow Works

1. User logs in successfully
2. API returns an **Access Token** and a **Refresh Token**
3. Access Token is automatically attached to outgoing API requests
4. If an API request returns a `401 Unauthorized` response:

   * The Refresh Token is used to request a new Access Token
   * The expired request is retried automatically
   * The user remains logged in without interruption
5. If token refresh fails, the user is logged out securely

This flow ensures:

* Improved security
* Seamless user experience
* No unnecessary re-authentication

---

## 📂 Project Structure

```text
├───Api
├───assets
│   ├───components
│   │   ├───categories
│   │   ├───footer
│   │   ├───navbar
│   │   │   └───navbarImages
│   │   └───product
│   ├───pages
│   │   ├───about
│   │   ├───cart
│   │   ├───chekout
│   │   ├───contact
│   │   ├───home
│   │   ├───login
│   │   ├───profile
│   │   ├───proudcts
│   │   ├───register
│   │   ├───resetPassword
│   │   └───sendCode
│   ├───store
│   └───validations
├───hooks
├───layout
└───utils
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/EidJbehe/Kashop.git
```

2. Navigate to the project directory:

```bash
cd Kashop
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

---

## 🌍 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=YOUR_API_URL_HERE
```

---

## 🧪 Code Quality & Best Practices

* Clean and modular component architecture
* Clear separation of UI, logic, and data layers
* Centralized API handling with Axios interceptors
* Secure and scalable authentication flow
* Predictable global state with Zustand
* Consistent naming conventions and file organization

---

## 🤔 Why These Tools?

* **Zustand**: Minimal boilerplate with powerful global state control
* **React Query**: Handles caching, refetching, and server-state efficiently
* **Axios**: Centralized request/response handling with interceptors
* **MUI**: Fast UI development with excellent RTL support

---

## 📌 Future Improvements

* Migrate to **TypeScript** for stronger type safety
* Add unit and integration tests (Jest / React Testing Library)
* Improve error handling and feedback UI
* Add loading skeletons and empty states
* Implement product details and checkout flow
* Add role-based access control (RBAC)

---

## 👤 Author

**Eid Jbehe**
Front-End Developer
Passionate about building scalable, secure, and user-friendly web applications

---

## ⭐ Notes

This project was built for learning and training purposes and reflects real-world front-end development patterns, particularly in authentication, API handling, and scalable application structure.
