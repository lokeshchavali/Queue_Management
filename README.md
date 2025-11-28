# 🏥 Queue Management System – Full Stack Application

A full-stack **Queue Management System** designed for clinics and hospitals. It includes **Frontend**, **Admin Panel**, and **Backend** with real-time queue monitoring, appointment management, and doctor–patient workflows.

---

## 🚀 Features

### 👤 User
- Book appointments  
- View live queue status  
- Manage profile  
- Track appointment history  
- View recommended doctors  

### 🧑‍⚕️ Doctor
- Secure login  
- View daily appointments  
- Update appointment progress  
- View patient details  
- Doctor dashboard with analytics  

### 🛠️ Admin
- Add / remove doctors  
- Manage all appointments  
- View earnings and statistics  
- Complete admin dashboard interface  

### 🔧 Backend
- JWT authentication (Users, Doctors, Admin)  
- Queue monitoring (`queueMonitor.js`)  
- Email notifications (`emailService.js`)  
- Cloudinary image upload  
- Multer for file handling  
- MongoDB (Mongoose) database  

---

## 🏗️ Tech Stack

### Frontend & Admin (React)
- React.js  
- Vite.js  
- Tailwind CSS  
- Context API  

### Backend (Node.js)
- Node.js  
- Express.js  
- MongoDB / Mongoose  
- JWT  
- Cloudinary  
- Multer  

---

## 📂 Folder Structure
```
Queue_Management/
│── frontend/ # User app
│── admin/ # Admin panel
│── backend/ # Node.js API server
│── README.md
Queue_Management/
│── frontend/ # User app
│── admin/ # Admin panel
│── backend/ # Node.js API server
│── README.md


### Frontend (User)


frontend/src/
│── App.jsx
│── assets/
│── components/
│── context/
└── pages/


### Admin Panel


admin/src/
│── App.jsx
│── components/
│── context/
└── pages/


### Backend


backend/
│── server.js
│── config/
│── controllers/
│── middleware/
│── models/
│── routes/
└── services/

```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository


git clone https://github.com/lokeshchavali/Queue_Management.git

cd Queue_Management


---

### 2️⃣ Backend Setup


cd backend
npm install


Create `.env`:


MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD=xxx
CLOUDINARY_API=xxx
CLOUDINARY_SECRET=xxx
EMAIL_USER=xxx
EMAIL_PASS=xxx


Run backend:


npm start


---

### 3️⃣ Frontend Setup


cd ../frontend
npm install
npm run dev


---

### 4️⃣ Admin Panel Setup


cd ../admin
npm install
npm run dev

---

## 🔌 API Overview

### User APIs
- Register / Login  
- Book Appointment  
- View Appointments  

### Doctor APIs
- Login  
- View assigned patients  
- Update appointment status  

### Admin APIs
- Add doctor  
- Dashboard analytics  
- View all appointments  

---

## 📬 Services

### `emailService.js`
- Sends confirmations  
- Sends notifications  
- Handles queue updates  

### `queueMonitor.js`
- Tracks queue positions  
- Updates doctor-patient flow  

---

## 📊 Learning Outcomes
- MERN full-stack architecture  
- Real-world queue simulation  
- Creating role-based authentication  
- Building a multi-interface system  
- Image upload with Cloudinary  
- Email automation  
- Git & GitHub workflow  

---

## 🤝 Contributors
- **Lokesh Chavali** (Frontend + Backend)  
- **Rukesh** (Original base + Admin Panel)

---

## 📄 License
This project is open-source and free to use.
