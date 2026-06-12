import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const load = () => api.get('/admin/tasks').then(r => setTasks(r.data));
  useEffect(() => { load(); }, []);
  
  const del = async (id) => { 
    if(confirm('Are you sure you want to delete this task?')) {
      await api.delete(`/admin/tasks/${id}`); 
      load(); 
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">All Tasks</h2>
        <p className="text-slate-600">View and manage all tasks in the system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(t => (
          <div key={t._id} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">{t.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(t.status)}`}>
                {t.status}
              </span>
            </div>
            {t.description && (
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{t.description}</p>
            )}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                {t.user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{t.user?.name || 'Unknown User'}</p>
                <p className="text-xs text-slate-500">{t.user?.email || ''}</p>
              </div>
            </div>
            <button 
              onClick={() => del(t._id)} 
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks yet</h3>
          <p className="text-slate-500">Tasks will appear here when users create them</p>
        </div>
      )}
    </div>
  );
}
