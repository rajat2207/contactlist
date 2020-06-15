const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose.js')
const Contact=require('./models/contact.js');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'))
app.use(express.urlencoded());
app.use(express.static('assets'));

// var contacts=[
//     {
//         name: 'Rajat',
//         number: '8340441558'
//     },
//     {
//         name: 'Tony Stark',
//         number: '29453628291'
//     },
//     {
//         name:"Coding Ninjas",
//         number:'1234567890'
//     }
// ]


//opening the homepage
app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching the data");
        }

        return res.render('home',{
            'title':"My home page",
            'contact_List':contacts
        });

    })

    
})

// app.get('/practice',function(req,res){
//     return res.render('practice',{
//         'title':'Lets Practice EJS'
//     })
// })


//deleteing a contact from the contact list
app.get('/delete-contact/',function(req,res){
    //get the query from the url
    let id=req.query.id;

    //find the contact using the id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting the contact");
            return;
        }
        return res.redirect('back');
    });
   
})


//creating a contact in the contactlist
app.post('/create-contact',function(req,res){
    // contacts.push(req.body);

    Contact.create({
        name: req.body.name,
        number:req.body.number
    },function(err, newContact){
        if(err){
            console.log("Error in creating the new contact");
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    })
})

app.listen(port,function(err){
    if(err){
        console.log("There is problem in running the server Error:", err);
        return;
    }

    console.log("Server is running on port:", port);
})