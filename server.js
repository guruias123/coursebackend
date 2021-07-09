const express = require('express')
const app = express();
const port =process.env.PORT || 8800;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
//mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/amazon?retryWrites=true&w=majority
// mongodb://localhost:27017
const mongourl = "mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/amazon?retryWrites=true&w=majority";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())



app.get('/', (req,res)=>{
    res.send('health ok')
}
)

app.get('/courses', (req,res)=>{
  db.collection('courses').find({}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

app.get('/courses/:id',(req,res) =>{
  var id = req.params.id
  db.collection('courses').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('amazon');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  
  })