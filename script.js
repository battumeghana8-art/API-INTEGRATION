const apiKey = "48defd0efbbf37dd2d4e6fb16a28b292";

const searchBtn =
document.getElementById("searchBtn");

searchBtn.addEventListener(
"click",
getWeather
);

document.getElementById(
"cityInput"
).addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){
getWeather();
}

});

setInterval(()=>{

document.getElementById(
"clock"
).innerText =
new Date().toLocaleString();

},1000);

async function getWeather(){

const city =
document.getElementById(
"cityInput"
).value;

if(city===""){
alert("Enter City Name");
return;
}

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response =
await fetch(url);

const data =
await response.json();

if(data.cod != 200){

alert(data.message);
return;

}

document.getElementById("cityName").innerText = data.name;

document.getElementById("temp").innerText =
data.main.temp + "°C";

document.getElementById("feelsLike").innerText =
data.main.feels_like + "°C";

document.getElementById("humidity").innerText =
data.main.humidity + "%";

document.getElementById("wind").innerText =
data.wind.speed + " km/h";

document.getElementById("condition").innerText =
data.weather[0].description;

const weather = data.weather[0].main;

let emoji = "🌤️";

if(weather==="Clear") emoji="☀️";
else if(weather==="Clouds") emoji="☁️";
else if(weather==="Rain") emoji="🌧️";
else if(weather==="Thunderstorm") emoji="⛈️";
else if(weather==="Snow") emoji="❄️";
else if(weather==="Mist") emoji="🌫️";

document.getElementById(
"weatherIcon"
).innerText = emoji;

let status="";

if(data.main.temp>35)
status="🔥 Very Hot";
else if(data.main.temp>25)
status="☀️ Warm";
else if(data.main.temp>15)
status="🌤 Pleasant";
else
status="❄️ Cold";

document.getElementById(
"status"
).innerText=status;

let advice="";

if(weather==="Rain")
advice="☔ Carry Umbrella";
else if(weather==="Clear")
advice="😎 Great Day Outside";
else if(weather==="Clouds")
advice="☁️ Pleasant Weather";
else
advice="🌦 Check Forecast";

document.getElementById(
"advice"
).innerText=advice;

let airQuality="";

if(data.main.humidity<50)
airQuality="🟢 Good";
else if(data.main.humidity<80)
airQuality="🟡 Moderate";
else
airQuality="🔴 Poor";

document.getElementById(
"airQuality"
).innerText=airQuality;

let outdoor="";

if(weather==="Clear")
outdoor="🏃 Excellent";
else if(weather==="Clouds")
outdoor="🚶 Good";
else if(weather==="Rain")
outdoor="🏠 Stay Indoors";
else
outdoor="⚠️ Limited";

document.getElementById(
"outdoor"
).innerText=outdoor;

}
catch(error){

alert("Failed to fetch weather data");
console.log(error);

}

}