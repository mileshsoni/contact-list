// requiring the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect("mongodb://0.0.0.0/contact_list_db");

// the connection between mongoose and db will give access to db as mongoose is a ODM
const db = mongoose.connection;

// if there is an error connecting to the db we will print an error on console as "error connecting to db"
db.on("error", console.error.bind(console, "error connecting to db"));

// if the connection is open for me to interact with the db
db.once("open", function(){
    console.log("connection successful");
});