// connecting to the database mongodb compass

//here mongoose is an library for the mongodb..
const mongoose = require("mongoose");

//below are the connection steps..
const db = mongoose.connection;
// Connecting to database
mongoose.connect(
    //below is the connection string..
"mongodb://localhost:27017/",
{
	dbName: "contact_list",
	useNewUrlParser: true,
	useUnifiedTopology: true,
},
//if any error print error else work..
(err) =>
	err ? console.log(err) : console.log(
	"connected to contact_list database..")
);
//express library..
const express = require("express");
const app = express();
//this cors(our system) allows the client application to request the resources available on the server side(i.e database)
const cors = require("cors");
//just to show in which port our server is running
console.log("App listen at port 8000");
//just to available to other files we are exporting it..
module.exports=db;