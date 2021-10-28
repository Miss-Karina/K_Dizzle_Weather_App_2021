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
h3.innerHTML = `${currentDay} ${currentHour}:${minutes}`;
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

//Celsius & Fahrenheit Changes -------------
function celsiusChange(event) {
	event.preventDefault();
	todayTemp.innerHTML = '29';
}
function fahrenheitChange(event) {
	event.preventDefault();
	todayTemp.innerHTML = '84';
}
let todayTemp = document.querySelector('#current-temperaature');

////////let celsiusTemp = document.querySelector('#celsius');
////////celsiusTemp.addEventListener('click', celsiusChange);

////////let fahrenheitTemp = document.querySelector('#fahrenheit');
////////fahrenheitTemp.addEventListener('click', fahrenheitChange);

//Celsius & Fahrenheit Changes -------------

//Current Temperature Display
function displayCurrentTemp(response) {
	console.log(response);
	console.log(response.data.main.temp);
	let temperature = Math.round(response.data.main.temp);
	console.log(temperature);
	let currentTempDisplay = document.querySelector('#current-temperature');
	currentTempDisplay.innerHTML = `${temperature}°`;

	let currentLowTemp = Math.round(response.data.main.temp_min);
	let displayLow = document.querySelector('#low');
	displayLow.innerHTML = `${currentLowTemp}° LOW`;

	let currentHighTemp = Math.round(response.data.main.temp_max);
	let displayHigh = document.querySelector('#high');
	displayHigh.innerHTML = `${currentHighTemp}° HIGH`;

	let condition = document.querySelector('#condition');
	condition.innerHTML = response.data.weather[0].description;
}
//Current Temperature Display

function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = '1fd8093fa5ff12d796d7de756cc9d6b9';
	let geoUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
	axios.get(geoUrl).then(displayCurrentTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);
