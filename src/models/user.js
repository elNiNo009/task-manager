
const mongoose=require('mongoose')
const validator=require('validator')

const User = mongoose.model('User',{          //user DB
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

module.exports=User