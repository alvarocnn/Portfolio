const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const TaskList = mongoose.model("TaskList", taskListSchema);
module.exports = TaskList;
