const mongoose=require('mongoose')
const validator=require('validator')


const taskSchema=new mongoose.Schema({           //task DB
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
},{
  timestamps:true
})

const Tasks = mongoose.model('Tasks',taskSchema)

module.exports=Tasks