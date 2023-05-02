async function getData(city){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2f36dadd85054b5591e102613233004&q=${city}`);
        const data = await response.json();
        filterData(data);
    } catch(error){
        console.log(error);
        const errorInfo = document.querySelector("#errorInfo");
        errorInfo.textContent = "Make sure you entered a city name";
    } 
}

async function getForecast(city){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2f36dadd85054b5591e102613233004&q=${city}&days=3`);
    const data = await response.json();
    filterForecast(data);
}

function inputLocation(){
    const searchInput = document.querySelector("input");
    const city = searchInput.value;
    getData(city);
    getForecast(city);
}

const button = document.querySelector("button");
button.addEventListener("click", (e) => {
    inputLocation();
    e.preventDefault();
})

function filterData(data){
    const weatherInfo = {
        location: data.location.name,
        celsius: data.current.temp_c,
        fahrenheit: data.current.temp_f,
        condition: data.current.condition.text,
        conditionIcon: data.current.condition.icon,
        wind: data.current.wind_kph
    }
    render(weatherInfo);
    renderColor(weatherInfo.celsius);
}

function filterForecast(data){
    for (let i = 0; i < 3; i++) {
        const forecastDay = {
            forecastDay: data.forecast.forecastday[i].date,
            averageTemp: data.forecast.forecastday[i].day.avgtemp_c
            }
        renderForecast(forecastDay, i);
    }
}

function render(info){
    const cityName = document.querySelector("#city");
    cityName.textContent = info.location;
    const temp = document.querySelector("#temperature");
    temp.textContent = `${info.celsius}\u2103/ ${info.fahrenheit}\u2109`;
    const condition = document.querySelector("#conditionText");
    condition.textContent = info.condition;
    const conditionIcon = document.querySelector("#conditionImg");
    conditionIcon.src = info.conditionIcon;
    const wind = document.querySelector("#wind");
    wind.textContent = `Wind(km/h): ${info.wind}`;
}

function renderColor(celsius){
    const body = document.querySelector("body");
    if (celsius > 15){
        body.style.backgroundColor = "#fff7ed";
    } else if (celsius <= 15 && celsius > 5){
        body.style.backgroundColor = "#fefce8";
    } else if (celsius <= 5 && celsius > -10){
        body.style.backgroundColor = "#f0fdf4";
    } else {
        body.style.backgroundColor = "#ecfeff";
    }
}

function renderForecast(info, index){
    ++index;
    const date = document.querySelector(`#date${index}`);
    date.textContent = dateToWeekDay(info.forecastDay);
    const averageTemp = document.querySelector(`#averageTemp${index}`);
    averageTemp.textContent = `Avg \u2103: ${info.averageTemp}`;
}

function dateToWeekDay(date){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const toDate = new Date(date);
    const toweekDay = weekday[toDate.getDay()];
    return toweekDay;
}

getData("novosibirsk");
getForecast("novosibirsk");