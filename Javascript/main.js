//variables capturas DOM

let botonAsociarse = document.getElementById("botonAsociarse")
let inputSocioAlta = document.getElementById("nombreYapellido")
let inputEdadAlta = document.getElementById("edad")
let inputAbonosAlta = document.getElementById("abonos")
let sociosDiv = document.getElementById("sociosDiv")
let sociosIngreso = document.getElementById("sociosIngreso")
let botonPadron = document.getElementById("botonesPadron")
let searchSocio = document.getElementById("buscarSocio")
let searchSocioNumero = document.getElementById("buscarSocioNumero")
let formAsociarse = document.getElementById("formAsociarse")
let formularioPago = document.getElementById("formPago")

//funciones principales

function ingresarNuevoSocio(tomaArray){
    ultimoAnioPago = 2022 + parseInt(formAsociarse[2].value)
    const nuevoSocio = new Socio(tomaArray.length+1, formAsociarse[0].value, detectarCategoriaCorrecta(parseInt(formAsociarse[1].value)), cuotaPorCategoria(parseInt(formAsociarse[2].value)), ultimoAnioPago)
    tomaArray.push(nuevoSocio)
    localStorage.setItem("padron", JSON.stringify(socios)) 
    alert(`    Usted ha completa el registro correctamente!
    Bienvenido socio N°${tomaArray.length}, ${formAsociarse[0].value}.`)
    formAsociarse.reset()
}

function checkIngreso(func, array){
    if(inputSocioAlta.value != "" && inputEdadAlta.value != "" && inputAbonosAlta.value != "")
    {
        func(array)
        sociosSiNoBoton.classList.toggle(`classSociosSiNo`)
        serSocio()
        consultarPadronSocios(socios)
    }
    else{
        alert("Por favor complete todos los campos correctamente!")}
}

//funciones accesorios

function informarCuota(){
    buscarSocios(socios, parseInt(formularioPago[0].value))
}

function consultarPadronSocios(tomaArray){
    sociosDiv.innerHTML = ""
    for(let asociado of tomaArray){
        let verSocio = document.createElement("tr")
        verSocio.innerHTML =`

        <th scope="row">${asociado.id}</th>
        <td>${asociado.nombre}</td>
        <td>${asociado.categoria}</td>
        <td>$${asociado.cuotaValor}</td>
        <td>${asociado.ultimoAnioPago}</td>
        `
        sociosDiv.append(verSocio)
    }
}

function noEncontrado(){
    sociosDiv.innerHTML = ""
    let verSocio = document.createElement("tr")
    verSocio.innerHTML =`
        <th scope="row">Error</th>
        <td>Datos no encontrados</td>`
    sociosDiv.append(verSocio)
}

function detectarCategoriaCorrecta(rangoEdad){
    if (rangoEdad == ""){
        return "Ingresar informacion correcta"
    }
    else if (rangoEdad < 12 ){
        return "Socio Infantil"
    }
    else if (rangoEdad >= 12 && rangoEdad < 18){
        return "Socio Cadete"
    }
    else if(rangoEdad >= 18){
        return "Socio Activo"
        }
}

function cuotaPorCategoria(rangoEdad){
    if (rangoEdad < 12 ){
        return 2000
    }
    else if (rangoEdad >= 12 && rangoEdad < 18){
        return 2500
    }
    else if(rangoEdad >= 18){
        return 3000
}
}

function buscarSocios(tomaArray, parametro){
    let socioBuscado = parametro
    let socioEncontrado = tomaArray.find(
        (buscado) => buscado.id == socioBuscado
    )
    if(socioEncontrado == undefined)
        {if(socioBuscado != null)
        {console.log(`${socioBuscado} no se encuentra en nuestro padron, por favor volver a consultar correctamente.`)}
        else{}}
    else{
        return socioEncontrado
    }
}

function buscarNumeroSocio (){
    let numeroSocio = prompt("Por favor ingrese su numero de socio")
    while (buscarSocios(socios, numeroSocio) == undefined && numeroSocio != null)
    {numeroSocio = prompt(`Ingrese su numero de socio correctamente`)}
    return numeroSocio}

function buscarSocioPorNumero(parametro){
    let socioBusqueda = parseInt(parametro)
    let buscar = socios.filter(
        (socio) => socio.id == socioBusqueda )
    if(parametro ==""){
    }
    else if(buscar.length === 0)
        {noEncontrado()}
        else{
        consultarPadronSocios(buscar)
        }
    }
    
function buscarSocioPorNombre(parametro){
    let socioBusqueda = parametro.toLowerCase()
    let buscar = socios.filter(
        (socio) => socio.nombre.toLowerCase().includes(socioBusqueda))
    if(buscar.length === socios.length){ 
    }
    else if(buscar.length == 0)
        {noEncontrado()}
        else{
        consultarPadronSocios(buscar)
        }
}

//DOM


botonPadron.onclick = () => {
    consultarPadronSocios(socios)
}
searchSocio.oninput = () => {
    buscarSocioPorNombre(searchSocio.value)
}
searchSocioNumero.oninput = () => {
    buscarSocioPorNumero(searchSocioNumero.value)
}
botonAsociarse.onclick = () => {
    checkIngreso(ingresarNuevoSocio,socios)
}
// console.log(`${buscarSocios(socios, formularioPago[0].value).nombre}, Cat: "${buscarSocios(socios, formularioPago[0].value).categoria}" Valor Cuota: $${buscarSocios(socios, formularioPago[0].value).cuotaValor}`)