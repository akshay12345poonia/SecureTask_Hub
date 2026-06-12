const Task = require('../models/Task');
const { logActivity } = require('../middleware/activityLogger');

exports.create = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user._id });
  await logActivity(req.user._id, 'TASK_CREATE', `Task: ${task.title}`);
  res.status(201).json(task);
};

exports.list = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort('-createdAt');
  res.json(tasks);
};

exports.update = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Not found' });
  Object.assign(task, req.body);
  await task.save();
  await logActivity(req.user._id, 'TASK_UPDATE', `Task: ${task.title}`);
  res.json(task);
};

exports.remove = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Not found' });
  await logActivity(req.user._id, 'TASK_DELETE', `Task: ${task.title}`);
  res.json({ message: 'Deleted' });
};
