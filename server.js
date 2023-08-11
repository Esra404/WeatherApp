const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
    let location = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}`;
    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        console.log(weatherData);
    } catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => {
    console.log("server is running....");
});
