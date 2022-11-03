const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.js')
const postRoutes = require('./routes/postRoute.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/dbConfig')
const app = express()


connectDB();
dotenv.config();
app.use(cookieParser())
app.use(express.json())


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.listen(4000, () => {
    console.log("server started successfully");
})
