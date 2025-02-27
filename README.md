This is a full-stack Task Management System with a React (Frontend) and Node.js + Express (Backend), using PostgreSQL as the database.

Folder Structure
/task_management_system
│-- frontend/    # React frontend
│-- backend/     # Node.js + Express backend API

**1. Database (PostgreSQL)**

Create a tasks table with:
 CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    due_date TIMESTAMP CHECK (due_date > NOW()),
    status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium'
);

**Backend Setup (Node.js + Express)**
1. Navigate to Backend Folder
cd backend
2. Install Dependencies
   npm install
3. Configure Environment Variables
   Create a .env file in the backend/ directory, and mention details of data bse there
4. Start the Backend Server** (node src/app.js or nodemon src/app.js)**
5. The backend runs on http://localhost:5000


**   Frontend Setup (React) **

7. Navigate to Frontend Folder
   cd ../frontend
8. Install Dependencies
   npm install
 10. Start the Frontend Application
     npm start


**    API Endpoints
**
Method  Endpoint   Description

GET     /tasks       Get all tasks

POST    /tasks     Create a new task

PUT    /tasks/:id    Update a task

DELETE  /tasks/:id   Delete a task

Technologies Used

Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express, PostgreSQL

Let me know if there is any issue you are facing to install this project.
