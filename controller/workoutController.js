const workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//add the new Workout (POST methode)

const createWorkout = async (req,res)=>{
    const {title,reps,load} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }

    if(emptyFields.length >0)
    {
        return res.status(400).json({err: "Plese fill in all the fields", emptyFields})
    }


    try{
          const user_id = req.user._id
          const workoutPost = await workout.create({title,reps,load,user_id})
          res.status(200).json(workoutPost)
    }
    catch(error)
    {
       res.status(400).json({err: error.message})
    }
}

// get the all workout (GET )

const getWorkout = async (req,res) =>{
    const user_id = req.user._id
    const workoutGet = await workout.find({user_id}).sort({createdAT : -1})
     res.status(200).json(workoutGet)
  
}
// get the all workout (GET )3

const getWorkouts = async (req,res) =>{
    const { id } = req.params

    if( mongoose.Types.ObjectId.isValid(id))
    {
        const workoutGets = await workout.findById(id)
        if(!workoutGets)
        {
            res.status(404).json({err:"No such Workout"})
        }
        res.status(200).json(workoutGets)

    }
    else    
    {
        res.status(404).json({err:"No such Workout"})
    }
}


// Delete  the  workout (DELETE )

const deleteWorkouts = async (req,res) =>{
    const { id } = req.params

    if( mongoose.Types.ObjectId.isValid(id))
    {
        const workoutDelete = await workout.findOneAndDelete(id)
        if(!workoutDelete)
        {
            res.status(404).json({err:"No such Workout"})
        }
        res.status(200).json(workoutDelete)

    }
    else    
    {
        res.status(404).json({err:"No such Workout"})
    }
}

// update   the  workout (PATCH )

const updateWorkouts = async (req,res) =>{
    const { id } = req.params

    if( mongoose.Types.ObjectId.isValid(id))
    {
        const workoutUpdate = await workout.findOneAndUpdate({_id:id},{...req.body})
        if(!workoutUpdate)
        {
            res.status(404).json({err:"No such Workout"})
        }
        res.status(200).json(workoutUpdate)

    }
    else    
    {
        res.status(404).json({err:"No such Workout"})
    }
}

    
     
  

module.exports = { createWorkout, getWorkout, getWorkouts, deleteWorkouts, updateWorkouts}