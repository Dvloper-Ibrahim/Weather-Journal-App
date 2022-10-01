"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* Global Variables */
const myApiKey = process.env.APIKEY;
const generate = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + ' / ' + (d.getMonth() + 1) + ' / ' + d.getFullYear();
// Start Helper Functions
const giveInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const zipCode = document.getElementById('zip').value;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myApiKey}&units=metric`;
    if (zipCode === '') {
        alert('Please, Enter Your Zipcode !!');
    }
    else {
        const response = yield fetch(apiURL);
        const dataObtained = yield response.json()
            .then(saveWeatherData)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            updateEntryHolder();
            document.querySelector('.entry').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }))
            .catch(error => {
            console.log('Error :', error);
            alert(error);
        });
    }
});
const saveWeatherData = (dataObtained) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(dataObtained);
    const temperature = dataObtained.main.temp;
    const myFeelings = document.getElementById('feelings').value;
    yield fetch('/sendWeatherData', {
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
});
const updateEntryHolder = () => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield fetch('/getWeatherData');
    try {
        const dataForDOM = yield request.json();
        console.log(dataForDOM);
        document.getElementById('date').innerHTML = dataForDOM.date;
        document.getElementById('temp').innerHTML = dataForDOM.temp + '  C';
        document.getElementById('content').innerHTML = dataForDOM.content;
    }
    catch (error) {
        console.log('Error', error);
    }
});
// End Helper Functions
// Our Code
generate.addEventListener('click', giveInfo);
