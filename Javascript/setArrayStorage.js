//Seteo primera vez.

let socios = []

if(localStorage.getItem("padron"))  {
    socios = JSON.parse(localStorage.getItem("padron"))
}
else    {
    alert("La informacion del servidor ha sido actualizada!")
    socios.push(socio1, socio2, socio3, socio4, socio5, socio6, socio7, socio8)
    localStorage.setItem("padron", JSON.stringify(socios))
}

let pagos = []

if(localStorage.getItem("contabilidad"))  {
    pagos = JSON.parse(localStorage.getItem("contabilidad"))
}
else    {
    localStorage.setItem("contabilidad", JSON.stringify(pagos))
}

