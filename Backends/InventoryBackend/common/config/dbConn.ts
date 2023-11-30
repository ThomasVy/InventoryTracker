import mongoose from 'mongoose'

const connectDB = async (URI : string | undefined) => {
    if (!URI) {
        console.log("no URI supplied");
        return;
    }
        
    try {
        await mongoose.connect(URI);
    } catch (err) {
        console.error(err);
    }
}

export default connectDB;