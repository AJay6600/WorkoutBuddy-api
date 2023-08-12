const express= require('express')
// const workout = require('../models/workoutModel.js')
const {createWorkout, getWorkout, getWorkouts, deleteWorkouts, updateWorkouts} = require('../controller/workoutController')
const router= express.Router();


// get  all the Workout
router.get('/', getWorkout)

// get Specific Workout
router.get('/:id',getWorkouts)


// Post new Workout
router.post('/', createWorkout)


// Delete a workout
router.delete('/:id',deleteWorkouts)


// update a workout
router.patch('/:id', updateWorkouts)
module.exports = router