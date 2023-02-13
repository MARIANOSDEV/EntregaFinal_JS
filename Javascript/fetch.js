
let divVPClima = document.querySelector(`#climas`)

function mostrarClima(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=3435910&lang=sp&appid=60703eaf0cf50845cb062140932336a9&units=metric`)

    .then((resp) => resp.json())
    .then((data) => {
        divVPClima.innerHTML = ""
        let divClima = document.createElement(`ul`)
        divClima.className = `clima`
        divClima.innerHTML = `
        <span>${JSON.stringify(data.name)} ${JSON.stringify(data.sys.country)}</span>
        <span>Temp: ${JSON.stringify(data.main.temp)}°C, Humedad: %${JSON.stringify(data.main.humidity)}</span>`
        divVPClima.append(divClima)
    })
}

mostrarClima()
setInterval(() => {
    mostrarClima()
}, 360000)
