# Mongo Chat CRUD

This repository contains a simple WhatsApp-style chat application built using Node.js, Express.js, and MongoDB. The project demonstrates complete CRUD operations for chat messages, using Mongoose for database modeling and EJS for server-side rendering.

## Features

- User-friendly chat interface inspired by WhatsApp
- Create, read, update, and delete chat messages
- Uses MongoDB for persistent storage
- Mongoose for schema modeling and easier data operations
- Server-side rendering with EJS templates
- Simple CSS styling for chat UI

## Tech Stack

- **JavaScript** (Node.js & frontend)
- **Express.js** — Server framework
- **MongoDB** — Database
- **Mongoose** — ODM
- **EJS** — Templating engine for server-side rendering
- **CSS** — Basic styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parshv98/mongo-chat-crud.git
   cd mongo-chat-crud
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start your MongoDB server locally (or update the MongoDB URI in your code for remote connection).
4. Run the application:
   ```bash
   npm start
   ```
5. Open your browser and visit [http://localhost:3000](http://localhost:3000).

## Usage

- The home page displays your chat messages.
- You can send new messages using the input box.
- Messages can be edited or deleted using the provided actions.

## Project Structure

```
├── public/
│   └── styles.css        # Chat UI styles
├── views/
│   └── index.ejs         # EJS templates for server-side UI
├── models/
│   └── Message.js        # Mongoose message schema
├── routes/
│   └── chat.js           # Application routes for chat CRUD
├── app.js                # Main application file
└── package.json
```

## Example Code Snippet

```javascript
// Example Message schema (models/Message.js)
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Message', messageSchema);
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS Templating](https://ejs.co/)
