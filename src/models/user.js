
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({          
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
        unique: true,
        required: true,
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

userSchema.methods.generateAuthToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'thisismycourse')
    return token

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
  //  console.log("here")
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next) 
   {
     const user=this 
     console.log('just before saving')
      if(user.isModified('password'))
      {
        user.password=await bcrypt.hash(user.password,8)
      }


     next()

})

const User = mongoose.model('User',userSchema)

module.exports=User