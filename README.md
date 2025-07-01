# 🎉 Event Manager - MERN Stack Web Application

A fully functional Event Management Web Application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This application supports custom authentication, dynamic event management, search and filter functionality, and an intuitive user interface.

## 🚀 Live Site
🔗 [Visit Event Manager](https://your-live-site-link.com)  

---

## 📌 Features

### 🔐 Custom Authentication (No Third-Party Auth Library)
- User Registration (Name, Email, Password, Photo URL)
- User Login with Email & Password
- Profile picture shown in the navbar when logged in
- Logout functionality
- Error messages for invalid credentials or missing fields

---

### 🧭 Navigation Bar
- Logo + Website Name
- Home
- Events (🔒 Private Route)
- Add Event (🔒 Private Route)
- My Event (🔒 Private Route)
- Sign In button (if not logged in)
- Profile picture with dropdown (if logged in):
  - Username (text only)
  - Logout button

---

### 🏠 Home Page
- Design is user-friendly and informative.
- Promotes event engagement.

---

### 📅 Events Page (🔒 Private)
- Displays **all events** in descending order (latest first)
- Event Cards include:
  - Title
  - Posted By
  - Date & Time
  - Location
  - Description
  - Attendee Count
  - `Join Event` Button
- Functionalities:
  - `Join Event` increases attendee count (once per user)
  - **Search** events by title
  - **Filter** by:
    - Today
    - This Week
    - Last Week
    - This Month
    - Last Month

---

### ➕ Add Event Page (🔒 Private)
- Form fields:
  - Event Title
  - Name
  - Date & Time
  - Location
  - Description
  - Attendee Count (default 0)
- Adds new event to the database on submission

---

### 📂 My Events Page (🔒 Private)
- Shows events posted by the logged-in user
- Each card includes:
  - Event details
  - `Update` button (modal or new route)
  - `Delete` button with confirmation

---

## 🧰 Technologies Used

### 💻 Frontend:
- React.js
- React Router
- Tailwind CSS + DaisyUI
- Axios
- React Query

### 🌐 Backend:
- Node.js
- Express.js
- MongoDB (Atlas)
- Custom Authentication using JWT and bcrypt

---

## 🔒 Authentication Overview

- Passwords are hashed using **bcrypt**
- JWT tokens are generated during login and verified in protected routes
- No external libraries (e.g., Firebase, Auth0) used for auth

---
