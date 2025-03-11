# Full Stack Notes App
A full-stack Notes app that allows users to create, update, delete, and store notes securely.

## Features
- Create, update, and delete notes
- Store notes in a PostgreSQL database
- User authentication (JWT-based)
- Responsive UI with Tailwind CSS

## Technologies Used

### Backend:
- Node.js (Express.js)
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Frontend:
- React
- Tailwind CSS
- Vite

Setup Instructions
Prerequisites
Make sure you have Docker installed on your machine.

Clone the repository
cd notes-app

You need to create .env files for the frontend and backend.
Backend variables:
- PORT=5000
- JWT_SECRET=your-secret-key
- FRONTEND_URL=http://localhost:5173
- DATABASE_URL=postgresql://postgres:postgres@db:5432/notes

Frontend variables:
- VITE_API_URL=http://localhost:5000

Docker Setup
Build and start the containers:

Run the following command to build and start the application containers (backend, frontend, and database):
docker-compose up --build
This will create the necessary containers and link the services together.

Migrations:

If this is your first time running the application, you may need to run the database migrations:

docker-compose exec backend npx prisma migrate deploy
Access the app:

The frontend will be available at http://localhost:5173
The backend will be available at http://localhost:5000
