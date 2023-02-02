let btnToggle = document.getElementById("toggleMode")

//existe lo captura, sino lo setea
if(localStorage.getItem("modoOscuro")){
    if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnToggle.innerText = `Si`
        btnToggle.className = `btn btn-light`
    }
}else{
    localStorage.setItem("modoOscuro", false)
}

btnToggle.addEventListener("click", ()=>{
    //toggle agrega y quita clase
    document.body.classList.toggle("darkMode")

    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnToggle.innerText = `Si`
        btnToggle.className = `btn btn-light`
        localStorage.setItem("modoOscuro", true)
    }else{
        btnToggle.innerText = `No`
        btnToggle.className = `btn btn-danger`
        localStorage.setItem("modoOscuro", false)
    }
})