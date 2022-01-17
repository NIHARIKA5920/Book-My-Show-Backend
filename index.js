//main backend file
const MovieModel=require("./database/movies")
require('dotenv').config()



const express=require("express");
const { MongoClient } = require('mongodb');

var cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json())//in post method body will be undifined becoz it cant see body in json format in postman so we use this line to recognize
//the use of express.json func is it is built in middleware func in express it parses incomming req with json payload(body of postmon where we inserted txt) to raw json format in the body

//import the mongoose module
var mongoose = require('mongoose');
//set up default mongoose connection
var mongoDB=process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser:true, UseUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));


//http://localhost:5000/
app.get("/",(req,res)=>{
    return res.json({"Welcome": 'to my backend software for the bookMyShow'})
});

//http://localhost:5000/movies
app.get("/movies",async(req,res)=>{
    const getAllMovies=await MovieModel.find();
    return res.json(getAllMovies)
});
//http://localhost:5000/movies/id
app.get("/movies/:id",async(req,res)=>{
    const{id}=req.params;
    const getAllMovie=await MovieModel.findOne({_id: id});
    return res.json(getAllMovie)
});


app.listen(5000,()=>{
console.log("My express app is running......")
});
















