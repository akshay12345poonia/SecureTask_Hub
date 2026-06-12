import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            RoleGuard Tasker
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/tasks" className="text-slate-300 hover:text-white transition-colors font-medium">
              My Tasks
            </Link>
            {user.role === 'Admin' && (
              <>
                <div className="h-6 w-px bg-slate-700"></div>
                <Link to="/admin/users" className="text-slate-300 hover:text-white transition-colors font-medium">
                  Users
                </Link>
                <Link to="/admin/tasks" className="text-slate-300 hover:text-white transition-colors font-medium">
                  All Tasks
                </Link>
                <Link to="/admin/logs" className="text-slate-300 hover:text-white transition-colors font-medium">
                  Logs
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={() => { 
              logout(); 
              nav('/login'); 
            }} 
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
