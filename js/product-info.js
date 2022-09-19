let array = [];

function showProducto(array) {
    let contenido = `
    <div>
        <h2 class="produ"> ${array.name} </h2> <hr>
        <b> Precio </b> <br>
        <span>${array.currency} ${array.cost}</span> <br><br>
        <b> Descripción </b> <br>
        <span>${array.description}</span> <br><br>
        <b> Categoría </b> <br>
        <span>${array.category}</span> <br><br>
        <b> Cantidad de vendidos </b> <br>
        <span>${array.soldCount}</span> <br><br>
        <b> Imagenes ilustrativas </b> <br>
        <div class="row">
            <div class="col-sm-3">
                <img src="${array.images[0]}" class="img-thumbnail">
            </div>
            <div class="col-sm-3">
                <img src="${array.images[1]}" class="img-thumbnail">
            </div>
            <div class="col-sm-3">
                <img src="${array.images[2]}" class="img-thumbnail">
            </div>
            <div class="col-sm-3">
                <img src="${array.images[3]}" class="img-thumbnail">
            </div>
        </div>
    </div>
    
    `

    document.getElementById("contenedor_producto").innerHTML = contenido

};

function puntuacion(puntos) {
    let stars = '';
    for (let i = 1 ; i<=5 ; i ++) {
        if (i<=puntos) {
            stars += '<i class="fas fa-star check"></i>';
        } else {
            stars += '<i class="far fa-star check"></i>'
        }
    }
    return stars;
};

function showComments(array) {
    let contenido = '';
    for (let item of array) {
        contenido += `
        <li class="list-group-item"><b>${item.user}</b> - <span class="text-secondary">${item.dateTime} </span> - <span id="qualy">${puntuacion(item.score)} </span>
         <br> <p class="text-secondary">${item.description}</p> </li>
    `
    };

    document.getElementById("comments").innerHTML = contenido;
};

// function comentar() {
//     let comment = document.getElementById('comentario');
//     array.push(comment.value);
//     showComments(array)
// };

document.addEventListener("DOMContentLoaded", () => {
    let prodID = localStorage.getItem('prodID');
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === "ok") {
            array = resultObj.data;
            showProducto(array)
        };
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === "ok") {
            array = resultObj.data;
            showComments(array)
        };
    });
})