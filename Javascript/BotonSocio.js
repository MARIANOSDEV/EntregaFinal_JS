let btnToggle = document.getElementById("toggleMode")
let sociosSiNoBoton = document.getElementById("sociosSiNo")

//existe lo captura, sino lo setea
if(localStorage.getItem("socio")){
    if(JSON.parse(localStorage.getItem("socio")) == true){
        btnToggle.innerText = `No`
        btnToggle.className = `btn btn-danger`
        sociosSiNoBoton.classList.add(`classSociosSiNo`)    
    }}{
               
}

btnToggle.addEventListener("click", ()=>{
sociosSiNoBoton.classList.toggle(`classSociosSiNo`)
if(JSON.parse(localStorage.getItem("socio")) == true){
            btnToggle.innerText = `Si`
            btnToggle.className = `btn btn-outline-danger`
            localStorage.setItem("socio", false)
        }else{
            btnToggle.innerText = `No`
            btnToggle.className = `btn btn-danger`
            localStorage.setItem("socio", true)
        }
    })