const express=require('express')
const Task=require('../models/task')
const router= new express.Router()
const auth=require('../middleware/auth')


router.post('/tasks',auth,async (req,res)=>{             //creation endpoint for task

   // const task=new Task(req.body)
   const task= new Task({
       ...req.body,
       Owner:req.user._id
   } )
   try {
       await task.save()
       res.status(201).send(task)
    }
    catch(error)
    {
       res.status(400).send(error)
    }
   
})

router.get('/tasks',auth,async (req,res)=>{                //reading endpoint task many
    try{
          const match ={}
          if(req.query.Completed){
              match.Completed=req.query.Completed==='true'
          }
      await req.user.populate({
          path:'tasks',
           match
          
      }).execPopulate()
     
        res.send(req.user.tasks)
    }catch(e)
    {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth, async(req,res)=>{           //reading endpoint task single
    const task_id=req.params.id
    //console.log("reading")
        try{
              // const tasks= await  Task.findById(task_id)
              
             const task=await Task.findOne({_id:task_id, Owner:req.user._id})
          //    console.log(task_id)
            //  console.log(req.user._id)
             // console.log(task)

             if(!task)
            {
                
                return res.status(404).send()
            }
            res.send(task)

        }catch(e)
        {
            res.status(500).send(e)
        }
    
})

router.patch('/tasks/:id',auth,async(req,res)=>{           //update endpoint task
    
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
      //  const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      const task=await Task.findOne({_id:req.params.id,Owner:req.user._id})
     

      if(!task)
        {
          
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
       }
catch(e)
{
     res.status(400).send(e)
}
})

router.delete('/tasks/:id',auth,async(req,res)=>{         //delte endpoint task

    try{
         const task=await Task.findOneAndDelete({_id:req.params.id,Owner:req.user._id})

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