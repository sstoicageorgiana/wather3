let locationUrl = {
    base: "https://maps.google.com/maps?",
    rest: "&t=&z=13&ie=UTF8&iwloc=&output=embed"
}
let urlForecast = {
    key: "e279f5e817742f298e37f9f3bba6f12a",
    base: "https://api.openweathermap.org/data/2.5/forecast?appid="
};
let urlWeather = {
    key: "c532c26c8d4eeba0066fe7d5ad23fccb",
    base: "https://api.openweathermap.org/data/2.5/weather?"
};
let iconUrl = "https://openweathermap.org/img/wn/";

async function weatherNow() {

    let cityName = document.querySelector("#cityName").value;
    let response = await fetch(`${urlWeather.base}q=${cityName}&units=metric&appid=${urlWeather.key}`);
    let json = await response.json();

    document.querySelector("#gmap_canvas").src = `${locationUrl.base}q=${cityName}${locationUrl.rest}`;
    document.querySelector("#vremea0 img").src = iconUrl + json.weather[0].icon + '.png';
    document.querySelector("#description").innerText = json.weather[0].description;
    document.querySelector("#humidity").innerText = json.main.humidity;
    document.querySelector("#pressure").innerText = json.main.pressure;
    document.querySelector("#temp").innerText = json.main.temp;
    document.querySelector("#min").innerText = json.main.temp_min;
    document.querySelector("#max").innerText = json.main.temp_max;
    document.querySelector(".map").classList.remove("hidden");

}
async function forecastWeather() {
    let cityName = document.querySelector("#cityName").value;
    let response = await fetch(`${urlForecast.base}${urlForecast.key}&units=metric&q=${cityName}`);
    let json = await response.json();
    drawForecast();
    document.querySelector(".forecast").classList.remove("hidden");
    document.querySelector("#cityName").value = "";

    function drawForecast() {

        let lista = json.list;
        let allDays = document.querySelectorAll(".days");
        let indexDays = 0;
        let dataCurenta = lista[0].dt_txt.substr(0, 10);
        allDays[indexDays].innerHTML = `<p class="data">Date : ${dataCurenta}</p>`;

        for (let i = 0; i < lista.length; i++) {
            let icon = iconUrl + lista[i]['weather'][0]['icon'] + ".png";
            let dataLista = lista[i].dt_txt.substr(0, 10);

            if (dataLista === dataCurenta) {
                allDays[indexDays].innerHTML += `
                   <div><span><img src="${icon}"></span></div>
                   <div>Hour: <span>${lista[i].dt_txt.substr(11, 5)}</span></div>
                   <div>Temperature: <span>${lista[i].main.temp + " &#8451;"}</span></div>
                   <div class="description">Description: <span>${lista[i].weather[0].description}</span></div>`
            }
            else {
                indexDays += 1;
                dataCurenta = dataLista;
                allDays[indexDays].innerHTML = `<p class="data">Date : <span>${dataCurenta}</span></p>`
                i--;
            }
        }
    }
}
function hideForecast() {
    document.querySelector(".forecast").classList.add("hidden");
}