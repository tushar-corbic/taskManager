const Task = require("../models/task")
const asyncWrapper = require("../middleware/async")


const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})


const createTask =async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const getTask = asyncWrapper( async (req, res) => {
    const {id : taskID} = req.params
    const task = await Task.findOne({_id : taskID})
    if(!task){
        res.status(404).json({msg : `No task with ID ${taskID}` })
    }
})

const deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({ _id : taskID})
    if(!task){
        res.status(404).json({msg : `No task with taskID : ${taskID}` })
    }
    res.status(200).json({task})
})

const updateTask = async (req, res) =>{
    try{
        const {id : taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body, {
            new : true,
            runValidators: true,
        });

        if(!task){
            res.status(404).json({msg : `No task with task ID ${taskID}`})
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({ msg : error })
    }
}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    deleteTask,
    updateTask
}