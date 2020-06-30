import { getWeatherByCity } from './api';
import { cities } from '../data/cityPhoto';


function renderCity(data) {
    const container = document.querySelector('.cities-list');

    const cityContainer = document.createElement('div')
    cityContainer.classList.add('city_container');

    const cityTemp = document.createElement('span');
    cityTemp.classList.add('city_temp');

    cityContainer.innerText = ` ${data.name} :`;

    cityContainer.append(cityTemp)

    cityTemp.innerText = data.main.temp;

    container.append(cityContainer);
}

let arrayOfPromises = [];
