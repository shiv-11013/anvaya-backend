# CRM Backend API

Backend API for a CRM (Customer Relationship Management) system built with Node.js, Express.js, MongoDB, JWT Authentication, and Mongoose.

## Features

* User Registration and Login
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Lead Management
* Agent Management
* Lead Comments System
* Filtering Leads
* MongoDB Integration
* Password Hashing with bcryptjs
* Global Error Handling

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv

---

# Project Structure

```bash
crm-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── agentController.js
│   ├── authController.js
│   └── leadController.js
│
├── middleware/
│   ├── asyncHandler.js
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── Agent.js
│   ├── Lead.js
│   └── User.js
│
├── routes/
│   ├── agentRoutes.js
│   ├── authRoutes.js
│   └── leadRoutes.js
│
├── .env
├── .gitignore
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

## 2. Move Into Project Folder

```bash
cd crm-backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create .env File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

# Start Server

```bash
npm run dev
```

or

```bash
node server.js
```

---

# API Base URL

```bash
http://localhost:5000
```

---

# Authentication Routes

Base URL:

```bash
/api/auth
```

---

## Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Shiv",
  "email": "shiv@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

### Response

```json
{
  "_id": "user_id",
  "name": "Shiv",
  "email": "shiv@gmail.com",
  "role": "admin",
  "token": "jwt_token"
}
```

---

## Login User

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "shiv@gmail.com",
  "password": "123456"
}
```

---

# Agent Routes

Base URL:

```bash
/api/agents
```

## Get Agents

```http
GET /api/agents
```

## Create Agent

```http
POST /api/agents
```

### Request Body

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

---

# Lead Routes

Base URL:

```bash
/api/leads
```

---

## Get All Leads

```http
GET /api/leads
```

### Query Parameters

```bash
?status=New
?agent=Rahul
?source=Website
```

---

## Get Single Lead

```http
GET /api/leads/:id
```

---

## Create Lead

```http
POST /api/leads
```

### Request Body

```json
{
  "leadName": "John Doe",
  "leadSource": "Website",
  "assignedAgent": "Rahul",
  "leadStatus": "New",
  "tag": "Hot Lead",
  "priority": "High",
  "timeToClose": 10
}
```

---

## Update Lead

```http
PATCH /api/leads/:id
```

---

## Delete Lead

```http
DELETE /api/leads/:id
```

---

## Add Comment To Lead

```http
POST /api/leads/:id/comments
```

### Request Body

```json
{
  "author": "Shiv",
  "text": "Client interested in premium plan"
}
```

---

# Authentication Middleware

Protected routes require JWT token.

### Headers

```bash
Authorization: Bearer your_jwt_token
```

---

# User Roles

## Admin

* Full access
* Can manage agents
* Can manage leads

## Agent

* Can access CRM system
* Can manage leads

---

# Database Models

## User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: "admin" | "agent"
}
```

---

## Agent Model

```javascript
{
  name: String,
  email: String
}
```

---

## Lead Model

```javascript
{
  leadName: String,
  leadSource: "Website" | "Cold Call" | "Social Media" | "Referral",
  assignedAgent: String,
  leadStatus: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Closed",
  tag: "High Value" | "Follow-up" | "New Lead" | "Hot Lead" | "Cold Lead",
  priority: "High" | "Medium" | "Low",
  timeToClose: Number,
  comments: []
}
```

---

# Middleware

## authMiddleware.js

Handles:

* JWT verification
* Protected routes
* Admin authorization

---

## asyncHandler.js

Handles async route errors automatically.

---

## errorMiddleware.js

Global error handler for API errors.

---

# Security Features

* JWT Authentication
* Password Hashing
* Protected API Routes
* Role-Based Access
* MongoDB Validation

---

# Future Improvements

* Lead analytics dashboard
* Email notifications
* File uploads
* CRM activity logs
* Pagination
* Search functionality
* Refresh tokens
* Docker deployment
* Unit testing

---

# Author

Shiv Kumar

GitHub:
[https://github.com/shiv-11013](https://github.com/shiv-11013)
