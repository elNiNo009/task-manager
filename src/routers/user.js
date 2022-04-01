const express=require('express')
const User=require('../models/user')
const router= new express.Router()


router.post('/users', async (req,res)=>{            //creation endpoit for user
  
    const user=new User(req.body)
    try
        {
         await user.save()
         res.status(201).send(user)
        }
    catch (error)
    {
        res.status(400).send(error)
    }
})

router.get('/users',async (req,res)=>{               //reading endpoint user many
    
    try{
    const users=await User.find({})
    res.send(users)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
   
})

router.get('/users/:id', async(req,res)=>{           //reading endpoint user single
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

router.patch('/users/:id',async(req,res)=>{           //update endpoint user
    
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

        const user=await User.findById(req.params.id)
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        //const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
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

router.delete('/users/:id',async(req,res)=>{          //delete endpoint user

    try{
         const user=await User.findByIdAndDelete(req.params.id)

         if(!user)
         {
             return res.status(404).send()
         }
         res.send(user)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

module.exports=router

