import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [myTasks, setMyTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    
    if (user.role === 'Admin') {
      Promise.all([
        api.get('/admin/users'),
        api.get('/admin/tasks')
      ]).then(([usersRes, tasksRes]) => {
        const tasks = tasksRes.data;
        setAnalytics({
          totalUsers: usersRes.data.length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.status === 'Completed').length,
          pendingTasks: tasks.filter(t => t.status === 'Pending').length,
          inProgressTasks: tasks.filter(t => t.status === 'In Progress').length
        });
      }).catch(err => {
        setError('Failed to load analytics');
        console.error(err);
      });
    } else {
      api.get('/tasks').then(r => setMyTasks(r.data)).catch(err => {
        setError('Failed to load tasks');
        console.error(err);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome, {user.name}!
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Role: <span className={`font-semibold text-blue-600`}>{user.role}</span> | Status: <span className={`font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{user.status}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {user.role === 'Admin' && analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Users</p>
                <p className="text-4xl font-bold text-blue-600">{analytics.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M12 7a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Tasks</p>
                <p className="text-4xl font-bold text-indigo-600">{analytics.totalTasks}</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Completed</p>
                <p className="text-4xl font-bold text-green-600">{analytics.completedTasks}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Pending</p>
                <p className="text-4xl font-bold text-yellow-600">{analytics.pendingTasks}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">In Progress</p>
                <p className="text-4xl font-bold text-purple-600">{analytics.inProgressTasks}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582-7m-6 2h.582M4 15v5h5a5 5 0 110 10H4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {user.role === 'User' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-2xl font-bold mb-4">Your Tasks Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-slate-500 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-slate-700">{myTasks.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-green-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-700">{myTasks.filter(t => t.status === 'Completed').length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-yellow-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-700">{myTasks.filter(t => t.status === 'Pending').length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
