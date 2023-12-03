import express from "express";
import cors from "cors";
const app = express();
import corsOptions from './common/config/corsOptions';
import verifyJWT from './middleware/verifyJWT';
import mongoose from "mongoose";
import connectDB from './common/config/dbConn';
import credentials from './common/middleware/credentials';
import purchasesRoutes from "./routes/purchaseRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";

const PORT = 4000
connectDB(process.env.DATABASE_URI);
app.use(express.static(__dirname + '/public'));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(verifyJWT);
app.use("/inventory", inventoryRoutes);
app.use("/purchase", purchasesRoutes);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
