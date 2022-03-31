const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api',
{
    useNewUrlParser:true,
    useCreateIndex:true
}
)


const User = mongoose.model('User',{
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
           type: Number,
           default:0,
           validate(value){
               if(value<0)
               {
                throw new Error('age invalid')
               }
           }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid')
            }
        }
    },
    password:
    {
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('password cannot be password')
            }
        }

    }
})

const Task = mongoose.model('Tasks',{
    Description:{
        type: String,
        trim:true,
        required:true

    },
    Completed:{
           type: Boolean,
         //  required:true,
           default:false
    }
})


/*
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