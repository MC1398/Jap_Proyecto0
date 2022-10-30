let array = [];

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

}

function showCosts(array) {
    let contenido = `
            <li class="list-group-item"><span>Subtotal</span><p class="float-end text-muted">${array.articles[0].currency + ' ' + array.articles[0].unitCost}</p><br>
            <p class="text-muted mb-0">Costo unitario del producto por cantidad</p></li>
            <li class="list-group-item"><span>Costo de envío</span><p class="float-end text-muted" id="costoEnvio">${array.articles[0].currency + ' ' + (array.articles[0].unitCost * 0.05)}</p><br>
            <p class="text-muted mb-0">Según el tipo de envío</p></li>
            <li class="list-group-item"><span>Total($)</span><p class="float-end mb-0" id="totalCosto">${array.articles[0].currency + ' ' + (array.articles[0].unitCost + (array.articles[0].unitCost * 0.05))}</p></li>
        `
    document.getElementById('costos').innerHTML  = contenido;
}

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

document.addEventListener('DOMContentLoaded', () => {
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === 'ok') {
            array = resultObj.data;
            showArticulos(array);
            showCosts(array)

        }
        
        document.getElementById('cant').addEventListener('change', () => {
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

}) 
