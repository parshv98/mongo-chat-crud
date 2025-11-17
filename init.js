// Import mongoose to connect with MongoDB
const mongoose = require('mongoose');
// Import Chat model (schema)
const Chat = require('./models/chat.js');


// Call main() to connect to MongoDB
main()
    // If connection successful
    .then((res)=>{
        console.log('connection successfully');
    })
    // If connection fails
    .catch((err)=>{
        console.log(err);
    });


// Function to connect to MongoDB database
async function main(){
    // Connect to "Whatsapp" database
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}


// Create an array of chat objects (dummy data)
let allChats  = [
    {
        // Sender name
        from:'nikhil',
        // Receiver name
        to:'virat',
        // Chat message
        msg:'i will buy rcb',
        // Timestamp
        created_at:new Date()
    },
    {
        from:'ronaldo',
        to:'messi',
        msg:'we both are legends',
        created_at:new Date()
    },
    {
        from:'gabbar',
        to:'savak',
        msg:'how many men are there',
        created_at:new Date()
    },
    {
        from:'albert',
        to:'aryabhatta',
        msg:'you are intelligent',
        created_at:new Date()
    }
];


// Insert all chats into MongoDB in one go
Chat.insertMany(allChats)
    // If insertion successful, print result
    .then((res)=>{
        console.log(res);
    })
    // If any error occurs, print error
    .catch((err)=>{
        console.log(err);
    });
