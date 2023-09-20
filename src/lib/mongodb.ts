import mongooes from 'mongoose';

const connectMongoDB = async () => {
    try {
        const conn = await mongooes.connect(process.env.MONGO_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectMongoDB;
