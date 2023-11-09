require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();
const corsOptions = require('./common/config/corsOptions');
const verifyJWT = require('./common/middleware/verifyJWT');
const mongoose = require("mongoose");
const connectDB = require('./common/config/dbConn');
const cookieParser = require('cookie-parser');
const credentials = require('./common/middleware/credentials');

const PORT = 4000
connectDB(process.env.DATABASE_URI);
app.use(express.static('public'));

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(verifyJWT);

app.use("/inventory", require('./routes/inventory'));

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
