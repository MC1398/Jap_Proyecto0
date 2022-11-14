function login() {
    //Guarda valores ingresados
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    //Reg de email
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    //Verifica email
    let verificar = expReg.test(usuario);

    //Si email no es correcto avisa al usuario
    if (!verificar) {
        alert('Debe ingresar un email valido');
    } else if (password === '') { //Si la contraseña esta vacia le avisa al usuario
        alert('Debe ingresar su contraseña');
    } else { //Si todo es correcto lo guarda en LS y redirige a la pagina principal
        localStorage.setItem('cliente', usuario)
        location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("ingresar").addEventListener('click', () => {
        //Ejecuta al clickear en el boton
        login();
    })
})