require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();
const authRouter = require("./routes/auth");
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
// const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing0.
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/auth", authRouter);

//verification routes
//app.use(verifyJWT);
//// app.use("/users", authenticateTokenMiddleware, usersRouter);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log('Server running on port 3000'));
});