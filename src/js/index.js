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

 



   
    let target = document.querySelector('.forecastcontainer');

    const wrapper = document.createElement('div');
    wrapper.classList.add('forecast-info');


   

    const foreCastfirst = document.createElement('div');
    foreCastfirst.innerText = `${item.dt_txt}`;

    const cloudsWrap = document.createElement('div');
    cloudsWrap.innerText = item.weather[0].description;

    const clouds = document.createElement('img');
    clouds.setAttribute('src', '');


    for (let i = 500; i <= 504; i++) {
        if (item.weather[0].id === i) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png');
        }
    }
    for (let l = 520; l <= 531; l++) {
        if (item.weather[0].id === l) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
        }
    }

    if (item.weather[0].id === 501) {
        clouds.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
    }

    if (item.weather[0].id === 800) {
        clouds.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
    }

    if (item.weather[0].id === 801) {
        clouds.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png');
    }
    if (item.weather[0].id === 802) {
        clouds.setAttribute('src', 'http://openweathermap.org/img/wn/03d@2x.png');
    }
    for (let j = 803; j <= 804; j++) {
        if (item.weather[0].id === j) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/04d@2x.png');
        }
    }
    for (let a = 701; a <= 781; a++) {
        if (item.weather[0].id === a) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png');
        }
    }
    for (let s = 600; s <= 622; s++) {
        if (item.weather[0].id === s) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
        }
    }
    for (let d = 300; d <= 321; d++) {
        if (item.weather[0].id === d) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
        }
    }

    for (let b = 200; b <= 232; b++) {
        if (item.weather[0].id === b) {
            clouds.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');
        }
    }

    cloudsWrap.append(clouds)
    wrapper.append(cloudsWrap)

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
