//clases y arrays

class Socio {
    constructor(id, nombre, categoria, cuotaValor, ultimoAnioPago){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.cuotaValor = cuotaValor
        this.ultimoAnioPago = ultimoAnioPago
    }
}
//Padron de socios actual.
const socio1 = new Socio(1,"Mariano Sanchez","Socio Activo", 3000, 2023)
const socio2 = new Socio(2,"Magali Sanchez","Socio Infantil", 2000, 2023)
const socio3 = new Socio(3,"Marcela Roberto","Socio Activo", 3000, 2022)
const socio4 = new Socio(4,"Florencia Sanchez","Socio Activo", 3000, 2023)
const socio5 = new Socio(5,"Luciano Rondo","Socio Cadete", 2500, 2022)

const socios = []

socios.push(socio1, socio2, socio3, socio4, socio5)

class pago {
    constructor(cuponPago, id, categoria, cantidadCuotas, totalPago, actualizaAnioPago){
        this.cuponPago = cuponPago,
        this.id = id,
        this.categoria = categoria,
        this.cantidadCuotas = cantidadCuotas
        this.totalPago = totalPago
        this.actualizaAnioPago = actualizaAnioPago
    }
}

const pagos = []

//variables
let sociosDiv = document.getElementById("sociosDiv")

let boton = document.getElementById("botones")

//funciones

function ingresarNuevoSocio(tomaArray){
    let nombreNuevoSocio = prompt("Ingrese nombre y apellido")
    let edadSocio = prompt("Ingrese su edad")
    while (isNaN(edadSocio)){
        edadSocio = parseInt(prompt("Ingresar correctamente."))
        }
    let cantidadAbonos = parseInt(prompt(`Cantidad de abonos.`))
    while (isNaN(cantidadAbonos)){
        cantidadAbonos = parseInt(prompt("Ingresar correctamente."))
        }
    ultimoAnioPago = 2022 + cantidadAbonos
    const nuevoSocio = new Socio(tomaArray.length+1, nombreNuevoSocio, detectarCategoriaCorrecta(edadSocio), cuotaPorCategoria(edadSocio), ultimoAnioPago)
    tomaArray.push(nuevoSocio)
}

function ingresarPago(tomaArray){
    let numeroSocio = buscarNumeroSocio ()
    if (numeroSocio == null){}
    else{
    let cantidadCuotas = parseInt(prompt("Cuantas cuotas desea abonar?"))
    while (isNaN(cantidadCuotas)){
        cantidadCuotas = parseInt(prompt("Por favor ingrese cantidad de cuotas correctamente."))
        }
    let totalPago = buscarCategoriaSocios(socios, numeroSocio).cuotaValor*cantidadCuotas
    let actualizaAnioPago = parseInt(buscarCategoriaSocios(socios, numeroSocio).ultimoAnioPago)+parseInt(cantidadCuotas)
    const nuevoPago = new pago(tomaArray.length+1, numeroSocio, buscarCategoriaSocios(socios, numeroSocio).categoria, cantidadCuotas, totalPago, actualizaAnioPago)
    tomaArray.push(nuevoPago)
    buscarCategoriaSocios(socios, numeroSocio).ultimoAnioPago = actualizaAnioPago
}}

function consultarPadronSocios(tomaArray){
    for(let asociado of tomaArray){
        let verSocio = document.createElement("tr")
        verSocio.innerHTML =`

        <th scope="row">${asociado.id}</th>
        <td>${asociado.nombre}</td>
        <td>${asociado.categoria}</td>
        <td>${asociado.ultimoAnioPago}</td>`

        sociosDiv.append(verSocio)
    }
}
function detectarCategoriaCorrecta(rangoEdad){
    if (rangoEdad < 12 ){
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

function buscarCategoriaSocios(tomaArray, parametro){
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
    while (buscarCategoriaSocios(socios, numeroSocio) == undefined && numeroSocio != null)
    {numeroSocio = prompt(`Ingrese su numero de socio correctamente`)}
return numeroSocio}
function buscarSocioPorNombre(tomaArray){
    let socioBusqueda = prompt("Ingrese su nombre o apellido.")
    let buscar = tomaArray.filter(
        (socio) => socio.nombre.toLowerCase().includes(socioBusqueda))
    if(buscar.length == 0){
        console.log(`${socioBusqueda} no se encuentra en nuestro Padron, por favor ingrese los datos correctos.`)
    }else{
        consultarPadronSocios(buscar)
    }
}

function navegador(){
    let salirMenu = false
    do{
        salirMenu = navegadorIndice(salirMenu)
    }while(!salirMenu)
}

function navegadorIndice(salir){
    let opcionIngresada = prompt(
`Bienvenido al Club Atletico Independiente, seccion Socios!
Para poder ayudarlo, ingrese la opción deseada
                1 - Asociarse
                2 - Abonar Cuota
                3 - Consultar informacion de socio
                Funciones exclusivas para admin:
                -- (Password para UAT "admin")
                0 - Salir del menu`)*1
    
        switch(opcionIngresada){
            case 1:
                ingresarNuevoSocio(socios)  
            break
            case 2:
                ingresarPago(pagos)
            break
            case 3:
                buscarSocioPorNombre(socios)
            break
            case 4:
                
            break
            case 0:
                console.log("Gracias por ser parte del club mas grande del mundo! C.A.I.")
                salir = true
                return salir
            default:
                console.log("Ingrese una opción correcta")
            break
        }
}


botones.onclick = () => {consultarPadronSocios(socios)}
// navegador()

// let listaPrueba = document.getElementById("opcionesSocios")
// listaPrueba.innerHTML += `<li class="acaVaLji">Escribo<li/>`

// function abrirNavegador()
// {navegador()}