function guardarDatos() {
    //guarda valores de los input
    let nombre1 = document.getElementById('nombre1').value;
    let nombre2 = document.getElementById('nombre2').value;
    let apellido1 = document.getElementById('apellido1').value;
    let apellido2 = document.getElementById('apellido2').value;
    let telefono = document.getElementById('telefono').value;
    let cartel = document.getElementById('obligatorios'); //div de campos obligatorios
    let userDatos = [];

    //verifica si no esta vacios los campos obligatorios
    if (nombre1 === '' || apellido1 === '') {
        //de estar vacios despliega div
        cartel.innerHTML = 'Los campos marcados con (*) deben ser completados'
    } else { //si no estan vacios: saca el div y guarda array con los datos ingresados en LS
        cartel.innerHTML = '';
        userDatos = [nombre1, nombre2, apellido1, apellido2, telefono];
        localStorage.setItem(localStorage.getItem('cliente'),JSON.stringify(userDatos));
    };
};

function mostrarDatosUser() {
    //si existe el usuario toma sus datos de LS y muestra lo anteriormente ingresado en los inputs
    if (localStorage.getItem('cliente')) {
        let userDatos = JSON.parse(localStorage.getItem(localStorage.getItem('cliente')));
        document.getElementById('nombre1').value = userDatos[0];
        document.getElementById('nombre2').value = userDatos[1];
        document.getElementById('apellido1').value = userDatos[2];
        document.getElementById('apellido2').value = userDatos[3];
        document.getElementById('telefono').value = userDatos[4];
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    
    //al cargar la pagina ya muestra el campo email con el del usuario activo
    document.getElementById('email').value = localStorage.getItem('cliente');
    
    //se ejecuta guardarDatos() al presionar el boton de guardar
    document.getElementById('btnGuardar').addEventListener('click', () =>{
        guardarDatos();
    });

    //por ultimo ejecuta la funcion mostrarDatosUser()
    mostrarDatosUser();
})