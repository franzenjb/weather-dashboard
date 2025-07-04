const apiKey = '75e7407db40e17b697a597cadbca6abd'; // <-- Your OpenWeatherMap API key

document.getElementById('weatherForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = 'Loading...';

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    weatherResult.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp} ℃</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    weatherResult.innerHTML = `<span style="color:red;">${err.message}</span>`;
  }
});
