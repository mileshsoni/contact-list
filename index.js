const { response } = require('express');
const express = require ('express');
const { request } = require('http');
const path = require('path');
const port = 9000;
const db = require('./config/mongoose');
const Contact = require("./models/contact");
const app = express();

app.set ("view engine", "ejs");
app.set ("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// var contactList = [
//     {
//         name: "Milesh",
//         phone: "8424379234"
//     },
//     {
//         name: "Gappu",
//         phone: "4424321234"
//     },
//     {
//         name: "Billu",
//         phone: "9424321236"
//     }
// ];

app.get('/', function(request, response){
    // since we need to do operations if the contact.find is successful
    // in finding the contacts that we requested
    // we need to use then function which is invoked when the contact.find
    // is successful, therefore we made that function as a promise
    // and used then function
    async function getContacts () {
        return Contact.find({});
    }
    const contacts = getContacts();
    getContacts().then((contacts) => {
        return response.render("home",
        {
            title : "Contact List",
            contact_list : contacts
        });
    });
    getContacts().catch((error)=>{
        console.log(error);
        return ;
    });
});
app.get("/practice", function(request, response){
    return response.render("practice");
});
app.post("/create-contact", function (request, response){
    Contact.create ({
        name: request.body.name,
        phone: request.body.phone
    } );
    return response.redirect("back");
});

app.listen(port, function(error){
    if(error){
        console.log(error);
        return ;
    }
    console.log(port);
});


// to delete a contact using query params
// app.get('/delete-contact/', function(req, res){

    // extracting phone number from req.query which is an object
    // let phone = req.query.phone

    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    //function to remove the indexed element and move the elements on the left side to occupy space
    // if(contactindex != -1){
    //     contactList.splice(contactindex, 1);
    // }

    // return res.redirect('back');
//}


// to delete a contact using db
app.get('/delete-contact/', function(req, res){
    let id = req.query.id;
    async function delete_contact () {
        return Contact.findByIdAndDelete(id);
    }
    delete_contact().then(() => {
        return res.redirect("back");
    });
    delete_contact().catch(error => {
        console.log("error");
        return ;
    });
});
