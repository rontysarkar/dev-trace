# Dev Trace API

## Live URL
https://dev-trace-liart.vercel.app

---

## Overview
Dev Trace is a backend issue tracking API where users can register, login, and manage issues like bugs and feature requests.

---

## Features & Tech Stack

| Features | Tech Stack |
|---|---|
| JWT Authentication | Node.js |
| Password Hashing | TypeScript |
| CRUD Operations | Express.js |
| Role-based Access | PostgreSQL |
| Modular Architecture | Raw SQL |
| Secure API System | bcrypt |
| REST API | jsonwebtoken |

---

## Setup Instructions

### Clone Repository
```bash
git clone <repository-url>
cd dev-trace
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

### Run Project
```bash
npm run dev
```

---

## API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

### Issues
- GET `/api/issues`
- POST `/api/issues`
- GET `/api/issues/:id`
- PATCH `/api/issues/:id`
- DELETE `/api/issues/:id`

---

## Database Schema

| Users Table | Issues Table |
|---|---|
| id | id |
| name | title |
| email | description |
| password | type |
| role | status |
| created_at | reporter_id |
| updated_at | created_at |
|            | updated_at |