const searchInput = document.querySelector("input");
const errorInfo = document.querySelector("#errorInfo");
const button = document.querySelector("button");
button.addEventListener("click", (e) => {
    getLocation();
    e.preventDefault();
})

async function getData(city){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2f36dadd85054b5591e102613233004&q=${city}`);
        const data = await response.json();
        filterData(data);
    } catch(error){
        console.log(error);
        errorInfo.textContent = "Make sure you entered a city name";
    } 
}

function filterData(data){
    const tempCity = data.location.name;
    const tempCel = data.current.temp_c;
    console.log(`City: ${tempCity} temperature in Celsius: ${tempCel}`);
}

function getLocation(){
    const city = searchInput.value;
    getData(city);
}