---Original code of the application--- //

const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){ // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords; // getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    fetchData();
}

function onError(error){
    // if any error occur while getting user location then we'll show it in infoText
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){ // if user entered city name isn't valid
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        //getting required properties value from the whole weather information
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        // using custom weather icon according to the id which api gives to us
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        //passing a particular weather info to a particular element
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});









// ---Change the photo by day and night according to the sunruse and sunset --- //

    // const wrapper = document.querySelector(".wrapper"),
    // inputPart = document.querySelector(".input-part"),
    // infoTxt = inputPart.querySelector(".info-txt"),
    // inputField = inputPart.querySelector("input"),
    // locationBtn = inputPart.querySelector("button"),
    // weatherPart = wrapper.querySelector(".weather-part"),
    // wIcon = weatherPart.querySelector("img"),
    // arrowBack = wrapper.querySelector("header i");

    // let api;

    // inputField.addEventListener("keyup", (e) => {
    // if (e.key == "Enter" && inputField.value != "") {
    // requestApi(inputField.value);
    // }
    // });

    // locationBtn.addEventListener("click", () => {
    // if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // } else {
    // alert("Your browser does not support geolocation API");
    // }
    // });

    // function requestApi(city) {
    // api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    // fetchData();
    // }

    // function onSuccess(position) {
    // const { latitude, longitude } = position.coords;
    // api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    // fetchData();
    // }

    // function onError(error) {
    // infoTxt.innerText = error.message;
    // infoTxt.classList.add("error");
    // }

    // function fetchData() {
    // infoTxt.innerText = "Getting weather details...";
    // infoTxt.classList.add("pending");

    // fetch(api)
    // .then((res) => res.json())
    // .then((result) => weatherDetails(result))
    // .catch(() => {
    //     infoTxt.innerText = "Something went wrong";
    //     infoTxt.classList.replace("pending", "error");
    // });
    // }

    // function weatherDetails(info) {
    // if (info.cod == "404") {
    // infoTxt.classList.replace("pending", "error");
    // infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    // } else {
    // const city = info.name;
    // const country = info.sys.country;
    // const { description, id } = info.weather[0];
    // const { temp, feels_like, humidity } = info.main;
    // const { sunrise, sunset } = info.sys;
    // const currentTime = new Date().getTime() / 1000;
    // const isDaytime = currentTime >= sunrise && currentTime < sunset;

    // if (id == 800) {
    //     wIcon.src = isDaytime ? "icons/clear.svg" : "icons/partly-clounds.png";
    // } else if (id >= 200 && id <= 232) {
    //     wIcon.src = isDaytime ? "icons/storm.svg" : "icons/partly-clounds.png";
    // } else if (id >= 600 && id <= 622) {
    //     wIcon.src = isDaytime ? "icons/snow.svg" : "icons/partly-clounds.png";
    // } else if (id >= 701 && id <= 781) {
    //     wIcon.src = isDaytime ? "icons/haze.svg" : "icons/partly-clounds.png";
    // } else if (id >= 801 && id <= 804) {
    //     wIcon.src = isDaytime ? "icons/cloud.svg" : "icons/partly-clounds.png";
    // } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    //     wIcon.src = isDaytime ? "icons/rain.svg" : "icons/partly-clounds.png";
    // }

    // weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    // weatherPart.querySelector(".weather").innerText = description;
    // weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
    // weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    // weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    // infoTxt.classList.remove("pending", "error");
    // infoTxt.innerText = "";
    // inputField.value = "";
    // wrapper.classList.add("active");
    // }
    // }

    // arrowBack.addEventListener("click", () => {
    // wrapper.classList.remove("active");
    // });





    // ---Add date & time --- //
    const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img"),
    arrowBack = wrapper.querySelector("header i"),
    timeAndDate = wrapper.querySelector(".time-and-date");
  
  let api;
  
  inputField.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && inputField.value != "") {
      requestApi(inputField.value);
    }
  });
  
  locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert("Your browser does not support geolocation API");
    }
  });
  
  function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    fetchData();
  }
  
  function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fa0433b8997935836a31971ff39e2c4c`;
    fetchData();
  }
  
  function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
  }
  
  function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
  
    fetch(api)
      .then((res) => res.json())
      .then((result) => weatherDetails(result))
      .catch(() => {
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
      });
  }
  
  function weatherDetails(info) {
    if (info.cod == "404") {
      infoTxt.classList.replace("pending", "error");
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {
      const city = info.name;
      const country = info.sys.country;
      const { description, id } = info.weather[0];
      const { temp, feels_like, humidity } = info.main;
      const { sunrise, sunset } = info.sys;
      const currentTime = new Date().getTime() / 1000;
      const isDaytime = currentTime >= sunrise && currentTime < sunset;
  
    if (id == 800) {
        wIcon.src = isDaytime ? "icons/clear.svg" : "icons/partly-clounds.png";
    } else if (id >= 200 && id <= 232) {
        wIcon.src = isDaytime ? "icons/storm.svg" : "icons/partly-clounds.png";
    } else if (id >= 600 && id <= 622) {
        wIcon.src = isDaytime ? "icons/snow.svg" : "icons/partly-clounds.png";
    } else if (id >= 701 && id <= 781) {
        wIcon.src = isDaytime ? "icons/haze.svg" : "icons/partly-clounds.png";
    } else if (id >= 801 && id <= 804) {
        wIcon.src = isDaytime ? "icons/cloud.svg" : "icons/partly-clounds.png";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        wIcon.src = isDaytime ? "icons/rain.svg" : "icons/partly-clounds.png";
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
  
      weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
      weatherPart.querySelector(".weather").innerText = description;
      weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
      weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
      weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
      infoTxt.classList.remove("pending", "error");
      infoTxt.innerText = "";
      inputField.value = "";
      wrapper.classList.add("active");
    }
  }
  
  arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });
  