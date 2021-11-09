/** @format */

// Current Day/Time--------------
let currentDayTime = new Date();
console.log(currentDayTime);
console.log(currentDayTime.getDay());
console.log(currentDayTime.getMinutes());
console.log(currentDayTime.getHours());

let days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

let h3 = document.querySelector('h3');
let currentDate = currentDayTime.getDate();
let currentMinutes = currentDayTime.getMinutes();
let currentHour = currentDayTime.getHours();
let currentDay = days[currentDayTime.getDay()];

console.log(days[currentDayTime.getDay()]);

let minutes = currentDayTime.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}
h3.innerHTML = `Last updated : ${currentDay} ${currentHour}:${minutes} (GMT-6)`;
// Current Day/Time--------------

function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector('#city-input');
	console.log(searchInput.value);
	let h1 = document.querySelector('h1');
	h1.innerHTML = `${searchInput.value}`;
	let apiKey = '1fd8093fa5ff12d796d7de756cc9d6b9';
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayCurrentTemp);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

//Current Temperature Display
function displayCurrentTemp(response) {
	console.log(response);
	let currentTempDisplay = document.querySelector('#current-temperature');
	currentTempDisplay.innerHTML = Math.round(response.data.main.temp);

	let currentLowTemp = Math.round(response.data.main.temp_min);
	let displayLow = document.querySelector('#low');
	displayLow.innerHTML = `${currentLowTemp}°/`;

	let currentHighTemp = Math.round(response.data.main.temp_max);
	let displayHigh = document.querySelector('#high');
	displayHigh.innerHTML = `${currentHighTemp}°`;

	let condition = document.querySelector('#condition');
	condition.innerHTML = response.data.weather[0].description;

	let windSpeed = Math.round(response.data.wind.speed);
	console.log(response.data.wind.speed);
	let displayWindSpeed = document.querySelector('#wind-speed');
	displayWindSpeed.innerHTML = `WIND: <strong>${windSpeed}</strong> kh/m`;

	let humidity = response.data.main.humidity;
	console.log(response.data.main.humidity);
	let displayHumidity = document.querySelector('#humidity');
	displayHumidity.innerHTML = `HUMIDITY: ${humidity} %`;

	globalFahrenheitTemperature = response.data.main.temp;

	let iconChange = response.data.weather[0].icon;
	console.log(response.data.weather[0].icon);
	let displayIconChange = document.querySelector('#center-icon');
	displayIconChange.setAttribute(
		'src',
		`https://openweathermap.org/img/wn/${iconChange}@2x.png`,
	);
}
//Current Temperature Display

//Celsius & Fahrenheit Changes -------------

function displayCelsiusTemperature(event) {
	event.preventDefault();
	let celsiusTemperature = (globalFahrenheitTemperature - 32 * 5) / 9;
	let currentTempDisplay = document.querySelector('#current-temperature');
	currentTempDisplay.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let fahrenheitTemperature = document.querySelector('#current-temperature');
	fahrenheitTemperature.innerHTML = Math.round(globalFahrenheitTemperature);
}
let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemperature);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let globalFahrenheitTemperature = null;

//Celsius & Fahrenheit Changes -------------

function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = '1fd8093fa5ff12d796d7de756cc9d6b9';
	let geoUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
	axios.get(geoUrl).then(displayCurrentTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);
