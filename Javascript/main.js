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
let indicaCuotaValor = document.getElementById("indicaCuotaValor")
let botonAbonar = document.getElementById("botonAbonar")
let botonVaciarInputPago = document.getElementById("vaciarInputPago")

//funciones principales

function checkIngreso(func, array){
    if(inputSocioAlta.value != "" && isNaN(inputSocioAlta.value) && inputEdadAlta.value != "" && inputAbonosAlta.value != "")
    {
        func(array)
        sociosSiNoBoton.classList.toggle(`classSociosSiNo`)
        serSocio()
        consultarPadronSocios(socios)
    }
    else{
        alert("Por favor complete todos los campos correctamente!")}
}

function ingresarNuevoSocio(tomaArray){
    ultimoAnioPago = 2022 + parseInt(formAsociarse[2].value)
    const nuevoSocio = new Socio(tomaArray.length+1, formAsociarse[0].value, detectarCategoriaCorrecta(parseInt(formAsociarse[1].value)), cuotaPorCategoria(parseInt(formAsociarse[1].value)), ultimoAnioPago)
    tomaArray.push(nuevoSocio)
    localStorage.setItem("padron", JSON.stringify(socios)) 
    alert(`    Usted ha completa el registro correctamente!
    Bienvenido socio N°${tomaArray.length}, ${formAsociarse[0].value}.`)
    formAsociarse.reset()
}

function ingresarPago(){
    if( buscarSocios(socios, formularioPago[0].value) == undefined){}
    else{
        let pagoTotal = formularioPago[1].value*buscarSocios(socios, formularioPago[0].value).cuotaValor
        let actualizarPago = buscarSocios(socios, formularioPago[0].value).ultimoAnioPago + parseInt(formularioPago[1].value)
        const nuevoPago = new pago(pagos.length+1,formularioPago[0].value,buscarSocios(socios, formularioPago[0].value).categoria,formularioPago[1].value, pagoTotal)
        pagos.push(nuevoPago)
        localStorage.setItem("contabilidad", JSON.stringify(pagos))
        buscarSocios(socios, formularioPago[0].value).ultimoAnioPago = actualizarPago
        alert(`El pago fue exitoso, usted tiene abonado hasta el ${actualizarPago}`)
        consultarPadronSocios(socios)
        formPago.reset()
    }
}


//funciones accesorios

function limpiarInformarCuota(){
    if(formularioPago[0].value == ""){
        let verCuota = document.createElement("div")        
        verCuota.innerHTML =`   <p>S o c i o</p>
                                <p>I n f o</p>
                                <p>C u o t a</p>`
    indicaCuotaValor.replaceChild(verCuota,indicaCuotaValor.firstElementChild)
    }
    else{}
}

function informarCuota(){
    if(formularioPago[0].value == ""){
    }
    else if(buscarSocios(socios, formularioPago[0].value) == undefined){
        let verCuota = document.createElement("div")        
        verCuota.innerHTML =`   <p>I n d i c a r</p>
                            <p>I n f o </p>
                            <p>C o r r e c t a</p>`
    indicaCuotaValor.replaceChild(verCuota,indicaCuotaValor.firstElementChild)
    }
    else{
    let verCuota = document.createElement("div")        
    verCuota.innerHTML =`   <p>${buscarSocios(socios, formularioPago[0].value).nombre}</p>
                            <p>Cat: "${buscarSocios(socios, formularioPago[0].value).categoria}"</p>
                            <p>Valor Cuota: $${buscarSocios(socios, formularioPago[0].value).cuotaValor}</p>`
    indicaCuotaValor.replaceChild(verCuota,indicaCuotaValor.firstElementChild)  }
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
        {}
        else{}}
    else{
        return socioEncontrado
    }
}

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
            return buscar
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
formularioPago[0].addEventListener("input", ()=>{
    informarCuota()
})

formularioPago[0].addEventListener("blur", ()=>{
    limpiarInformarCuota()
})

botonAbonar.onclick = () => {
    ingresarPago()
}

botonVaciarInputPago.onclick = () =>{
    formPago.reset()
    limpiarInformarCuota()
}