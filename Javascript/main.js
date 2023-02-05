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
        consultarPadronSocios(socios, sociosBaja)
    }
    else{
        Swal.fire({  confirmButtonColor: '#ff0000',
                    title:`Por favor complete todos los campos correctamente!`})
}
}




function ingresarNuevoSocio(tomaArray){
    ultimoAnioPago = 2022 + parseInt(formAsociarse[2].value)
    let nuevoSocio = new Socio(tomaArray[tomaArray.length-1].id+1, formAsociarse[0].value, detectarCategoriaCorrecta(parseInt(formAsociarse[1].value)), cuotaPorCategoria(parseInt(formAsociarse[1].value)), ultimoAnioPago)
    tomaArray.push(nuevoSocio)
    localStorage.setItem("padron", JSON.stringify(socios))
    Swal.fire({
        position: 'center',
        icon: 'success',
        confirmButtonColor: '#ff0000',
        title: `    Usted ha completa el registro correctamente!
        Bienvenido socio N°${nuevoSocio.id}`,
        showConfirmButton: false,
        timer: 4000
      })
    formAsociarse.reset()
}

function ingresarPago(){
    if( buscarSocios(socios, formularioPago[0].value) == undefined){}
    else{
        let pagoTotal = formularioPago[1].value*buscarSocios(socios, formularioPago[0].value).cuotaValor
        let actualizarPago = buscarSocios(socios, formularioPago[0].value).ultimoAnioPago + parseInt(formularioPago[1].value)
        buscarSocios(socios, formularioPago[0].value).ultimoAnioPago = actualizarPago
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `El pago por $${pagoTotal} fue exitoso. Abono hasta ${actualizarPago}`,
            confirmButtonColor: '#ff0000',
            showConfirmButton: false,
            timer: 3000
          })
        consultarPadronSocios(socios, sociosBaja)
        localStorage.setItem("padron", JSON.stringify(socios))
        localStorage.setItem("sociosBaja", JSON.stringify(sociosBaja))
        formPago.reset()
    }
}

function consultarPadronSocios(tomaArray, tomaArrayBaja){
    sociosDiv.innerHTML = ""
    for(let asociado of tomaArray){
        let verSocio = document.createElement("tr")
        verSocio.id = `elementoPadron${asociado.id}`
        verSocio.innerHTML =`

        <th scope="row">${asociado.id}</th>
        <td>${asociado.nombre}</td>
        <td>${asociado.categoria}</td>
        <td>$${asociado.cuotaValor}</td>
        <td>${asociado.ultimoAnioPago}</td>
        <td><button type="button" class="btn-close" aria-label="Close" id="eliminar${asociado.id}"></button></td>
        `
        sociosDiv.append(verSocio)}
    for(let asociado1 of tomaArrayBaja){
        let verSocio = document.createElement("tr")
        verSocio.id = `elementoPadron${asociado1.id}`
        verSocio.className = `inactivo`
        verSocio.innerHTML =`

        <th scope="row">${asociado1.id}</th>
        <td>${asociado1.nombre}</td>
        <td>${asociado1.categoria}</td>
        <td>$${asociado1.cuotaValor}</td>
        <td>Inactivo</td>
        <td>Socio de baja</td>
        `
        sociosDiv.append(verSocio)}
        tomaArray.forEach((asociado)=>{
        document.getElementById(`eliminar${asociado.id}`).addEventListener("click", ()=>{
        let lineaInfo = document.getElementById(`elementoPadron${asociado.id}`)
        lineaInfo.remove()
        let posicion = tomaArray.indexOf(asociado)
        const bajasSocioStorage = new SocioBaja (asociado.id, asociado.nombre, asociado.categoria, asociado.cuotaValor, asociado.ultimoAnioPago)
        tomaArray.splice(posicion, 1)
        tomaArrayBaja.push(bajasSocioStorage)
        localStorage.setItem("padron", JSON.stringify(tomaArray))
        localStorage.setItem("sociosBaja", JSON.stringify(tomaArrayBaja))
        })
    })

}


//funciones accesorios

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
    sociosDiv.innerHTML = ""
    let socioBusqueda = parseInt(parametro)
    let buscar = socios.filter(
        (socio) => socio.id == socioBusqueda )
    if(parametro ==""){noBuscado()
    }
    else if(buscar.length == 0 && isNaN(parametro))
        {noEncontrado()}
        else{
            consultarPadronSocios(buscar, [])
            return buscar
        }
    }
    
function buscarSocioPorNombre(parametro){
    sociosDiv.innerHTML = ""
    let socioBusqueda = parametro.toLowerCase()
    let buscar = socios.filter(
        (socio) => socio.nombre.toLowerCase().includes(socioBusqueda))
    if(buscar.length === socios.length){ noBuscado()
    }
    else if(buscar.length == 0)
        {noEncontrado()}
        else{
            consultarPadronSocios(buscar, [])
        }
}
function noBuscado(){
    sociosDiv.innerHTML = ""
    let verSocio = document.createElement("tr")
    verSocio.innerHTML =`
        <th scope="row"></th>
        <td>Busqueda Socios</td>`
    sociosDiv.append(verSocio)
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


//DOM


botonPadron.onclick = () => {
    consultarPadronSocios(socios, sociosBaja)
}
searchSocio.addEventListener("input", () =>{
    buscarSocioPorNombre(searchSocio.value)
})
searchSocio.addEventListener("focus", () =>{
    buscarSocioPorNombre(searchSocio.value)
})
searchSocioNumero.addEventListener("input", () =>{
    buscarSocioPorNumero(searchSocioNumero.value)
})
searchSocioNumero.addEventListener("focus", () =>{
    buscarSocioPorNumero(searchSocioNumero.value)
})

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



   