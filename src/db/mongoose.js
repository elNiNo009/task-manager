const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api',
{
    useNewUrlParser:true,
    useCreateIndex:true
}
)

const User = mongoose.model('User',{
    name:{
        type: String
    },
    age:{
           type: Number
    }
})

const me= new User(
    {
        name:"sarthak",
        age: 25
    }
)

me.save().then(()=>{
console.log("result",me)
}).catch((error)=>{
    console.log("error",error)
})