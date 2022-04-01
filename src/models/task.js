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
    }
})

module.exports=Tasks