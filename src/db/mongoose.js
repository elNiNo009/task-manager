const mongoose=require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api',
{
    useNewUrlParser:true,
    useCreateIndex:true
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