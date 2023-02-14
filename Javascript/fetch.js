let i = 0
let divVPClima = document.querySelector(`#climas`)

let geo = ""
let jsonClima = []
let datosArgentina = []

let lat = ""
let long = ""


window.addEventListener('scroll', ()=> {  
setTimeout(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        long = position.coords.longitude
    })
    console.log(lat)
    console.log(long)
},3000)})


async function ciudadClima() {
    if(JSON.parse(localStorage.getItem("geolocalizacion"))){}
    else{
    let localizacion = prompt("Indica tu ciudad (Ej, Villa Carlos Paz, Buenos Aires, Santa Fe...)")
    localStorage.setItem("geolocalizacion", JSON.stringify(localizacion))}
    let resp = await
        fetch(`../city.list.json`)
    objetosClima = await resp.json()
    for (let elemento of objetosClima)
        if (elemento.country == "AR") {
            jsonClima.push(elemento)
        }
    geo = jsonClima.find(ele => ele.name == `${(JSON.parse(localStorage.getItem("geolocalizacion")))}`).id
}


function mostrarClima(parametro) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${parametro}&lang=sp&appid=60703eaf0cf50845cb062140932336a9&units=metric`)

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
        .catch(() => {
            console.warn("La conexion con Open Weather no pudo concretarce. Reintentara mas tarde.")
            divVPClima.innerHTML = ""
            let divClima = document.createElement(`ul`)
            divClima.className = `clima`
            divClima.innerHTML = `
        <ul class="clima">
                <span>"Provincia" "PAIS"</span>
                <span>Informacion climatica.</span>              
                </ul>`
            divVPClima.append(divClima)
        })
        .finally(() => {
            i++
            console.log(`Info ${i}: Clima actualizado.`)

        })
}
ciudadClima()
setTimeout(() => {
    mostrarClima(geo)
    setInterval(() => {
        mostrarClima()
    }, 360000)
}, 1500)

