import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected successfully"));
        mongoose.connection.on('error', (err) => console.error('Database connection error:', err));
        mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
        
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        console.error('Make sure MongoDB is running or check your MONGODB_URI');
        // Don't exit in development, just log the error
        if (process.env.NODE_ENV !== 'development') {
            process.exit(1);
        }
    }
}

export default connectDB;