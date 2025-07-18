# 🏠 Booking App – Airbnb Clone (MERN Stack)

This is a simple Airbnb-inspired booking application built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to sign up, log in, add their own accommodations, and make bookings with ease.

> ⚠️ This project was built as a learning project while exploring MERN stack development.

---

## 📁 Project Structure

```
Booking-App/
│
├── client/      # Frontend (React + Tailwind + Vite)
├── api/         # Backend (Node.js + Express + MongoDB)
└── README.md
```

---

## 🚀 Technologies Used

* **Frontend**: React, Vite, Tailwind CSS
* **Backend**: Node.js, Express
* **Database**: MongoDB
* **Other Tools**: Yarn, Nodemon

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/the-creative-one/Booking-App.git
cd Booking-App
```

### 2. Setup Frontend

```bash
cd client
yarn install
yarn dev
```

### 3. Setup Backend

```bash
cd ../api
npm install
nodemon index.js
```

Make sure MongoDB is running and connected.

---

## 💡 Features

### 🔐 Authentication

* User Signup / Login
* Logout functionality

### 🏘️ Add Accommodations

* Add title, description, location
* Upload photos (via gallery or URL)
* Set a cover image
* Delete uploaded images
* Add check-in/check-out time, max guests, price per night, extra info
* Edit existing accommodations (with auto-filled input fields)

### 🗓️ Booking

* Users can book by selecting check-in/out dates and number of guests
* Price auto-calculates based on stay
* Booking form collects name and phone number
* Name auto-filled for logged-in users

---

## 📸 Screenshots (Optional)

> *You can add screenshots of key pages like Add Accommodation, Booking Page, etc.*

---

## 🧠 What I Learned

This project helped me understand the basics of:

* Full-stack integration using MERN
* Authentication flow
* Form handling in React
* Working with Tailwind CSS
* Image upload handling and previewing
* MongoDB CRUD operations

---

## 📌 Notes

* This is a basic app intended for learning purposes.
* No payment gateway or real-time availability implemented.
* Built a year ago as a personal side project while learning.

---

## 📨 Feedback

If you have any feedback or suggestions, feel free to open an issue or drop me a message!
