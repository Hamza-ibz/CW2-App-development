const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
var path = require("path");
var fs = require("fs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb+srv://Hamza_ibz:Jamila123@mobileapp.9yc9j.mongodb.net/webstore', (err, client) => {
db = client.db('webstore')
console.log("Connected to database successfully!")
})

app.param('collectionName', (req, res, next, collectionName) => {
req.collection = db.collection(collectionName)
let collection_ = ""+req.collection.namespace

if(!(collection_.includes("lessons") || collection_.includes("orders")) )
{
    console.log("path is not right cannot get data")
    res.send('Check the path')
    return 
}
else {
    // console.log("collectionName equal to collections in database")
console.log("In comes a " + req.method + " to " + req.url);
// if(""+req.method.includes("PUT")){
//     console.log(req.body)
// }
}
return next()
})

// app.get('/', (req, res, next) => {
// res.send('Select a collection, e.g., /collection/messages')
// })

app.get('/why', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/messages')
    })

app.get('/collection/:collectionName/search/', (req, res, next) => {
req.collection.find({}).toArray((e, results) => {
    console.log("In comes a " + req.method + " to " + req.url + " GET request successfull");
    // console.log(results);
    // console.log(req.collection.namespace)
    // let collection_ = ""+req.collection.namespace
    // if(!(collection_.includes("lessons") || collection_.includes("orders")) )
    // {
    //     console.log("path is not right")
    //     res.send('Check the path')
    //     return 
    // }
if (e) return next(e)
res.send(results)
})
})



app.post('/collection/:collectionName', (req, res, next) => {
req.collection.insertOne(req.body,(e,results) => {
    console.log("In comes a " + req.method + " to " + req.url + " POST request successfull");
    console.log(req.body);
if (e) return next (e)
res.send(req.body)
// res.send(JSON.stringify(result));
})
})

const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) => {
req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
if (e) return next(e)
console.log("In comes a " + req.method + " to " + req.url + " GET request successfull")
console.log(result);
res.send(result)

})
})

app.get('/collection/:collectionName/search/:topic', (req, res, next) => {
    var regex = new RegExp(req.params.topic, 'i');
    req.collection.find({ topic: regex }).toArray((e, result) => { 
        if (e) return next(e)
        console.log("In comes a " + req.method + " to " + req.url + " GET request successfull")
        console.log(result);
        res.send(result)
        })

    // req.collection.find({topic:regex}).then(function(result){
    //     res.status (200).json(result)
    // })
    })

app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.updateOne(
    {_id: new ObjectID(req.params.id)},
    {$set: req.body},
    {safe: true, multi: false},
    (e, result) => {
    if (e) return next(e)
    res.send(req.body) // (result.result.n == 1)
    //(result.n === 1) ? {msg: 'success'} : {msg: 'error'}
    // console.log(JSON.stringify(result.result.n))
    console.log("In comes a " + req.method + " to " + req.url + " PUT request successfull updated: " + JSON.stringify(req.body));
    // console.log(req.body)
})
    })

app.use(function(req, res, next) {
    // Uses path.join to find the path where the file should be
    var filePath = path.join(__dirname,"static", req.url);
    // Built-in fs.stat gets info about a file
    fs.stat(filePath, function(err, fileInfo) {
    if (err) {
    next();
    return;
    }
    if (fileInfo.isFile()) 
    {res.sendFile(filePath);
    console.log("image found")
    console.log("In comes a " + req.method + " to " + req.url + " Get request successful")}
    else next();
    });
    // res.status(404);
    // res.send("image not found");
    // console.log("image not found")
    });

    app.use((req, res, next) => {
    res.status(404);
    res.send("file not found");
    console.log("In comes a " + req.method + " to " + req.url)
    console.log("file not found")
      });

// app.use(function(req, res) {
//     // console.log("In comes a " + req.method + " to " + req.url );
//     // Sets the status code to 404
//     res.status(404);
//     // Sends the error "File not found!”
//     res.send("wrong path");
//     console.log("error 404 wrong path")
//     });


// app.delete('/collection/:collectionName/:id', (req, res, next) => {
// req.collection.deleteOne(
// {_id: ObjectID(req.params.id)},
// (e, result) => {
// if (e) return next(e)
// res.send((result.n == 1) ? {msg: 'success'} : {msg: 'error'})
// })
// })

// app.listen(3000);
app.listen(process.env.PORT || 3000, (_) => {
    console.log("Server started!");
  });