const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }, // LOGIN, TASK_CREATE, TASK_UPDATE, TASK_DELETE
  details: String,
}, { timestamps: true });
module.exports = mongoose.model('ActivityLog', logSchema);
