import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import process from "./data/dotenvDeclare";

const app = express();
import corsOptions from './common/config/corsOptions';
import connectDB from './common/config/dbConn';
import cookieParser from 'cookie-parser';
import credentials from './common/middleware/credentials';
import handleLogin from "./controllers/loginController";
import handleRefreshToken from "./controllers/refreshTokenController";
import handleLogout from "./controllers/logoutController";
import handleNewUser from './controllers/registerController';

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