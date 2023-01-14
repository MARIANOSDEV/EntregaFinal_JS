//Socios:
//Cotizador de Cuotas sociales
//Asociarse
//Pago de cuotas

//Cotizador por categorias: Infantil menores de 12 años - Cadete menores de 18 años - Activo + 18 años.
//Infantil: 2000
//Cadete: 2500
//Activo: 3000
//Socios nuevos deben abonar 3 cuotas juntas.

//Validador de categoria
//<12 años = Infantil
//>= 12 años o < 18 años = Cadete
//>= 18 años = Activo

alert("Bienvenido! Usted esta ingresando a la web de gestion de Cuotas Sociales del Club. Para ayudarlo a poder gestionar su tramite por favor brindenos la siguiente informacion.")

let socioConfirmacion = prompt("Ya sos socio?")
//Los socios tienen la posibilidad de calcular y abonar la cuota online.
//Para ello analizamos que categoria de socio corresponde. con esto mas la cantidad de cuotas que desea abonar le daremos el cupon de pago.
if(socioConfirmacion.toLowerCase() == "si" ){
    let miembros = ""
    let valorTotal = 0
        do{
        let socioNombre = prompt("Nombre de Socio.")
        console.log(socioNombre)
        let rango = parseInt(prompt(`Hola ${socioNombre}. Por favor ingresa tu edad.`))
        if (rango < 12 ){
            let valor = 2000
            let categoria = "infantil"
            valorTotal = valorTotal + socios(valor, categoria, socioNombre)
        }
        else if (rango >= 12 && rango < 18){
            let valor = 2500
            let categoria = "cadete"
            valorTotal = valorTotal + socios(valor, categoria, socioNombre)
        }
        else if(rango >= 18){
            let valor = 3000
            let categoria = "activo"
            valorTotal = valorTotal + socios(valor, categoria, socioNombre)
        }
        miembros = prompt("Desea gestionar otro socio en la misma consulta? si/no")
        }
        while (miembros != "no")
    alert(`El cupon de pago se imprimira por un valor total de $${valorTotal}
    Por favor, chequear en "informacion util" por medios de pagos.`)
    console.log(`Total a abonar $${valorTotal}`)
    }
    //Si llegara alguien sin ser socio, debemos comunicarle la forma para asociarse.
    //Para ello deberemos saber su categoria, e informarle que debe abonar 3 cuotas o mas por unica vez.
else
{
    let nuevoSocio = prompt(`Es muy importante para el Club contar con tu apoyo.
    Te invitamos a asociarte, y te contamos que para ello no tendras que abonar la afiliacion.
    Para comenzar con tu gestion, contanos tu nombre!`)
    let nombreCompleto = nuevoSocio + " " + prompt(`${nuevoSocio}, un placer! por favor comentanos tu apellido.`)
    alert(`Perfecto ${nombreCompleto}, muy pronto habilitaremos la seccion completa para asociarte!`)
}

//Solo por unica vez, deberas abonar 3 cuotas o mas. En los proximos pagos, podras abonar mensualmente.

function socios (valorCategoria, suCategoria, socio) {
    alert(`Usted es categoria ${suCategoria}, el valor de la cuota es de ${valorCategoria}.`)
    let cantidadDeCuotas = parseInt(prompt("Cuantas cuotas desea abonar?"))
    let valorPorCategoria = parseInt(valorCategoria)
    let valor = cantidadDeCuotas*valorPorCategoria
            alert(`Socio: ${socio}
            Concepto: ${cantidadDeCuotas} cuota/s
            Mensual: $${valorPorCategoria}
            Total: $${cantidadDeCuotas*valorPorCategoria}`)
            console.log(`Abonara ${cantidadDeCuotas} cuota/s. Total: $${cantidadDeCuotas*valorPorCategoria}`)
            return valor
        }

//function noSocios ()

