const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(cors());

//mongoDB Atlas
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
    console.log("connected to database");
});



app.use("/", routes);

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
