let admin = "admin"
let passAdmin = ""
let botonAdmin = document.getElementById("botonAdmin")



if(sessionStorage.getItem("password"))  {
    passAdmin = sessionStorage.getItem("password")
}

console.log(window.location.pathname)

async function logAdmin(){
    if(admin == passAdmin){
        if(window.location.pathname == "/EntregaFinal_JS/index.html"){
        window.location.href = `/EntregaFinal_JS/html/admin.html`
        }
        else{ window.location.href = `admin.html`
        }}
    else{
        const { value: password } = await Swal.fire({
            title: 'Ingrese su contraseña de administrador',
            input: 'password',
            inputPlaceholder: 'UAT contraseña = admin',
            confirmButtonColor: '#ff0000',
            inputAttributes: {
              maxlength: 10,
              autocapitalize: 'off',
              autocorrect: 'off',
              
            }
          })
          
          if (password == admin) {
            passAdmin = `${password}`
            sessionStorage.setItem("password", `${password}`)
            if(window.location.pathname == "/index.html"){
                window.location.href = `/html/admin.html`
                }
                else{ window.location.href = `admin.html`
                }
          }
          else{
            if (password) {
                Swal.fire({
                    title: "Contraseña incorrecta.",
                    confirmButtonColor: '#ff0000',
                })
              }
          }

    }
}

botonAdmin.onclick = () => {
    logAdmin()
}
