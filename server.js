const bodyParser = require("body-parser");
const express=require("express");
const app=express();
const fetch=require("node-fetch");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});
app.post("/",async(req,res)=>{
	let location=await req.body.city;
	const url=`https://api.openweathermap.org/data/2.5/weather?lat=${location}&lon={lon}&appid=${process.env}`;
    const response=await fetch(url);
	const weatherData=response.json();
	console.log(weatherData);
})
app.listen(3000,()=>{
	console.log("server is running....");
});