let array = [];

//Funcion que toma los productos del JSON y los muestra
function showProducto(array) {
    let contenido = `
    <div>
        <div class="row">
            <div class="col-10"><h2 class="produ"> ${array.name} </h2></div>
            <div class="col-1 mt-5 me-4"><button class="btn btn-success" id="comprar">Comprar</button></div>
        </div> <hr>
        <b> Precio </b> <br>
        <span>${array.currency} ${array.cost}</span> <br><br>
        <b> Descripción </b> <br>
        <span>${array.description}</span> <br><br>
        <b> Categoría </b> <br>
        <span>${array.category}</span> <br><br>
        <b> Cantidad de vendidos </b> <br>
        <span>${array.soldCount}</span> <br><br>
        <b> Imagenes ilustrativas </b> <br>
    </div>
    
    `
    document.getElementById("contenedor_producto").innerHTML = contenido;


    document.getElementById("imgs").innerHTML +=
        `<div class="carousel-item active">
            <img src="${array.images[0]}" class="img-thumbnail d-block w-50" data-bs-interval="2000">
        </div>
        <div class="carousel-item">
            <img src="${array.images[1]}" class="img-thumbnail d-block w-50" data-bs-interval="2000">
        </div>
        <div class="carousel-item">
            <img src="${array.images[2]}" class="img-thumbnail d-block w-50" data-bs-interval="1000">
        </div>
        <div class="carousel-item">
            <img src="${array.images[3]}" class="img-thumbnail d-block w-50" data-bs-interval="1000">
        </div>
        `

    array.relatedProducts.forEach(element => {
    document.getElementById("contenedor_relacionados").innerHTML +=
    `
    <div class="col-sm-3 cursor-active" onclick='localStorage.setItem("prodID",${element.id}); window.location="product-info.html"'>
        <img src="${element.image}" class="img-thumbnail">
    </div>
    `
    })

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

//Desafiate 2
function comentar() {
    let comment = document.getElementById('comentario').value;
    let puntos = document.getElementById('puntuacion').value;
    
    document.getElementById("comments").innerHTML += `
    <li class="list-group-item"><b>${localStorage.getItem('cliente')}</b> - <span class="text-secondary">Hace segundos</span> - <span id="qualy">${puntuacion(puntos)} </span>
     <br> <p class="text-secondary">${comment}</p> </li>
`
    document.getElementById('comentario').value = '';
    document.getElementById('puntuacion').value = document.getElementById('elegir').value;

};

function comprarProducto(array){
    localStorage.setItem('Pimg', JSON.stringify(array.images[0]));
    localStorage.setItem('Ptitu', JSON.stringify(array.name));
    localStorage.setItem('Pmoneda', JSON.stringify(array.currency));
    localStorage.setItem('Pcosto', JSON.stringify(array.cost));
}

document.addEventListener("DOMContentLoaded", () => {
    let prodID = localStorage.getItem('prodID');
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === "ok") {
            array = resultObj.data;
            showProducto(array);
        };
        document.getElementById('comprar').addEventListener('click', ()=>{
            comprarProducto(resultObj.data);
        });
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then((resultObj) => {
        if (resultObj.status === "ok") {
            array = resultObj.data;
            showComments(array);
        };
        document.getElementById('enviar').addEventListener('click', ()=>{
            comentar();
        });
    });
});