// Import express framework
const express = require('express');
// Create express application
const app = express();
// Import mongoose for MongoDB connection
const mongoose = require('mongoose');
// Import path module to handle file paths
const path = require('path');
// Import Chat model (MongoDB Schema)
const Chat = require('./models/chat.js');
// Import method-override to support PUT & DELETE in forms
const mehtodOverride = require('method-override');
//require ExpressError handler class of js
const ExpressError = require('./ExpressError.js');


// Set EJS as view engine
app.set("view engine","ejs");
// Set views folder path
app.set("views",path.join(__dirname,"views"));
// Make public folder static (CSS, JS, images)
app.use(express.static(path.join(__dirname,"public")));
// Parse URL-encoded form data
app.use(express.urlencoded({extended:true}));
// Enable method override using "_method"
app.use(mehtodOverride("_method"));


// Function to connect to MongoDB
async function main(){
    // Connect to database named "Whatsapp"
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

// Call main() and check connection status
main()
    // If connected successfully
    .then((res)=>{
        console.log('connection successfully');
    })
    // If any error occurs
    .catch((err)=>{
        console.log(err);
    });


// ---------------------- ROUTES ----------------------

// Home route (basic)
app.get('/',(req,res)=>{
    res.send("ok all done");
});


// Route to show all chats
app.get('/chats',asyncWrap(async (req,res)=>{
    // Find all chat documents from database
    let chats = await Chat.find();
    // Render index.ejs with chats data
    res.render("index.ejs",{chats});
}));


// Route to show form for creating a new chat
app.get('/chats/new',(req,res)=>{
    // Render new chat form page
    try{
    res.render('new.ejs');
    }
    catch(err){
        throw new ExpressError(404,"page not found");
    }
});


// Route to store new chat in database
app.post('/chats',(req,res)=>{
    // Extract data from form body
    try{
    let { from,to,msg } = req.body;

    // Create new chat object
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    // Save chat in MongoDB
    newChat.save();
    
    // Redirect back to chat list
    res.redirect('/chats');
}
catch(err){
    throw new ExpressError(404,"some error occured");
}
});


// Route to show edit form for a specific chat
app.get('/chats/:id/edit',asyncWrap(async(req,res)=>{
    // Get chat ID from URL
    let {id} = req.params;
    // Find chat by ID
    let chat = await Chat.findById(id);
    // Render edit form with chat data
    res.render('edit.ejs',{chat});
}));


// Route to update chat message in database
app.put('/chats/:id',asyncWrap(async(req,res)=>{
    // Extract ID from URL
    let {id} = req.params;
    // Extract updated message from form body
    let {msg:newMsg} =  req.body;

    // Update chat in MongoDB
    let update = await Chat.findByIdAndUpdate(
        id,                // chat id
        { msg: newMsg },   // updated message
        { runValidators:true, new:true } // validation + return updated doc
    );

    console.log(update);
    // Redirect after updating
    res.redirect('/chats');
}));


// Route to delete a chat by ID
app.delete('/chats/:id',asyncWrap(async(req,res)=>{
    // Extract ID
    let {id} = req.params;
    // Delete chat
    let deleted = await Chat.findByIdAndDelete(id);
    // Redirect to chat list
    res.redirect('/chats');
}));

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}

//Route to Show a particular chats
app.get('/chats/:id',asyncWrap(async(req,res,next)=>{
    let {id}= await req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        return next(new ExpressError(404,"Page not found"));
    }
    res.render('edit.ejs',{chat});
}));

//middleware to handle error
app.use((err,req,res,next)=>{
    let {status=404,message="Some Message Occured"} = err;
    res.status(status).send(message);
});

// Start server at port 8080
app.listen(8080,()=>{
    console.log("listening Port number:8080");
});
