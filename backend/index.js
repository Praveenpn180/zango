const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.js')
const postRoutes = require('./routes/postRoute.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/dbConfig')
const app = express()
const bodyParser = require("body-parser")

connectDB();
dotenv.config();
app.use(cookieParser())
app.use(express.json())

app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
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
