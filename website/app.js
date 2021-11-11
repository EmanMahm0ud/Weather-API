/* Global Variables */
let zipcode = document.getElementById("zip");
let feeling = document.getElementById("feelings");
let entryHolder = document.getElementById("entryHolder");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// on click generate button
function showResult() {
    let feel = feeling.value;
    console.log(feel);
    date.innerHTML = newDate;
    content.innerHTML = feel;
}

document.getElementById("generate").addEventListener("click", function() {
    let feel = feeling.value;
    console.log(feel);
    date.innerHTML = newDate;
    content.innerHTML = feel;
    postData('/addWhether', {temperature: 'cat', date: d, user_response: feel});
});

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
  
// TODO-Call Function