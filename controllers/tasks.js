const Task = require("../models/task")

const getAllTask = async (req, res) =>{
   try{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
   }catch(error){
    res.status(500).json({msg: error})
   }
}

const createTask =async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const getTask = async (req, res) => {
    try{
        const {id : taskID} = req.params
        const task = await Task.findOne({_id : taskID})
        if(!task){
            res.status(404).json({msg : `No task with ID ${taskID}` })
        }
    }catch(error){
        res.status(500).json({ msg : error })
    }
}