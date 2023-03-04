//getting mongoose library which is of mongodb in order to fetch to the database
const mongoose = require('mongoose');

//creating an schema what are the fields are required in the database here i need only 3 fields i.e name,phone and timestamps ..
const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{

    //with this we can get the date at which it was created ,and updated at in the database
    timestamps:true 
});



//finally here creating a name for this schema need to show in the mongodb compass i.e contact and calling above created contactSchema to available to other files as well
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;