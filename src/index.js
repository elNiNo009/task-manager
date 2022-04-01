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

app.get('/users',(req,res)=>{               //reading endpoint user many
    User.find({}).then((users)=>{
        console.log("there")

        res.send(users)

    }).catch((e)=>{
         res.status(500).send(e)
    })
})

app.get('/users/:id',(req,res)=>{           //reading endpoint user single
    const user_id=req.params.id
   // console.log("here I")
    User.findById(user_id).then((users)=>{
       // console.log("here")
        if(!users)
        {
            
            return res.status(404).send()
        }
        res.send(users)

    }).catch((e)=>{
         res.status(500).send(e)
    })
    
})


app.get('/tasks',(req,res)=>{                //reading endpoint task many
    Task.find({}).then((tasks)=>{
      //  console.log("there")

        res.send(tasks)

    }).catch((e)=>{
         res.status(500).send(e)
    })
})

app.get('/tasks/:id',(req,res)=>{           //reading endpoint task single
    const task_id=req.params.id
   // console.log("here I")
    Task.findById(task_id).then((tasks)=>{
       // console.log("here")
        if(!tasks)
        {
            
            return res.status(404).send()
        }
        res.send(tasks)

    }).catch((e)=>{
         res.status(500).send(e)
    })
    
})

app.listen(port, ()=>{
    console.log('Serevr is running '+ port)
})