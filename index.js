const express = require('express');
const dbconnect = require('./config/dbconnect');
const app = express()
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');
const cors = require("cors");
const { notFound, errorhandle } = require('./middleware/errorHandler');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("home")
    console.log("home")
});

app.use('/api/user', authRouter)
app.use(notFound)
app.use(errorhandle)


app.listen(PORT, async () => {
    const connect = await dbconnect()
    console.log(`Server is running at PORT ${PORT}`)
})
