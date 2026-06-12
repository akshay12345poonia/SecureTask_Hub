import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => { 
    api.get('/admin/logs').then(r => setLogs(r.data)); 
  }, []);

  const getActionBadge = (action) => {
    const colors = {
      'LOGIN': 'bg-blue-100 text-blue-700',
      'TASK_CREATE': 'bg-green-100 text-green-700',
      'TASK_UPDATE': 'bg-yellow-100 text-yellow-700',
      'TASK_DELETE': 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[action] || 'bg-slate-100 text-slate-700'}`}>
        {action}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Activity Logs</h2>
        <p className="text-slate-600">View all user activities in the system</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Action</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Details</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logs.map(l => (
                <tr key={l._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {l.user?.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{l.user?.name || 'Unknown'}</p>
                        <p className="text-xs text-slate-500">{l.user?.email || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getActionBadge(l.action)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {l.details}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-sm">
                    {new Date(l.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {logs.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No activity logs yet</h3>
          <p className="text-slate-500">Activities will appear here as users interact with the system</p>
        </div>
      )}
    </div>
  );
}
