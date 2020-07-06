
import  './date.js';
import { getWeatherByCity, getForecast } from './api';



function renderSelectedCity(cityKey) {
    let cityImage = cities[cityKey].url;
    let image = document.getElementById('image-placeholder');
    image.setAttribute('src', cityImage);
    getWeatherByCity(cities[cityKey].name).then(data => renderCityInfoBox(data))
}


function renderForcastDay(item){

    const {dt_txt, dt  } = item;

   
    let target = document.querySelector('.forecastcontainer');

    const wrapper = document.createElement('div');
    wrapper.classList.add('forecast-info');

    const dtTemp = document.createElement('h1');
    dtTemp.innerText = ` ${Math.floor((item.main.temp)/10)} ‎°C ` ;
    
    let foreCastfirst = document.createElement('div');
                    let day = new Date(item.dt_txt).getDate();
                    let month = new Date(item.dt_txt).getMonth() + 1;
                    let year = new Date(item.dt_txt).getFullYear();
                    let mm = month < 10 ? '0' + month : month;
                    let dd = day < 10 ? '0' + day : day;
                    foreCastfirst.innerText = dd + "." + mm + "." + year;



   

    const cloudsWrap = document.createElement('div');
    cloudsWrap.innerText = item.weather[0].description;

    const clouds = document.createElement('img');
   


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
    wrapper.append(dtTemp)
    wrapper.append(foreCastfirst)
    cloudsWrap.append(clouds)
    wrapper.append(cloudsWrap)

    
    wrapper.append(clouds)
    target.append(wrapper);

}



if(selectedCity) {
getForecast(cities[selectedCity].name).then(data => {

        return data.list.filter((item, index) => {
              if(index === 0) return item;
              if((index +1) % 8 === 0) return item;
     })
     }).then(result => result.map(item => renderForcastDay(item)))
    }
   
