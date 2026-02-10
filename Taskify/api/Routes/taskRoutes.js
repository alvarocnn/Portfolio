const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.post('/task-lists/:taskListId/tasks', taskController.createTask);
router.get('/task-lists/:taskListId/tasks', taskController.getTasks);
router.patch('/tasks/:taskId/complete', taskController.completeTask);
//router.get('/tasks/complete/:date/:taskListId', taskController.filterTasksByDate);
router.get('/users/:userId/tasks/complete/:date', taskController.filterTasksByDate);
router.delete('/tasks/:taskId', taskController.deleteTask);
router.get('/task/count/:userId', taskController.countTask);

module.exports = router;
