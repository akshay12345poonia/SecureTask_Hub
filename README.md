
# RoleGuard Tasker

A beautiful, role-based task management application with user activity tracking.

## Features

### Backend Features
- **User Authentication**: JWT-based authentication system
- **User Roles**: Two user roles (Admin and User) with different permissions
- **User Management**: Admin can view, delete, and update user status (Active/Inactive)
- **Task Management**: 
  - Users can create, view, update, and delete their own tasks
  - Admins can view and delete any task
- **Activity Logging**: Tracks user activities (login, task create, update, delete)

### Frontend Features
- **Beautiful UI**: Modern, responsive design with gradient effects
- **Role-Based Dashboard**: 
  - Admin sees analytics (total users, tasks, completed, pending, in progress)
  - User sees their tasks overview
- **User Management Dashboard**: Admin can manage all users
- **Task Monitoring Dashboard**: Admin can monitor all tasks
- **Activity Logs Dashboard**: Admin can view all user activity logs
- **Password Visibility Toggle**: Show/hide passwords on login/register pages
- **Protected Routes**: Routes are protected based on user authentication and roles

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Frontend
- **React.js**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool

## Project Structure

```
RoleGuard Tasker/
└── SecureTask_Hub/
    ├── Backend/
    │   ├── config/
    │   │   └── db.js          # MongoDB connection
    │   ├── controllers/
    │   │   ├── authController.js    # Authentication logic
    │   │   ├── taskController.js    # Task operations
    │   │   └── adminController.js   # Admin operations
    │   ├── middleware/
    │   │   ├── auth.js         # Authentication middleware
    │   │   └── activityLogger.js  # Activity logging middleware
    │   ├── models/
    │   │   ├── User.js         # User model
    │   │   ├── Task.js         # Task model
    │   │   └── ActivityLog.js  # Activity log model
    │   ├── routes/
    │   │   ├── authRoutes.js   # Auth routes
    │   │   ├── taskRoutes.js   # Task routes
    │   │   └── adminRoutes.js  # Admin routes
    │   ├── .env                # Environment variables
    │   ├── package.json        # Backend dependencies
    │   └── server.js           # Entry point
    └── frontend/
        ├── public/             # Public assets
        ├── src/
        │   ├── api/
        │   │   └── axios.js    # Axios configuration
        │   ├── assets/         # Static assets
        │   ├── components/
        │   │   ├── Navbar.jsx  # Navigation bar
        │   │   ├── Footer.jsx  # Footer component
        │   │   └── ProtectedRoute.jsx  # Protected route wrapper
        │   ├── context/
        │   │   └── AuthContext.jsx     # Authentication context
        │   ├── pages/
        │   │   ├── Login.jsx   # Login page
        │   │   ├── Register.jsx        # Register page
        │   │   ├── Dashboard.jsx       # Dashboard page
        │   │   ├── Tasks.jsx           # My Tasks page
        │   │   ├── AdminUsers.jsx      # Admin users page
        │   │   ├── AdminTasks.jsx      # Admin tasks page
        │   │   └── AdminLogs.jsx       # Admin activity logs page
        │   ├── App.jsx         # Main app component
        │   ├── main.jsx        # App entry point
        │   └── index.css       # Global styles
        ├── package.json        # Frontend dependencies
        └── vite.config.js      # Vite configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd SecureTask_Hub/Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following content:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/SecureTaskHub
JWT_SECRET=supersecretkey_change_me
```

4. Start the backend server:
```bash
npm start
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd SecureTask_Hub/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173 (or another available port if 5173 is taken)

## Usage

### Registration & Login
1. Go to http://localhost:5173
2. Register a new account with your details
3. Log in with your credentials

### User Features
- Create new tasks
- View your own tasks
- Update task status (Pending, In Progress, Completed)
- Delete your tasks

### Admin Features
- View all users
- Delete any user
- Toggle user status (Active/Inactive)
- View all tasks in the system
- Delete any task
- View activity logs

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires authentication)

### Tasks
- `GET /api/tasks` - Get user's tasks (requires authentication)
- `POST /api/tasks` - Create new task (requires authentication)
- `PUT /api/tasks/:id` - Update task (requires authentication)
- `DELETE /api/tasks/:id` - Delete task (requires authentication)

### Admin
- `GET /api/admin/users` - Get all users (requires admin)
- `DELETE /api/admin/users/:id` - Delete user (requires admin)
- `PUT /api/admin/users/:id/status` - Update user status (requires admin)
- `GET /api/admin/tasks` - Get all tasks (requires admin)
- `DELETE /api/admin/tasks/:id` - Delete any task (requires admin)
- `GET /api/admin/logs` - Get activity logs (requires admin)

## License
MIT

## Author
Made with ❤️ by Akshay Poonia
