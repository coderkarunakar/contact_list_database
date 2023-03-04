const express = require('express');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

                //ROUTER FILE


// below one is just like an route file i.e fetching the practice file after localhost:8000/practice to get this file

//with the help of get only we can get any file and this get will consist of 2 call backs i.e req,res (request will be sent and waits for the response) and it consist of a route name u want to type in htttp url i.e localhost:8000/practice
app.get('/practice', function(req, res){
    //below is saying return (render the practice file(extension is automatic detected) and returned it)
    return res.render('practice', {
        //this title appears on the tab of the page i.e top
        title: "Let us play with ejs"
    });
});


//HERE FETCHING THE HOME FILE USING GET METHOD..

app.get('/', function(req, res){

//this below contact only we stored that file pls look above..we imported it
    Contact.find({}, function(err, contacts){

        //if error simply prints error
        if(err){console.log("error in fetching contacts from db");return;}
//if no error returns that page
        return res.render('home',{
            title: "Contact List",
            //contact_list is given in home.ejs file at the for loop 
            contact_list: contacts
        });

    })
  
})


                        //CREATING CONTACT..


app.post('/create-contact', function(req, res){
     
    Contact.create({
// this req.body.object allows u to access the data in a string or a json object from the frontend(client side(i.e here our home.ejs file there it was mentioned i.name,i.phone))
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!');return;}

        //with this below statement we are able to see what contact and its details in our vs code terminal
            console.log('******', newContact);

            //this below statement is very important this below code means that after creating the contact get back to normal page with that contact details.. dont remove this code if u remove u in browser it will be only loading ,it will create contact but i wont come to back...
            return res.redirect('back');
    })
});




                        //DELETING THAT CONTACT

//for deleting an contact
app.get('/delete-contact/', function(req, res){

    //HERE FETCHING THE id MENTIONED FOR DELETING CONTACT IN THE HOME.EJS FILE
    let id = req.query.id;
    //get the id from query in the url


    //this below Contact is imported that file pls look at starting and finding its id and deleting it is an inbuilt feature ,using id and err as callbacks
Contact.findByIdAndDelete(id,function(err){
    //if any error handle it else get back
    if(err){console.log('error in deleting an object from database');return;}
    
    //after finding id simply get back to page..
    return res.redirect('back');
    
});

});


//with this only our port works using app.listen (inbuilt function)
app.listen(port, function(err){
    //if error
    if (err) {console.log("Error in running the server", err);}
    //if no error print that port no in the vs code terminal
    console.log('Yup!My Server is running on Port', port);
})
