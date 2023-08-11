const express=require("express");
const bodyParser = require("body-parser");
var app=express();
app.use('/public', express.static('public'));
const fetch = require("node-fetch");
app.set("view engine","ejs");
app.get("/",(req,res)=>{
	res.render("index")
});

app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.ejs");
});
app.get("/",(req,res)=>{
	const sendData={location:"Location",temp:"Temp",desc:"Description",feel:"Feel-like",humidity:"Humidity",speed:"speed"};
    res.render("index",{sendData:sendData}); 
});
app.post("/",async(req,res)=>{
	let location=await req.body.city;
	//const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}appid=${process.env.APIKEY}`;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
	const response=await fetch(url);
	const weatherData=await response.json();
	const temp =Math.floor(weatherData.main.temp);
	const desc =weatherData.weather[0].description;
	const sendData={};
	sendData.temp=temp;
	sendData.desc=desc;
	sendData.location=location;
	sendData.feel=weatherData.main.feels_like;
	sendData.humidity=weatherData.main.humidity;
	sendData.speed=weatherData.wind.speed;
	sendData.country=weatherData.sys.country;
	//res.render('index',{sendData:sendData});
	//const icon=weatherData.weather[0].icon;
	//const imageUrl=`http://openweathermap.org/img/wn/${icon}@2x.png`;
	//res.write(`<h1> the current weather in ${location} is ${disc}</h1>`);
	//res.write(`<h1> the current temparature is ${temp} degree celcius.</h1>`);
	//res.write(`<img src='${imageUrl}'>`);
	
});
app.listen(3000,()=>{
	console.log("server is running....");
});