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
   
    db.collection('users').deleteMany({age:'25'}).then((result)=>
    {
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

 //   updatePromise



}
)
