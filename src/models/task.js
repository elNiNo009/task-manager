const mongoose=require('mongoose')
const validator=require('validator')




const Tasks = mongoose.model('Tasks',{           //task DB
    Description:{
        type: String,
        trim:true,
        required:true

    },
    Completed:{
           type: Boolean,
         //  required:true,
           default:false
    },
    Owner:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'User'
    }
})

module.exports=Tasks