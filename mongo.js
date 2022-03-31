//crud

const mongodb=require('mongodb')

const MongoClient=mongodb.MongoClient

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

   db.collection('users').insertOne({
       name:'sarthak',
       age:'25'
   })
})
