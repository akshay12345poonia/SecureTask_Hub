const ActivityLog = require('../models/ActivityLog');
exports.logActivity = async (userId, action, details = '') => {
  try { await ActivityLog.create({ user: userId, action, details }); }
  catch (e) { console.error('Log error', e.message); }
};
