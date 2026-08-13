# CRM Backend API

Backend for Anvaya CRM — Node/Express/MongoDB API that handles auth, leads, agents, and the comment system on top of leads. Paired with the React frontend I built separately.

Compared to KaviosPix, the auth here is simpler (no OAuth, no OTP — just JWT + roles) since the focus for this project was elsewhere: modeling relationships properly (leads → agents → comments), role-based access, and filtering/querying at the API level instead of just dumping everything to the client and filtering there.

## Features

- Register / login
- JWT auth on protected routes
- Role-based authorization — admin vs agent
- Lead CRUD
- Agent management
- Comments on leads
- Query-based lead filtering (status, agent, source)
- Passwords hashed with bcryptjs
- Centralized error handling instead of try/catch scattered everywhere

## Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv

## Layout

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
├── server.js
└── package.json
```

## Running it

```bash
git clone <your-repository-url>
cd crm-backend
npm install
```

`.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

```bash
npm run dev
```

Base URL: `http://localhost:5000`

## Auth — `/api/auth`

**Register**
```http
POST /api/auth/register
```
```json
{
  "name": "Shiv",
  "email": "shiv@gmail.com",
  "password": "123456",
  "role": "admin"
}
```
Returns the user plus a JWT.

**Login**
```http
POST /api/auth/login
```
```json
{ "email": "shiv@gmail.com", "password": "123456" }
```

## Agents — `/api/agents`

```http
GET  /api/agents
POST /api/agents
```
```json
{ "name": "Rahul", "email": "rahul@gmail.com" }
```

## Leads — `/api/leads`

```http
GET     /api/leads              # supports ?status=, ?agent=, ?source=
GET     /api/leads/:id
POST    /api/leads
PATCH   /api/leads/:id
DELETE  /api/leads/:id
POST    /api/leads/:id/comments
```

**Create lead**
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

**Add comment**
```json
{
  "author": "Shiv",
  "text": "Client interested in premium plan"
}
```

## Protected routes

Anything behind `authMiddleware` needs:
```
Authorization: Bearer your_jwt_token
```

## Roles — how access actually splits

- **Admin** — full access, can manage agents and leads.
- **Agent** — can work within the CRM (leads) but doesn't get agent-management access.

This is checked in `authMiddleware.js` by decoding the JWT and reading the role off it, then gating specific routes (like agent creation) to admin-only. It's a flat two-role system for now — no granular permissions per action, which is fine at this scale but wouldn't hold up if the CRM needed, say, "agent can edit own leads but not others."

## Models

**User**
```javascript
{
  name: String,
  email: String,
  password: String,
  role: "admin" | "agent"
}
```

**Agent**
```javascript
{
  name: String,
  email: String
}
```

**Lead**
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

`assignedAgent` is stored as a plain string right now rather than a ref to the Agent model — works fine for the current scale but I'd switch this to a proper `ObjectId` reference with `.populate()` if the app grew, mainly so agent renames don't silently orphan old leads.

## Middleware, quickly

- **authMiddleware.js** — verifies the JWT, attaches the user to the request, and handles the admin-only gate for certain routes.
- **asyncHandler.js** — small wrapper so I'm not writing try/catch in every single controller; async errors get forwarded to Express's error handling automatically.
- **errorMiddleware.js** — one place that formats and sends error responses instead of every controller deciding its own error shape.

## What's missing

- No lead analytics dashboard on the backend side (charts are handled frontend-only right now)
- No email notifications
- No file uploads on leads
- No activity log — can't currently see a history of who changed what
- No pagination on `/api/leads`, which will matter once there are a lot of leads
- No dedicated search endpoint — filtering exists but full-text search doesn't
- No refresh tokens
- No tests yet — this is probably the thing I should fix first, honestly
- No Docker setup

## Author

Shiv Kumar
GitHub: https://github.com/shiv-11013
Email: shivkumar121112@gmail.com
