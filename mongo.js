//crud


const {MongoClient,ObjectID}=require('mongodb')

const connectionURL= 'mongodb://127.0.0.1:27017'
const databsename='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>
{
    if(error)
    {
        return console.log("error")

    }
   // console.log("connected to server")

   const db=client.db(databsename)

  /* db.collection('users').insertMany([{
       name:'sarthak',
       age:'25'
   },
{
    name:'so',
    age:'21'
}],(error,result)=>{
       console.log(result.ops)
   })
   
   db.collection('tasks').insertMany([{
    description:'cleaning',
    completed:true
},
{
 description:'renew inspection',
 completed:false
}],(error,result)=>{
    console.log(result.ops)
}) */
   
db.collection('users').findOne({name:'sahak'},(error,user)=>{

    if(error)
    {return console.log("Unabel to find")
    }
    console.log(user)
})

}
)
