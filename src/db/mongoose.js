const mongoose=require('mongoose')



mongoose.connect(process.env.MONGODB_URL,
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}
)





/*                                //input to DB
const me= new User(
    {
        name:"satyam",
        age: 28,
        email:'sat@'
    }
)

me.save().then(()=>{
console.log("result",me)
}).catch((error)=>{
    console.log("error",error)
})



const firstTask= new Task(
    {
        Description:"bath",
        Completed: true
    }
)
firstTask.save().then(()=>{
    console.log("result",firstTask)
    }).catch((error)=>{
        console.log("error",error)
    })

    */