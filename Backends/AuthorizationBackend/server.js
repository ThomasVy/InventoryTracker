require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();
const corsOptions = require('./common/config/corsOptions');
const mongoose = require("mongoose");
const connectDB = require('./common/config/dbConn');
const cookieParser = require('cookie-parser');
const credentials = require('./common/middleware/credentials');
const handleLogin = require("./controllers/loginController")
const handleRefreshToken = require("./controllers/refreshTokenController");
const handleLogout = require("./controllers/logoutController");
const handleNewUser = require('./controllers/registerController');

const PORT = 3000;

connectDB(process.env.DATABASE_URI);

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.post("/login", handleLogin);
app.get("/logout", handleLogout);
app.get("/refresh", handleRefreshToken);
app.post('/register', handleNewUser);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});