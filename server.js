const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' })); // Allow larger payloads for file uploads

app.use(express.static(path.join(__dirname, '.'))); // Serve your HTML files

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open your browser to http://localhost:${PORT}/index.html`);
});