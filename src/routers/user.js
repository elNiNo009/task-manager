const express=require('express')
const User=require('../models/user')
const router= new express.Router()
const auth=require('../middleware/auth')
const multer=require('multer')

router.post('/users', async (req,res)=>{            //creation endpoit for user
  
    const user=new User(req.body)
    
    try
        {
         await user.save()
         const token=await user.generateAuthToken()
         res.status(201).send({user,token})
        }
    catch (error)
    {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {       //user login
    try {
       console.log("user login")
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout',auth, async (req, res) => {       //user logout single session
    try{
            req.user.tokens=req.user.tokens.filter((token)=>{     //logout single session
                return token.token!==req.token
            })
            await req.user.save()
            res.send()
    }catch(e)
    {
res.status(500).send()
    }

})
router.post('/users/logoutall',auth, async (req, res) => {       //user logout all session
    try{
        console.log('logout aal')
            req.user.tokens=[]
            await req.user.save()
            res.send()
    }catch(e)
    {
res.status(500).send()
    }

})


router.get('/users/me',auth,async (req,res)=>{               //reading endpoint user self profile
    console.log('reading self')
   res.send(req.user)
   
})

router.patch('/users/me',auth,async(req,res)=>{           //update endpoint user
    
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

        //const user=await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        //const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       
        res.send(req.user)
       }
catch(e)
{
     res.status(400).send(e)
}
})

router.delete('/users/me',auth,async(req,res)=>{          //delete endpoint user

    try{
        //  const user=await User.findByIdAndDelete(req.user._id)

        //  if(!user)
        //  {
        //      return res.status(404).send()
        //  }
        //  res.send(user)

        await req.user.remove()
        res.send(req.user)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

const upload=multer({        //working with file to be uploaded :: look multer
    dest:'avatar',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){

           if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
           {
            return cb(new Error('File must be a image'))  
           }

           
        // cb(new Error('File must be a pdf'))
           cb(undefined,true)
        // cb(undefined,false)
    
    }
})

router.post('/users/me/avatar', upload.single('avatar'),(req,res)=>{      //upload file

    console.log("uploading")
    res.status(200).send()
   
   
    
} )

module.exports=router

