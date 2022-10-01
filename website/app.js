import dotenv from "dotenv";

dotenv.config()
/* Global Variables */
const myApiKey = process.env.APIKEY;
const generate = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() +' / '+ (d.getMonth()+1) +' / '+ d.getFullYear();


// Start Helper Functions

const giveInfo = async() => {
    const zipCode = document.getElementById('zip').value;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myApiKey}&units=metric`;
    if(zipCode === ''){
        alert('Please, Enter Your Zipcode !!');
    }else{
        const response = await fetch(apiURL);
        const dataObtained = await response.json()
        .then(saveWeatherData)
        .then(async() => {
            updateEntryHolder();
            document.querySelector('.entry').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        })
        .catch(error => {
            console.log('Error :',error);
            alert(error)
        })
    }
};

const saveWeatherData = async(dataObtained) => {
    console.log(dataObtained);
    const temperature = dataObtained.main.temp;
    const myFeelings = document.getElementById('feelings').value;
    await fetch('/sendWeatherData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: newDate,
            temp: temperature,
            content: myFeelings
        })
    });
}

const updateEntryHolder = async() => {
    const request = await fetch('/getWeatherData');
    try{
        const dataForDOM = await request.json();
        console.log(dataForDOM);
        document.getElementById('date').innerHTML = dataForDOM.date;
        document.getElementById('temp').innerHTML = dataForDOM.temp + '  C';
        document.getElementById('content').innerHTML = dataForDOM.content;
    }catch(error) {
        console.log('Error', error);
    }
};

// End Helper Functions




// Our Code

generate.addEventListener('click', giveInfo);
