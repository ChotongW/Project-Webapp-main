const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');
const carparkRouter = require('./routes/carparkRouter');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
 }));

app.use('/carsparking', carparkRouter);

/*
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "carsystem"
})
*/

app.get('/', (req,res) => {
    res.send('Homepage')
})

app.listen('5500', () => {
    console.log("Server is running on port 5500");
})