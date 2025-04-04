require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middlewares/auth');

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/manage', require('./routes/book'));
app.use('/api/manage', auth, require('./routes/user'));
app.use('/api/manage', auth, require('./routes/order'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));