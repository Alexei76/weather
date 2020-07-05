import { cities } from '../data/cityPhoto.js';
import { getWeatherByCity, getForecast } from './api';
import  './date.js';


function renderSelectedCity(cityKey) {
    let cityImage = cities[cityKey].url;
    let image = document.getElementById('image-placeholder');
    image.setAttribute('src', cityImage);
    getWeatherByCity(cities[cityKey].name).then(data => renderCityInfoBox(data))
}


function createCityDropdown(cities) {
    let select = document.createElement('select');
    let target = document.querySelector('.locations');
    select.setAttribute('name', 'city-selector');
    select.setAttribute('id', 'city-selector');
    select.setAttribute('class', 'locations__select');

    let emptyOption = document.createElement('option');
    emptyOption.setAttribute('value', 'none');
    emptyOption.innerText = '--select--';
    select.append(emptyOption);
    
    for (const city in cities) {
        let option = document.createElement('option');
        option.setAttribute('value', city)
        option.setAttribute('id', city)
        option.innerText = cities[city].name;
        select.append(option);
    }
    select.addEventListener('change', (event) => {
        let cityKey = event.target.value;
        renderSelectedCity(cityKey);
        localStorage.setItem('selectedCity', cityKey);
       
    })
    target.append(select);
}




function renderForcastDay(item){

    let nameOfCity = document.querySelector('.city');
    nameOfCity.innerText = data.name;
    let temperature = document.querySelector('.temperature');
    temperature.innerText = "Temperature " + Math.floor(data.main.temp) + "°C";
    let clouds = document.querySelector('.clouds');
    let weatherDescription = document.querySelector('.weather-description');
    weatherDescription.innerText = data.weather[0].description;
    let sentece = weatherDescription.innerText;
    let wind = document.querySelector('.wind-speed');
    wind.innerText = "Wind: " + data.wind.speed + " m/s";



   
    let target = document.querySelector('.forecastcontainer');

    const wrapper = document.createElement('div');
    wrapper.classList.add('forecast-info');

    const foreCastfirst = document.createElement('div');
    foreCastfirst.innerText = `${item.dt}: ${item.dt_txt}`;

    wrapper.append(foreCastfirst)
    target.append(wrapper);

}

function renderCityInfoBox(data) {
    const {name, main, sys, weather} = data;
    

  

   
    let target = document.querySelector('.locations');

    const container = document.createElement('div');
    container.classList.add('city-info-box');

    const cityName = document.createElement('div');
    cityName.innerText = `${name}: ${Math.round(parseFloat(main.temp))}`;

    const celsius = document.createElement('span')
    celsius.innerHTML = '&#x2103;'

    const countryName = document.createElement('div');
    countryName.innerText = `${sys.country}`;

    const imgDiv = document.createElement('div');
    imgDiv.classList.add = ('weathericon');

    const wico = document.createElement('span');
    wico.innerHTML = `${weather.icon}`;
    imgDiv.append(wico);

  

   
    
    cityName.append(celsius)
    
    
    container.append(cityName)
    container.append(countryName)
    container.append(imgDiv)
    
    target.append(container);
}

createCityDropdown(cities);



const selectedCity = localStorage.getItem('selectedCity');


if(selectedCity) {
getForecast(cities[selectedCity].name).then(data => {

        return data.list.filter((item, index) => {
              if(index === 0) return item;
              if((index +1) % 8 === 0) return item;
     })
     }).then(result => result.map(item => renderForcastDay(item)))
   





    
    let selectedCityElement = document.getElementById(selectedCity)
    if(selectedCityElement){
        selectedCityElement.selected = true
        renderSelectedCity(selectedCity);
    } 
} else {
    console.log('...simple flow');
}
