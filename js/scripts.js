//variaveis dos eventos

const apiKey = "0cfca4e7a7cf2f309561e7c2b5a703d6";
const apiCountryURL1 = "https://flagsapi.com/"; //revisar
const apiCountryURL2 = "/shiny/64.png"; //revisar

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");


// Funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    //console.log(data)
    return data;

};

const showWeatherData = async (city) => {
    //getWeatherData(city);
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL1 + data.sys.country + apiCountryURL2);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} Km/h`;

    //Remove a classe invisivel após execução
    weatherContainer.classList.remove("hide");

};


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{

    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});