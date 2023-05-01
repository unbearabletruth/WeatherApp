

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

function filterData(data){
    const weatherInfo = {
        location: data.location.name,
        celsius: data.current.temp_c,
        fahrenheit: data.current.temp_f,
        condition: data.current.condition.text,
        conditionIcon: data.current.condition.icon
    }
    console.log(weatherInfo.condition)
    render(weatherInfo);
    renderColor(weatherInfo.celsius);
}

function render(info){
    const cityName = document.querySelector("#city");
    cityName.textContent = info.location;
    const temp = document.querySelector("#temperature");
    temp.textContent = `${info.celsius}\u2103 / ${info.fahrenheit}\u2109`;
    const condition = document.querySelector("#conditionText");
    condition.textContent = info.condition;
    const conditionIcon = document.querySelector("#conditionImg");
    conditionIcon.src = info.conditionIcon;
}

function renderColor(celsius){
    const weatherCard = document.querySelector(".weatherInfo");
    if (celsius > 15){
        weatherCard.style.backgroundColor = "#fed7aa";
    } else if (celsius <= 15 && celsius > 5){
        weatherCard.style.backgroundColor = "#fff7ed";
    } else if (celsius <=5 && celsius > -10){
        weatherCard.style.backgroundColor = "white";
    } else {
        weatherCard.style.backgroundColor = "#bae6fd";
    }
}

function getLocation(){
    const searchInput = document.querySelector("input");
    const city = searchInput.value;
    getData(city);
}

const button = document.querySelector("button");
button.addEventListener("click", (e) => {
    getLocation();
    e.preventDefault();
})
