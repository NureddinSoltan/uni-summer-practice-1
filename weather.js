const weather = document.querySelector(".weather-app-v2"),
inputPart = weather.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = weather.querySelector("h2 i"),
timeAndDate = weather.querySelector(".time-and-date");


let api;

inputField.addEventListener("keyup", e => {
    if(e.key =="Enter" && inputField.value !=""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else {
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords; //getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error"); //error come from css
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending"); //pending come from css
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
    // fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
    //     infoTxt.innerText = "Something went wrong";
    //     infoTxt.classList.replace("pending", "error");
    // });
}

function weatherDetails(info) {
    if(info.cod =="404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText =`${inputField.value} isn't a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        const {sunrise, sunset} = info.sys;
        const currentTime = new Date().getTime() / 1000;
        const isDaytime = currentTime >= sunrise && currentTime < sunset;

        if(id == 800){
            wIcon.src = isDaytime ? "images/clear-day.png": "images/clear-night.png";
        }else if(id >= 200 && id <=232){
            wIcon.src = isDaytime ? "images/storm-day.png": "images/storm-night.png";
        }else if((id >= 300 && id <=321) || (id >= 500 && id <= 531)){
            wIcon.src = isDaytime ? "images/rain-day.png" : "images/rain-night.png";
        }else if(id >= 600 && id <=622){
            wIcon.src = isDaytime ? "images/snow-day.png" : "images/snow-night.png";
        }else if(id >= 701 && id <=762){
            wIcon.src = "images/wind-day-night.png";
        }else if(id >= 771 && id <=781){
            wIcon.src ="images/tornado-day-night.png";
        }else if(id == 801){
            wIcon.src = isDaytime ? "images/partly-clounds-day.png" : "images/partly-clounds-night.png";
        }else if(id >= 802 && id <=804){
            wIcon.src = isDaytime ? "images/cloudy-day.png" : "images/cloudy-night.png";
        }

        // Fetch the time and date information from the TimeZoneDB API
    fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=YSFO3BDYSVCR&format=json&by=position&lat=${info.coord.lat}&lng=${info.coord.lon}`)
    .then((res) => res.json())
    .then((timezoneInfo) => {
        const cityTime = new Date(timezoneInfo.formatted).toLocaleTimeString();
        const cityDate = new Date(timezoneInfo.formatted).toLocaleDateString();

        // Update the HTML elements with the time and date information
        const timeElement = timeAndDate.querySelector(".city-time .time");
        const dateElement = timeAndDate.querySelector(".city-date .date");
        timeElement.innerText = `Time: ${cityTime}`;
        dateElement.innerText = `Date: ${cityDate}`;
    })
    .catch(() => {
        console.error("Failed to fetch time zone information");
    });



        weather.querySelector(".temp .numb").innerText = Math.floor(temp);
        weather.querySelector(".weather").innerText = description;
        weather.querySelector(".location span").innerText = `${city}, ${country}`;
        weather.querySelector(".temp .numb-1").innerText = Math.floor(feels_like);
        weather.querySelector(".humidity span").innerText = `${humidity}%`;

        inputField.value = "";
        infoTxt.classList.remove("pending", "error");
        weather.classList.add("active");
        // infoTxt.innerText = "";
    }
    console.log(info);
}

arrowBack.addEventListener("click", () => {
    weather.classList.remove("active");
});