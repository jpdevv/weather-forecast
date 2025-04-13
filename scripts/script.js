let icon = document.getElementById("icon");
let temp = document.getElementById("temp");
let min_temp = document.getElementById("min-temp");
let max_temp = document.getElementById("max-temp");
let description = document.getElementById("description");
let date = document.getElementById("date");
let city_name = document.getElementById("city-name");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");
let humidity = document.getElementById("humidity");
let chance_of_rain = document.getElementById("chance-of-rain");
let feelslike = document.getElementById("feelslike");
let chance_of_snow = document.getElementById("chance-of-snow");
let air_pressure = document.getElementById("air-pressure");
let visibility = document.getElementById("visibility");
let heatindex = document.getElementById("heatindex");
let uv = document.getElementById("uv");
let gust = document.getElementById("gust");
let cloud = document.getElementById("cloud");
let avg_temp = document.getElementById("avg-temp");

document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Por favor, insira o nome de uma cidade.');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    fetch('https://ipinfo.io/json?token=1b4628ce6ebce0')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao obter IP');
            return response.json();
        })
        .then(data => {
            console.log("IP:", data.ip);
            fetchWeatherData(data.ip);
        })
        .catch(error => {
            console.error('Erro ao obter IP:', error);
            alert('Não foi possível obter sua localização automaticamente.');
        });
});

function fetchWeatherData(city) {
    const apiKey = '463d315491ea47c982b190204251101';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=yes&lang=pt`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar dados do clima');
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Erro ao obter dados do clima:', error);
            alert('Erro ao buscar dados do clima. Verifique a cidade e tente novamente.');
        });
}

function displayWeatherData(data) {
    icon.src = data.current.condition.icon || 'default-icon.png';
    temp.innerHTML = `${data.current.temp_c}<strong>°C</strong>`;
    min_temp.innerText = `Min: ${data.forecast.forecastday[0].day.mintemp_c} °C`;
    max_temp.innerText = `Max: ${data.forecast.forecastday[0].day.maxtemp_c} °C`;
    description.innerText = data.current.condition.text;
    date.innerText = formatTime(data.location.localtime);
    city_name.innerText = `${data.location.name}, ${data.location.region}`;
    sunrise.innerText = data.forecast.forecastday[0].astro.sunrise;
    sunset.innerText = data.forecast.forecastday[0].astro.sunset;
    wind.innerText = `${data.current.wind_kph} Km/h`;
    direction.innerText = `Direção: ${data.current.wind_dir}`;
    humidity.innerText = `${data.current.humidity}%`;
    chance_of_rain.innerText = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    feelslike.innerText = `${data.current.feelslike_c} °C`;
    chance_of_snow.innerText = `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`;
    air_pressure.innerText = `${data.current.pressure_mb} mb`;
    visibility.innerText = `${data.current.vis_km} km`;
    heatindex.innerText = `${data.current.heatindex_c} °C`;
    uv.innerText = data.current.uv;
    gust.innerText = `${data.current.gust_kph} kph`;
    cloud.innerText = `${data.current.cloud}%`;
    avg_temp.innerText = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;

    const app_container = document.querySelector('.app-container');
    app_container.style.display = 'flex'; // mostra a interface após carregamento
}

function formatTime(time) {
    const data = new Date(time.replace(" ", "T"));
    const opcoes = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}
