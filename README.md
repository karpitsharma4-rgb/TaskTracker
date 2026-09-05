# Project / Task Tracker Dashboard

A full-stack task tracker built with React (Vite + Tailwind CSS) on the frontend and Node.js/Express + MongoDB (Mongoose) on the backend.

## Features
- Full CRUD for tasks (title, description, category, priority, status, dueDate)
- Search bar + status filter, both handled via backend query params
- Add/Edit task modal with client-side validation
- One-click status toggle (Pending → In-Progress → Completed) with instant UI update
- Delete with confirmation
- Fully responsive layout (mobile + desktop)

## Project Structure
```
/client   → React frontend (Vite + Tailwind)
/server   → Node/Express backend (REST API)
```

## Prerequisites
- Node.js 18+
- A MongoDB connection string (free tier from MongoDB Atlas works fine: https://www.mongodb.com/cloud/atlas)

## Backend Setup
```bash
cd server
cp .env.example .env
# edit .env and paste your MongoDB connection string into MONGO_URI
npm install
npm run dev        # starts on http://localhost:5000
```

## Frontend Setup
```bash
cd client
cp .env.example .env
# .env already points to http://localhost:5000/api by default
npm install
npm run dev         # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser. Make sure the backend is running first.

## API Endpoints
| Method | Endpoint          | Description                                  |
|--------|-------------------|-----------------------------------------------|
| GET    | /api/tasks        | Get all tasks. Supports `?search=` and `?status=` query params |
| GET    | /api/tasks/:id    | Get a single task                             |
| POST   | /api/tasks        | Create a new task                             |
| PUT    | /api/tasks/:id    | Update a task                                 |
| DELETE | /api/tasks/:id    | Delete a task                                 |

## Task Schema
```js
{
  title: String (required),
  description: String,
  category: "Design" | "Engineering" | "Ops" (required),
  priority: "Low" | "Medium" | "High" (default: Medium),
  status: "Pending" | "In-Progress" | "Completed" (default: Pending),
  dueDate: Date (required),
  createdAt, updatedAt (auto-managed)
}
```

## Deployment
- **Backend**: Deploy `/server` to Render (or Railway/Fly.io). Set `MONGO_URI` and `CLIENT_URL` as environment variables.
- **Frontend**: Deploy `/client` to Vercel (or Netlify). Set `VITE_API_URL` to your deployed backend URL + `/api`.

## Tech Stack
- Frontend: React 18 (Hooks), Vite, Tailwind CSS, Axios
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
