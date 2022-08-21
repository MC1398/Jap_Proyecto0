function login() {
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;

    if(usuario === ''){
        alert('Debe ingresar su nombre de usuario');
    } else if(password === ''){
        alert('Debe ingresar su contraseña');
    } else {
        sessionStorage.setItem('cliente',usuario)
        location.href='index.html';
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById("ingresar").addEventListener('click',()=>{
        login();
    })
})