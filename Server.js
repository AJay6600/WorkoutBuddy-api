const express = require('express')
require('dotenv').config()
const WorkoutRouter = require('./routers/workout.js')
const mongoose = require('mongoose')
const cors  = require('cors')
// initialize the app
app = express();
app.use(cors())
app.use(express.json())
// middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/workout',WorkoutRouter)

// app.use(
//     express.urlencoded({ extended: true })
// );

// Mangoose connet
// app listening on 
mongoose.connect(process.env.MONG_URI)
 .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is listening on the Port"+process.env.PORT)
    })

 })

 .catch((err)=>{
    console.log(err)
 })

// app.listen(process.env.PORT,()=>{
//     console.log("Server is listening on the Port 4000")
// })


