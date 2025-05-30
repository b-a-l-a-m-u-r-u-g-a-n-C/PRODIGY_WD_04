const API_KEY = 'c4f5ae4fb5de64cd15e9965a0a49f3fc'; 

function displayWeather(data) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  if (data.cod !== 200) {
    weatherDisplay.innerHTML = `<div class="col-md-6 text-center"><p class="text-danger">❌ ${data.message}</p></div>`;
    weatherDisplay.style.display = 'block';
    return;
  }

  const { name, weather, main, wind } = data;
  weatherDisplay.innerHTML = `
    <div class="col-md-6 weather-card text-center">
      <h2 class="mb-3">📍 ${name}</h2>
      <p class="lead">${weather[0].main} - ${weather[0].description}</p>
      <p><strong>🌡️ Temperature:</strong> ${main.temp} °C</p>
      <p><strong>💧 Humidity:</strong> ${main.humidity}%</p>
      <p><strong>🌬️ Wind:</strong> ${wind.speed} m/s</p>
    </div>
  `;
  weatherDisplay.style.display = 'flex';
}

async function getweather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert('Please enter a city name.');
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  const data = await res.json();
  displayWeather(data);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported.');
    return;
  }

  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
    const data = await res.json();
    displayWeather(data);
  }, () => {
    alert('Unable to get location.');
  });
}
