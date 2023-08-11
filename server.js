const express=require("express");
const bodyParser = require("body-parser");
const app=express();
const fetch = require("node-fetch");


app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});
app.post("/",async(req,res)=>{
	let location=await req.body.city;
	const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}`;
    const response=await fetch(url);
	const weatherData=await response.json();
	console.log(weatherData);
})
app.listen(3000,()=>{
	console.log("server is running....");
});