let array = [];

//Funcion que toma datos del JSON y en una tabla la informacion del producto
function showArticulos(array) {
    let contenido = `
            <tr>
                <td scope="row"> <img class="img-td" src="${array.articles[0].image}"> </td>
                <td>${array.articles[0].name}</td>
                <td>${array.articles[0].currency + ' ' + array.articles[0].unitCost}</td>
                <td class="col-1"><input type="number" id="cant" value="1" class="form-control"></td>
                <th id="total">${array.articles[0].currency + ' ' + array.articles[0].unitCost}</th>
            </tr>
        `

    document.getElementById('articulos').innerHTML = contenido;

//Desafiate 5
    if (localStorage.getItem('Ptitu')) {
        let otroproducto = `
            <td scope="row"> <img class="img-td" src="${JSON.parse(localStorage.getItem('Pimg'))}"> </td>
            <td>${JSON.parse(localStorage.getItem('Ptitu'))}</td>
            <td>${JSON.parse(localStorage.getItem('Pmoneda')) + ' ' + JSON.parse(localStorage.getItem('Pcosto'))}</td>
            <td class="col-1"><input type="number" id="cant2" value="1" class="form-control"></td>
            <th id="total2">${JSON.parse(localStorage.getItem('Pmoneda')) + ' ' + JSON.parse(localStorage.getItem('Pcosto'))}</th>
        `
        document.getElementById('articulos').innerHTML += otroproducto;
    }

}

//Funcion que muestra lista con todos los costos dependiendo de la cantidad y el envio seleccionado
function showCosts(array) {
    let contenido = `
            <li class="list-group-item"><span>Subtotal</span><p class="float-end text-muted">${array.articles[0].currency + ' ' + array.articles[0].unitCost}</p><br>
            <p class="text-muted mb-0">Costo unitario del producto por cantidad</p></li>
            <li class="list-group-item"><span>Costo de envío</span><p class="float-end text-muted" id="costoEnvio">${array.articles[0].currency + ' ' + (array.articles[0].unitCost * 0.05)}</p><br>
            <p class="text-muted mb-0">Según el tipo de envío</p></li>
            <li class="list-group-item mb-2"><span>Total($)</span><p class="float-end mb-0" id="totalCosto">${array.articles[0].currency + ' ' + (array.articles[0].unitCost + (array.articles[0].unitCost * 0.05))}</p></li>
        `
    document.getElementById('costos').innerHTML = contenido;
}

//Funcion que calcula el costo de envio dependiendo que se seleccione y lo muestra en la lista de costos
function envio(cant) {
    let premium = document.getElementById('premium').checked
    let express = document.getElementById('express').checked
    let costo = 0

    if (premium) {
        costo = 0.15;
    } else if (express) {
        costo = 0.07
    } else {
        costo = 0.05
    }

    let total = array.articles[0].unitCost * costo
    document.getElementById('costoEnvio').innerHTML = array.articles[0].currency + ' ' + total

    if (cant != 0) {
        return total
    }
    return 0
}

//Funcion que dependiendo que forma de pago se selecciona activa/desactiva los campos en el modal
function formasPago() {
    let numTarjeta = document.getElementById('numTarjeta')
    let codigo = document.getElementById('codigo')
    let vencimiento = document.getElementById('vencimiento')
    let numCuenta = document.getElementById('numCuenta')
    let tarjeta = document.getElementById('tarjeta').checked
    let transf = document.getElementById('transf').checked

    if (tarjeta) {
        numCuenta.disabled = true
        numTarjeta.disabled = false
        codigo.disabled = false
        vencimiento.disabled = false
        document.getElementById('seleccionado').innerHTML = 'Tarjeta de crédito'
    } else if (transf) {
        numCuenta.disabled = false
        numTarjeta.disabled = true
        codigo.disabled = true
        vencimiento.disabled = true
        document.getElementById('seleccionado').innerHTML = 'Transferencia bancaria'
    }
}

//Funcion que verifica que los campos sean correctos y no esten vacios avisando al usuario
function validacion() {
    let tarjeta = document.getElementById('tarjeta')
    let transf = document.getElementById('transf')
    let feedback = document.getElementById('feedback')
    let valido = true
    let cant = document.getElementById('cant')

    if (tarjeta.checked || transf.checked) {
        feedback.classList.remove("invalido");
        feedback.style.display = "none";
    } else {
        valido = false
        feedback.classList.add("invalido");
        feedback.style.display = "block";
    }

    if (cant.value == 0) {
        cant.setCustomValidity(false)
        valido = false
    } else {
        cant.setCustomValidity('')
    }
    
    if (valido) {
        document.getElementById("alert-success").classList.add("show")
        return valido
    } else {
        return valido
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === 'ok') {
            array = resultObj.data;
            showArticulos(array);
            showCosts(array)

        }

        document.getElementById('cant').addEventListener('input', () => {
            let cant = document.getElementById('cant').value
            document.getElementById('total').innerHTML = array.articles[0].currency + ' ' + cant * array.articles[0].unitCost
            document.getElementById('totalCosto').innerHTML = array.articles[0].currency + ' ' + (cant * array.articles[0].unitCost + envio(cant))
        })
        document.getElementById('radios').addEventListener('change', () => {
            let cant = document.getElementById('cant').value
            document.getElementById('total').innerHTML = array.articles[0].currency + ' ' + cant * array.articles[0].unitCost
            document.getElementById('totalCosto').innerHTML = array.articles[0].currency + ' ' + (cant * array.articles[0].unitCost + envio(cant))
        })
    })
    document.getElementById('tarjeta').addEventListener('click', () => {
        formasPago()
    })
    document.getElementById('transf').addEventListener('click', () => {
        formasPago()
    })
    document.getElementById('formulario').addEventListener('submit', event => {
        if (!validacion() || !this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        event.stopPropagation();
        document.body.classList.add('was-validated');

        ['change', 'input'].forEach(evento => { document.body.addEventListener(evento, validacion) })
    })
}) 
