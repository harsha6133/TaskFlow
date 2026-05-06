# TaskFlow 🚀

TaskFlow is a modern **Task Management & Kanban Board** web application built using **React**, **React Router**, **Context API**, **dnd-kit**, and **Tailwind CSS**.

It demonstrates:
- Authentication & role-based access
- Shared global state using Context
- Drag-and-drop Kanban workflow
- Responsive, production-style UI
- Clean separation of logic and presentation

---

## ✨ Features

### 🔐 Authentication
- Login using DummyJSON API
- Session persistence using `localStorage`
- Protected routes (unauthenticated users redirected to login)

### 👥 Role-Based Access
- **Admin** and **Member** roles
- Admin-only routes (Team page)
- Conditional UI rendering based on role

### ✅ Task Management
- Add new tasks (default status: **Backlog**)
- Search and filter tasks by status
- Mark tasks as **Done** using checkbox
- Assign tasks to users
- Delete tasks (with permission checks)

### 📋 Kanban Board
- Four columns: Backlog, In Progress, In Review, Done
- Drag & drop tasks between columns
- State stays in sync between Board and Tasks page
- No disappearing tasks (safe dnd-kit implementation)

### 🎨 UI & UX
- Dark, modern SaaS-style UI
- Fully responsive (mobile, tablet, desktop)
- Fixed sidebar on desktop
- Skeleton loaders during data fetch
- Accessible focus and hover states

---

## 🧱 Tech Stack

| Technology | Purpose |
|----------|--------|
| React | UI library |
| React Router v6 | Routing |
| Context API | Global state management |
| dnd-kit | Drag & drop |
| Tailwind CSS | Styling |
| DummyJSON API | Authentication & sample data |

---

## 📁 Project Structure

src/
 ├─ app/App.jsx
 ├─ app/router.jsx
 ├─ context/AuthContext.jsx
 ├─ context/TasksContext.jsx
 ├─ hooks/useAuth.js
 ├─ routes/
 │   ├─ Login.jsx
 │   ├─ Tasks.jsx
 │   ├─ Board.jsx
 │   ├─ Profile.jsx
 │   ├─ Team.jsx
 │   └─ Forbidden.jsx
 ├─ components/
 │   ├─ ProtectedRoute.jsx
 │   ├─ RoleGuard.jsx
 │   ├─ Layout.jsx
 │   └─ Skeleton.jsx
 └─ main.jsx
## 🔄 Application Flow
index.html
→ main.jsx
→ App.jsx (Providers + Router)
→ AuthContext
→ TasksContext
→ Layout
→ Page (Tasks / Board / Profile / Team)
---

## 🔐 Authentication Flow

1. User logs in via `/login`
2. Credentials sent to DummyJSON API
3. On success:
   - User + role stored in `localStorage`
   - AuthContext state updated
4. ProtectedRoute checks login before allowing access

---

## 🧠 State Management

### AuthContext
- Manages user session and role
- Handles login/logout
- Restores session on refresh

### TasksContext
- Single source of truth for tasks & users
- Handles add, update, assign, delete, drag & drop
- Normalizes task status
- Persists state to `localStorage`

---

## 🧲 Drag & Drop (Kanban)

Implemented using **dnd-kit**:
- `DndContext` – global drag controller
- `useSortable` – draggable task cards
- `useDroppable` – column drop targets
- Global `SortableContext` – prevents disappearing tasks

---

## 📱 Responsive Design

- Mobile-first layout
- Sidebar hidden on mobile, fixed on desktop
- Tasks page adapts from grid → cards
- Board stacks columns on mobile, grid on desktop

---

## 🔑 Demo Credentials

**Admin User**

Username: emilys
Password: emilyspass

(Pre-filled on the Login page)

---

## ▶️ Run the Project

```bash
npm install
npm run dev

Open:
http://localhost:5173

## Github Repo
https://github.com/harsha6133/TaskFlow/tree/main/taskflow
