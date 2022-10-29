const mongoose = require('mongoose')

const connectDB = async () => {

    let MongoUrl = process.env.MONGO_URL|| 'mongodb://localhost:27017/zango'
    try {
        const conn = await mongoose.connect(MongoUrl)
        console.log(`connected to mongodb: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB