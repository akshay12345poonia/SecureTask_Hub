import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const load = () => api.get('/tasks').then(r => setTasks(r.data));
  useEffect(() => { load(); }, []);
  const add = async (e) => {
    e.preventDefault();
    await api.post('/tasks', form);
    setForm({ title: '', description: '' }); load();
  };
  const updateStatus = async (id, status) => { await api.put(`/tasks/${id}`, { status }); load(); };
  const del = async (id) => { if(confirm('Are you sure you want to delete this task?')) { await api.delete(`/tasks/${id}`); load(); } };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">My Tasks</h2>
        <p className="text-slate-600">Manage your tasks efficiently</p>
      </div>

      <form onSubmit={add} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Task Title</label>
          <input 
            className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            placeholder="Enter task title..." 
            value={form.title} 
            onChange={e => setForm({ ...form, title: e.target.value })} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea 
            className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
            placeholder="Enter task description..." 
            value={form.description} 
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
          />
        </div>
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(t => (
          <div key={t._id} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">{t.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(t.status)}`}>
                {t.status}
              </span>
            </div>
            {t.description && (
              <p className="text-slate-600 text-sm mb-6 line-clamp-3">{t.description}</p>
            )}
            <div className="flex gap-3">
              <select 
                value={t.status} 
                onChange={e => updateStatus(t._id, e.target.value)} 
                className="flex-1 border border-slate-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button 
                onClick={() => del(t._id)} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks yet</h3>
          <p className="text-slate-500">Add your first task to get started!</p>
        </div>
      )}
    </div>
  );
}
