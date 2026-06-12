const router = require('express').Router();
const { create, list, update, remove } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
router.use(protect);
router.route('/').get(list).post(create);
router.route('/:id').put(update).delete(remove);
module.exports = router;
