const TaskList = require('../models/TaskList');
const User = require('../models/user');
const Task  = require('../models/task')
exports.createTaskList = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const newTaskList = new TaskList({ title, user: userId });
        await newTaskList.save();

        user.taskLists.push(newTaskList._id);
        await user.save();

        res.status(201).json({ message: 'Lista de tareas creada con éxito', taskList: newTaskList });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la lista de tareas', error });
    }
};
exports.getTaskLists = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('taskLists');

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ taskLists: user.taskLists });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', userId });
    }
};
exports.deleteTaskList = async (req, res) => {
    try {
        const taskListId = req.params.taskListId;
        console.log("taskListId", req.params.taskListId);
        await TaskList.findByIdAndDelete(taskListId);
        // También eliminamos todas las tareas asociadas a la lista de tareas
        await Task.deleteMany({ taskList: taskListId });
        res.status(200).json({ message: "Lista de tareas eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Algo salió mal" });
    }
};