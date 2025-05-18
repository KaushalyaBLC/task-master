# TaskMaster Documentation

## Overview

**TaskMaster** is a full-stack task management application designed to streamline workflows and boost productivity. It provides features such as task creation, filtering, reporting, and authentication. The project is built using modern web technologies, including **Next.js** for the frontend and **Express.js** for the backend, with **Supabase** as the database  provider.

---

## Features

### **Frontend**
- **Task Management**: Create, view, filter, and update tasks.
- **Authentication**: Google OAuth integration using `next-auth`.
- **Dark Mode**: Theme toggle for light and dark modes.
- **Responsive Design**: Fully responsive UI built with **Tailwind CSS**.
- **Reports Dashboard**: View task summaries and upcoming tasks.

### **Backend**
- **RESTful API**: Endpoints for task and report management.
- **Authentication Middleware**: Google OAuth token verification.
- **Database Integration**: Supabase for data storage and retrieval.
- **Secure API**: Protected routes using Bearer tokens.

---

## Project Structure

### **Frontend (`client/`)**
The frontend is a **Next.js** application located in the `client/` directory.

#### Key Files and Directories:
- **`src/app/`**: Contains Next.js pages and layouts.
  - `task/`: Task management pages.
  - `report/`: Reports dashboard.
- **`src/components/`**: Reusable UI components such as `NavBar`, `Footer`, `ThemeToggle`, and `TasksTable`.
- **`src/lib/`**: Utility functions, including authentication helpers (`withAuth.js`) and Supabase client configuration (`supabaseClient.js`).
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`.gitignore`**: Specifies files and directories to exclude from version control.

#### Key Dependencies:
- **Next.js**: Framework for building React applications.
- **next-auth**: Authentication library for Next.js.
- **axios**: HTTP client for API requests.
- **Tailwind CSS**: Utility-first CSS framework.
- **lucide-react**: Icon library for React.

---

### **Backend (`api/`)**
The backend is an **Express.js** application located in the `api/` directory.

#### Key Files and Directories:
- **`index.js`**: Entry point for the Express server.
- **`routes/`**: Defines API routes for tasks and reports.
  - `taskRoute.js`: Routes for task management.
  - `reportRoute.js`: Routes for report generation.
- **`controllers/`**: Contains business logic for handling API requests.
  - `taskcontroller.js`: Handles task creation, retrieval, and updates.
  - `reportcontroller.js`: Handles report generation.
- **`middleware/`**: Middleware for authentication.
  - `expressAuth.js`: Verifies Google OAuth tokens.
- **`services/`**: Contains Supabase client configuration.
  - `supabaseClient.js`: Initializes the Supabase client.
- **`utils/`**: Utility functions.
  - `userUtils.js`: Fetches user information from the database.

#### Key Dependencies:
- **Express.js**: Web framework for building APIs.
- **Supabase**: Backend-as-a-service for database and authentication.
- **dotenv**: Loads environment variables from `.env` files.
- **google-auth-library**: Verifies Google OAuth tokens.
- **jsonwebtoken**: Handles JSON Web Tokens (JWT).

---

## Installation and Setup

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Google Cloud account for OAuth credentials

### **Environment Variables**
Create `.env` files in both the `client/` and `api/` directories with the following variables:

#### **Frontend (`client/.env`)**
```env
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXTAUTH_SECRET=<your_nextauth_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

#### **Frontend (`api/.env`)**
```env
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_service_role_key>
GOOGLE_CLIENT_ID=<your_google_client_id>
```

## Steps to Run the Project

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd TaskMaster
   ```
2. **Install dependencies for both frontend and backend:**
   ```bash
   cd client
   npm install
   cd ../api
   npm install
   ```
3. **Start the backend server:**
   ```bash
   npm run dev
   ```
4. **Start the frontend development server:**
   ```bash
   cd ../client
   npm run dev
   ```

5. **Open the application in your browser:**
   ```bash
   http://localhost:3000
   ```

## API Endpoints

### Task Management

- `POST /api/tasks`: Create a new task  
- `GET /api/tasks`: Retrieve tasks with optional filters (`status`, `dueBefore`)  
- `PUT /api/tasks/:id`: Mark a task as completed  

### 📊 Reports

- `GET /api/tasks/reports`: Get a summary of tasks by status  
- `GET /api/tasks/reports/next7days`: Get tasks due in the next 7 days  

---

## Key Features and Implementation Details

### Authentication

- Google OAuth is implemented using `next-auth` on the frontend and `google-auth-library` on the backend  
- Tokens are verified on the backend using middleware (`expressAuth.js`)

### Task Management

- Tasks are stored in a **Supabase** database  
- Users can filter tasks by **status** and **due date**

### Reports

- The reports dashboard provides a **summary of tasks by status**  
- Lists tasks that are **due in the next 7 days**

### Dark Mode

- Implemented using the `next-themes` library  
- Users can toggle between **light** and **dark** themes

---

## Future Enhancements

- Add **notifications** for task deadlines  
- Implement **role-based access control**  
- Add support for **recurring tasks**  
- Enhance reporting with **charts and graphs**

---


## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/)  
- [Supabase](https://supabase.io/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Google OAuth](https://developers.google.com/identity)

---

## Contact

For any questions or feedback, please contact the project maintainer at **[chamathkaushalyack@gmail.com]**.
