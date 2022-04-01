const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')

const app=express()

const port=process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{            //creation endpoit for user

    const user=new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(400)
            res.send(error)
    })
   
})

app.post('/tasks',(req,res)=>{             //creation endpoint for task

    const task=new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400)
            res.send(error)
    })
   
})


app.listen(port, ()=>{
    console.log('Serevr is running '+ port)
})