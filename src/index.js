const express=require('express')
require('./db/mongoose')

const User=require('./models/user')
const Task=require('./models/task')
const { findByIdAndUpdate } = require('./models/user')

const app=express()
const port=process.env.PORT || 3000
app.use(express.json())



app.post('/users', async (req,res)=>{            //creation endpoit for user
  
    const user=new User(req.body)
    try
        {
         await user.save()
         res.status(201).send(user)
        }
    catch (error)
    {
        res.status(400)
        res.send(error)
    }
})


app.post('/tasks',async (req,res)=>{             //creation endpoint for task

    const task=new Task(req.body)
    try {
       await task.save()
       res.status(201).send(task)
    }
    catch(error)
    {
       res.status(400).send(error)
    }
   
})


app.get('/users',async (req,res)=>{               //reading endpoint user many
    
    try{
    const users=await User.find({})
    res.send(users)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
   
})


app.get('/users/:id', async(req,res)=>{           //reading endpoint user single
    const user_id=req.params.id
      try{
         const users=await  User.findById(user_id)
         if(!users)
         {
             
             return res.status(404).send()
         }
         res.send(users)
      }
      catch(e)
      {
        res.status(500).send(e)
      }
    
})


app.get('/tasks',async (req,res)=>{                //reading endpoint task many
    try{

        const tasks=await Task.find({})
        res.send(tasks)
    }catch(e)
    {
        res.status(500).send(e)
    }
})


app.get('/tasks/:id', async(req,res)=>{           //reading endpoint task single
    const task_id=req.params.id
    console.log("reading")
        try{
              const tasks= await  Task.findById(task_id)
            if(!tasks)
            {
                
                return res.status(404).send()
            }
            res.send(tasks)

        }catch(e)
        {
            res.status(500).send(e)
        }
    
})


app.patch('/users/:id',async(req,res)=>{           //update endpoint user
    
    const updates=Object.keys(req.body)
    const allowUpdates=['name','email','password','age']
    const isValidOperation= updates.every((update)=>{
          return allowUpdates.includes(update)
    })
    if(!isValidOperation)
    {
          return res.status(400).send({
              error: 'Invlaid update'
          })
    }
   
    try{
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user)
        {
          
            return res.status(404).send()
        }
        res.send(user)
       }
catch(e)
{
     res.status(400).send(e)
}
})

app.patch('/tasks/:id',async(req,res)=>{           //update endpoint task
    
    const updates=Object.keys(req.body)
    const allowUpdates=['Description','Completed']
    const isValidOperation= updates.every((update)=>{
          return allowUpdates.includes(update)
    })
    if(!isValidOperation)
    {
          return res.status(400).send({
              error: 'Invlaid update'
          })
    }
   
    try{
        const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task)
        {
          
            return res.status(404).send()
        }
        res.send(task)
       }
catch(e)
{
     res.status(400).send(e)
}
})


app.listen(port, ()=>{
    console.log('Serevr is running '+ port)
})