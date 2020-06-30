import { getWeatherByCity } from './api';
import { cities } from '../data/cityPhoto';


function renderCity(data) {
    const container = document.querySelector('.cities-list');

    const cityContainer = document.createElement('div')
    cityContainer.classList.add('city_container');

    const cityTemp = document.createElement('span');
    cityTemp.classList.add('city_temp');

    cityContainer.innerText = ` ${data.name} `;

    cityContainer.append(cityTemp)

    cityTemp.innerText = ` ${Math.round(parseFloat(data.main.temp))} ‎°C ` ;

    container.append(cityContainer);
}

let arrayOfPromises = [];

for(let city in cities) {
    arrayOfPromises.push(getWeatherByCity(cities[city].name))
}

Promise.all(arrayOfPromises).then(data => data.map(item => renderCity(item)))
