let valueSearch = document.getElementById('city-input');
let city = document.getElementById('city-name');
let temp = document.getElementById('temperature');
let desc = document.getElementById('weather-description');
let button = document.getElementById('search-btn');

button.addEventListener('click', function () {
    let cityName = valueSearch.value.trim();
    if (cityName !== '') {
        getWeather(cityName);
    }
})

function getWeather(cityName) {
    const apiKey = '638d8a571506b3f5f5ba53d9405eda43';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) throw new Error('City not found');
            return res.json();
        })
        .then(data => {
            city.textContent = data.name;
            temp.textContent = `Temperature: ${data.main.temp}°C`;
            desc.textContent = `Description: ${data.weather[0].description}`;

            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = iconUrl;
            weatherIcon.style.display = 'inline-block';
        })
        .catch(error => {
            city.textContent = 'City not found';
            temp.textContent = 'Temperature: --°C';
            desc.textContent = 'Description: --';
            document.getElementById('weather-icon').style.display = 'none';
            console.error(error);
        });
}
