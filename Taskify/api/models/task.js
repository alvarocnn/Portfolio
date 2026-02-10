const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["completed", "pending"],
        default: "pending",
    },
    date: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
    taskList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskList",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
