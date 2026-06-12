const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const { logActivity } = require('../middleware/activityLogger');

exports.getUsers = async (_req, res) => res.json(await User.find().select('-password'));

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Task.deleteMany({ user: req.params.id });
  res.json({ message: 'User deleted' });
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
  res.json(user);
};

exports.getAllTasks = async (_req, res) =>
  res.json(await Task.find().populate('user', 'name email').sort('-createdAt'));

exports.deleteAnyTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (task) await logActivity(req.user._id, 'TASK_DELETE', `Admin deleted: ${task.title}`);
  res.json({ message: 'Deleted' });
};

exports.getLogs = async (_req, res) =>
  res.json(await ActivityLog.find().populate('user', 'name email').sort('-createdAt').limit(200));
