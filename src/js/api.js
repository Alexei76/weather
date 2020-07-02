const API_KEY = '10596381ff4bbaf68c11b7be4338d315';

export function getWeatherByCity(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&appid=${API_KEY}`).then(rsp => rsp.json())
}

export function getForecast(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`).then(rsp => rsp.json())
}
