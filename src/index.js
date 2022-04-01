
const express=require('express')
const bcrypt =require('bcryptjs')
require('./db/mongoose')

const { findByIdAndUpdate } = require('./models/user')

const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log('Serevr is running '+ port)
})


// encryption test
/*const myFunction = async()=>{
    const password="res12345"
    const hashedpassword =await bcrypt.hash(password,8)

    console.log(password)
    console.log(hashedpassword)

    const isMtach=await bcrypt.compare('res12345',hashedpassword)
    console.log(isMtach)
}

myFunction()
*/