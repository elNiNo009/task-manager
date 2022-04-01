const express=require('express')
const Task=require('../models/task')
const router= new express.Router()



router.post('/tasks',async (req,res)=>{             //creation endpoint for task

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

router.get('/tasks',async (req,res)=>{                //reading endpoint task many
    try{

        const tasks=await Task.find({})
        res.send(tasks)
    }catch(e)
    {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async(req,res)=>{           //reading endpoint task single
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

router.patch('/tasks/:id',async(req,res)=>{           //update endpoint task
    
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

router.delete('/tasks/:id',async(req,res)=>{         //delte endpoint task

    try{
         const task=await Task.findByIdAndDelete(req.params.id)

         if(!task)
         {
             return res.status(404).send()
         }
         res.send(task)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

module.exports=router