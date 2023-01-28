let passAdmin = "admin"
let pass = ""

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

function consultarPadronSocios(tomaArray){
    console.log("Padron de socios:")
    for(let asociado of tomaArray){
        console.log(`Socio N°: ${asociado.id}// , ${asociado.nombre}, ${asociado.categoria}, Cuota: $${asociado.cuotaValor}, Ultimo abono: Año ${asociado.ultimoAnioPago}.`)
    }
}
function consultarPagos(tomaArray){
    if(tomaArray.length == 0){
    }
    else{console.log("Registro de pagos:")
    for(let pago of tomaArray){
        console.log(`Cupon: ${pago.cuponPago}// Socio N°: ${pago.id}, categoria "${pago.categoria}" abono ${pago.cantidadCuotas} cuotas por un total de $${pago.totalPago}, Ultimo abono: Año ${pago.actualizaAnioPago}.`)
    }}
}
function balanceIngresos(tomaArray){
    if(tomaArray.length == 0){
        console.log("Aun no se registraron pagos en el periodo actual.")
    }
    else{
        consultarPagos(tomaArray)
        let totalPagos = tomaArray.map(pago => pago.totalPago)
        let totalIngresos = totalPagos.reduce((acumulador, elemento) => acumulador + elemento, 0)
        let totalIva = totalIngresos - totalIngresos/1.21
        console.log(`Registramos un total de ingresos por $${totalIngresos}, con un iva a liquidar de $${totalIva.toFixed(2)}`)
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

function ingresarNuevoSocio(tomaArray){
    let nombreNuevoSocio = prompt("Ingrese nombre y apellido")
    let edadSocio = prompt("Ingrese su edad")
    while (isNaN(edadSocio)){
        edadSocio = parseInt(prompt("Por favor ingrese su edad correctamente!"))
        }
    let categoriaCorrecta = detectarCategoriaCorrecta(edadSocio)
    let cuotaValor = cuotaPorCategoria(edadSocio)
    let ultimoAnioPago = 2022 // idem ultimoMesPago pero con año
    console.log("Iniciando gestion de nuevo socio...")
    let cantidadAbonos = parseInt(prompt(`${nombreNuevoSocio}, gracias por acercarse al Club Atletico Independiente.
    Usted esta por ser el ${categoriaCorrecta} N°: ${tomaArray.length+1}, y debe abonar, al menos,
    el primer año para terminar su registro.
    El valor es de $${cuotaValor}. Indique cuantos abonos desea adquirir.`))
    while (isNaN(cantidadAbonos)){
        cantidadAbonos = parseInt(prompt("Por favor ingrese cantidad correctamente"))
        }
    let pagoIngresado = cuotaValor * cantidadAbonos
    console.log(`Ha realizado un pago de $${pagoIngresado}.`)
    ultimoAnioPago = ultimoAnioPago + cantidadAbonos
    const nuevoSocio = new Socio(tomaArray.length+1, nombreNuevoSocio, categoriaCorrecta, cuotaValor, ultimoAnioPago)
    tomaArray.push(nuevoSocio)
    console.log(`${nombreNuevoSocio} agradecemos su pago para confirmar, bienvenido a C.A.I. ya es el socio n° ${tomaArray.length}!`)
}

function ingresarPago(tomaArray){
    let numeroSocio = prompt("Por favor ingrese su numero de socio")
    while (buscarCategoriaSocios(socios, numeroSocio) == undefined && numeroSocio != null)
    {numeroSocio = prompt(`     Ingrese su numero de socio correctamente
    Si no conoce su numero de socio o desea hacer otra consulta,
    cancele para volver al menu principal.`)}
    if (numeroSocio != null){
    let nombreSocio = buscarCategoriaSocios(socios, numeroSocio).nombre
    let categoria = buscarCategoriaSocios(socios, numeroSocio).categoria
    let cantidadCuotas = parseInt(prompt("Cuantas cuotas desea abonar?"))
    while (isNaN(cantidadCuotas)){
        cantidadCuotas = parseInt(prompt("Por favor ingrese cantidad de cuotas correctamente."))
        }
    let totalPago = buscarCategoriaSocios(socios, numeroSocio).cuotaValor*cantidadCuotas
    alert(`Socio ${nombreSocio} N°${numeroSocio} abonara ${cantidadCuotas} cuota/s anuales por un total de $${totalPago}... por favor click en "aceptar" para abonar`)
    let actualizaAnioPago = parseInt(buscarCategoriaSocios(socios, numeroSocio).ultimoAnioPago)+parseInt(cantidadCuotas)
    const nuevoPago = new pago(tomaArray.length+1, numeroSocio, categoria, cantidadCuotas, totalPago, actualizaAnioPago)
    console.log(`Usted a realizado el pago con exito, su abono se encuentra saldado hasta el mes ${actualizaAnioPago}.`)
    tomaArray.push(nuevoPago)
    buscarCategoriaSocios(socios, numeroSocio).ultimoAnioPago = actualizaAnioPago
    }
    else{}}

function buscarSocio(tomaArray){
    let socioBusqueda = prompt("Ingrese su nombre o apellido.")
    let buscar = tomaArray.filter(
        (socio) => socio.nombre.toLowerCase().includes(socioBusqueda))
    if(buscar.length == 0){
        console.log(`${socioBusqueda} no se encuentra en nuestro Padron, por favor ingrese los datos correctos.`)
    }else{
        consultarPadronSocios(buscar)
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



function navegador(){
    let salirMenu = false
    do{
        salirMenu = navegadorIndice(salirMenu)
    }while(!salirMenu)
}

function Admin(func,array){
    if (pass != passAdmin){
        pass = prompt("Opciones exclusivas para admin, por favor ingrese la contraseña.")
        if (pass != passAdmin){
            console.log("La contraseña es incorrecta. Acceso denegado.")
            pass = ""
        }
        else{console.log("Bienvenido Admin!")
        func(array)
        }}
    else{
        func(array)
}
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
                4 - Consultar padron de socios
                5 - Consultar ingresos del club
                0 - Salir del menu`)*1
    
        switch(opcionIngresada){
            case 1:
                ingresarNuevoSocio(socios)  
            break
            case 2:
                ingresarPago(pagos)
            break
            case 3:
                buscarSocio(socios)
            break
            case 4:
                Admin(consultarPadronSocios,socios)
            break
            case 5:
                Admin(balanceIngresos,pagos)            
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

navegador()