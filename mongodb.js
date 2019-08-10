//CRUD create read update delete
//const mogodb = require('mongodb')
//const MongoClinet = mogodb.MongoClient
//const ObjectID = mogodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb');

const connectionclineURL = 'mongodb://127.0.0.1:27017';
const datbaseName = 'task-manager';
const id = new ObjectID()

MongoClient.connect(connectionclineURL, {useNewUrlParser:true}, (error, cline)=>{
    if(error){
        return console.log('Error can not connection database')
    }
    useNewUrlParser:true;
    useCreateIndex:true;
    useFindAndModify:true;
    const db = cline.db(datbaseName);
    /*db.collection('taskinfo').insertMany([
        {
            description: 'abc dec',
            completed: false
        },{
            description: 'tyu uiu',
            completed: true
        }
    ],(error, result)=>{
        if(error){
            return console.log('Inser many data in tasks table faile')
        }
        console.log(result.ops);
    })*/

    /*db.collection('taskinfo').findOne({_id: new ObjectID ("5d3bb6d5398c6a4012c29d1b")}, (error, result) => {
        if (error){return console.log('can not find the item')}
        console.log(result)
    })
    db.collection('taskinfo').find({completed: false}).toArray((error, tasks) => {
        if (error){return console.log('can not find the item')}
        console.log(tasks)
    })*/

    /*db.collection('taskinfo').updateMany(
        {
            completed : false
        },
        {
            $set: {
               completed : true
            }
        }
    ).then((result) => {
        console.log('success', result.modifiedCount)
    }).catch((error) => {
        console.log('Error', error)
    })*/
    db.collection('users').deleteOne({
        _id : new ObjectID('5d3a98bcd7c9cb1b568198ce')
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})