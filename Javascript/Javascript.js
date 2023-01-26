class Socio {
    constructor(id, nombre, categoria, cuotaValor, ultimoMesPago, ultimoAnioPago){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.cuotaValor = cuotaValor
        this.ultimoMesPago = ultimoMesPago
        this.ultimoAnioPago = ultimoAnioPago
    }
}

const socio1 = new Socio(1,"Mariano Sanchez","Socio Activo", 3000, 1, 2023)
const socio2 = new Socio(2,"Magali Sanchez","Socio Infantil", 2000, 1, 2023)
const socio3 = new Socio(3,"Marcela Roberto","Socio Activo", 3000, 12, 2022)
const socio4 = new Socio(4,"Florencia Sanchez","Socio Activo", 3000, 1, 2023)
const socio5 = new Socio(5,"Luciano Rondo","Socio Cadete", 2500, 12, 2022)

const socios = []

socios.push(socio1, socio2, socio3, socio4, socio5)

class pago {
    constructor(cuponPago, id, categoria, cantidadCuotas, totalPago){
        this.cuponPago = cuponPago,
        this.id = id,
        this.categoria = categoria,
        this.cantidadCuotas = cantidadCuotas
        this.totalPago = totalPago
    }
}

const pagos = []

function consultarPadronSocios(tomaArray){
    console.log("Padron de socios:")
    for(let asociado of tomaArray){
        console.log(`Socio N°: ${asociado.id}// , ${asociado.nombre}, ${asociado.categoria}, Cuota: $${asociado.cuotaValor}, Ultimo abono: Mes ${asociado.ultimoMesPago} del año ${asociado.ultimoAnioPago}.`)
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
    let ultimoMesPago = 0 //deberia declarar la variable con un validador de fecha para abonar el mes a ingresar y que registre ese dato
    let ultimoAnioPago = 2023 // idem ultimoMesPago pero con año
    console.log("Iniciando gestion de nuevo socio...")
    let mesPagoIngreso = prompt(`${nombreNuevoSocio}, gracias por acercarse al Club Atletico Independiente.
    Usted esta por ser el ${categoriaCorrecta} N°: ${tomaArray.length+1}, y debe abonar, al menos,
    la 1er cuota para terminar su registro.
    El valor es de $${cuotaValor}. Cuantas cuotas desea abonar? (maximo 12 cuotas.)`)
    let pagoIngresado = cuotaValor * mesPagoIngreso
    console.log(`Ha realizado un pago de $${pagoIngresado}.`)
    ultimoMesPago = ultimoMesPago + mesPagoIngreso
    const nuevoSocio = new Socio(tomaArray.length+1, nombreNuevoSocio, categoriaCorrecta, cuotaValor, ultimoMesPago, ultimoAnioPago)
    tomaArray.push(nuevoSocio)
    console.log(`${nombreNuevoSocio} agradecemos su pago para confirmar, bienvenido a C.A.I. ya es el socio n° ${tomaArray.length}!`)
}

function ingresarPago(tomaArray, actualizaArray){
    let numeroSocio = prompt("Ingrese su numero de socio")
    let nombreSocio = buscarCategoriaSocios(socios, numeroSocio).nombre
    let categoria = buscarCategoriaSocios(socios, numeroSocio).categoria
    let cantidadCuotas = prompt("Cuantas cuotas desea abonar?")
    let totalPago = buscarCategoriaSocios(socios, numeroSocio).cuotaValor*cantidadCuotas
    alert(`Socio ${nombreSocio} N°${numeroSocio} abonara ${cantidadCuotas} cuota/s por un total de $${totalPago}... por favor click en "aceptar" para abonar`)
    let actualizaMesPago = parseInt(buscarCategoriaSocios(socios, numeroSocio).ultimoMesPago)+parseInt(cantidadCuotas)
    const nuevoPago = new pago(tomaArray.length+1, numeroSocio, categoria, cantidadCuotas, totalPago)
    console.log(`Usted a realizado el pago con exito, su abono se encuentra saldado hasta el mes ${actualizaMesPago}.`)
    tomaArray.push(nuevoPago)
    console.log(tomaArray)
    buscarCategoriaSocios(socios, numeroSocio).ultimoMesPago = actualizaMesPago
    console.log(actualizaArray)
}

function buscarSocio(tomaArray){
    let socioBusqueda = prompt("Ingrese su nombre o apellido.")
    let buscar = tomaArray.filter((socio) => socio.nombre.includes(socioBusqueda))
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
    if(socioEncontrado == undefined){
        console.log(`${socioBuscado} no se encuentra en nuestro padron, por favor volver a consultar correctamente.`)
    }else{
        return socioEncontrado
    }
}



function navegador(){
    let salirMenu = false
    do{
        salirMenu = navegadorIndice(salirMenu)
    }while(!salirMenu)
} 

function navegadorIndice(salir){
    let opcionIngresada = parseInt(prompt(
`Bienvenido al Club Atletico Independiente, seccion Socios!
Para poder ayudarlo, ingrese la opción deseada
                1 - Asociarse: (UAT)
                2 - Abonar Cuota: SOON
                3 - Consultar informacion de socio: (UAT)
                4 - Consultar padron de socios (FUNCION ADMIN) (UAT)
                0 - Salir del menu`))
    
        switch(opcionIngresada){
            case 1:
                ingresarNuevoSocio(socios)  
            break
            case 2:
                ingresarPago(pagos, socios)
            break
            case 3:
                buscarSocio(socios)
            break
            case 4:
                consultarPadronSocios(socios)
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



//código
navegador()