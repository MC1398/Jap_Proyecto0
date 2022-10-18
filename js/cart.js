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

document.addEventListener('DOMContentLoaded', () => {
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === 'ok') {
            array = resultObj.data;
            showArticulos(array)

        }
        document.getElementById('cant').addEventListener('change', () => {
            let cant = document.getElementById('cant').value
            document.getElementById('total').innerHTML = array.articles[0].currency + ' ' + cant * array.articles[0].unitCost
        })
    })

}) 
