let curr_city = 'London';
let units = 'metric';

// selectors
let city = document.querySelector('.city');
let condition = document.querySelector('.condition');
let temperature = document.querySelector('.temperature');
let min = document.querySelector('.min');
let max = document.querySelector('.max');
let feel = document.querySelector('.feel');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let pressure = document.querySelector('.pressure');

document.querySelector('.search-container').addEventListener('submit', e =>{
    e.preventDefault();

    let search_input = document.querySelector('.search-input');

    curr_city = search_input.value;

    weather();

    search_input.value = '';
})

function weather(){
    const api_key = 'b4184a6711a09d5ee5a0d803620a2b27';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curr_city}&appid=${api_key}&units=${units}`)
    .then(response => response.json())
    .then(data => {
        city.innerHTML = `${data.name}, ${data.sys.country}`
        temperature.innerHTML = `<p>${data.main.temp} &#176C</p>`
        min.innerHTML = `<p>Min: ${data.main.temp_min} &#176C</p>`
        max.innerHTML = `<p>Max: ${data.main.temp_max} &#176C</p>`
        feel.innerHTML = `<p>Real Feel: ${data.main.feels_like} &#176C</p>`
        humidity.innerHTML = `<p>Humidity: ${data.main.humidity} %</p>`
        wind.innerHTML = `<p>Wind Speed: ${data.wind.speed} km/h`
        pressure.innerHTML = `<p>Pressure: ${data.main.pressure} hPa</p>`

        if(data.weather[0].main === 'Clouds'){
            document.body.style.backgroundImage = 'url(./img/cloudy.svg)';
            document.body.style.color = 'black';
            condition.innerHTML = `${data.weather[0].main}`
        }
        else if(data.weather[0].main === 'Rain'){
            document.body.style.backgroundImage = 'url(./img/rainy.svg)';
            document.body.style.color = 'white';
            condition.innerHTML = `${data.weather[0].main}`
        }
        else{
            document.body.style.backgroundImage = 'url(./img/clear.svg)';
            document.body.style.color = 'white';
            condition.innerHTML = `${data.weather[0].main}`
        }

        console.log(data);
    })
    .catch((error) =>{
        alert('City not found');
    });
}

document.body.addEventListener('load', weather());