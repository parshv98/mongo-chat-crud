// Import mongoose to define schema and model
const mongoose = require('mongoose');


// Define schema structure for Chat collection
const ChatSchema = new mongoose.Schema({

    // Sender name (required string)
    from:{
        type: String,
        required: true,
    },

    // Receiver name (required string)
    to:{
        type: String,
        required: true,
    },

    // Message text (max length 50 characters)
    msg:{
        type: String,
        maxlength: 50,
    },

    // Date and time when chat was created (required)
    created_at:{
        type: Date,
        require: true,
    }
});


// Create model named "Chat" using ChatSchema
const Chat = mongoose.model('Chat', ChatSchema);


// Export model so it can be used in other files
module.exports = Chat;
