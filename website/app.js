/* Global Variables */
let zipcode = document.getElementById("zip");
let feeling = document.getElementById("feelings");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");
let currentTemp;  // to save temperature from weather api

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function showResult() {
    date.innerHTML = "Date is : " + newDate;
    temp.innerHTML = "Temprature is : " + currentTemp;
    content.innerHTML = "Feeling is : " + feeling.value;
}

// on click generate button
document.getElementById("generate").addEventListener("click", async function() {
    getWeather().then(function() {
        postData('/weather', {temperature: currentTemp, date: newDate, user_response: feeling.value});
        showResult();
    });
});

// get from OpenWeatherMap API
const getWeather = async ()=>{

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode.value}&appid=9ac4304a1d172712576f27f0f7700cbb`)
    try {
        const data = await res.json();
        currentTemp = data.main.temp;
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}