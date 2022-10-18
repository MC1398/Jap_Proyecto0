let array = [];

function showProductsList(array){
    let contenido = "";

    for(let product of array){ 
        
        contenido += `
        <div class="list-group-item list-group-item-action cursor-active" id="${product.id}" onclick='localStorage.setItem("prodID",${product.id}); window.location="product-info.html"'>
            <div class="row">
                <div class="col-3">
                    <img src=" ${product.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${product.name}  -  ${product.currency}  ${product.cost}</h4> 
                        <p> ${product.description}</p> 
                        </div>
                        <small class="text-muted"> ${product.soldCount} artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("carLista").innerHTML = contenido;
        
    }
}

function filtrarPrecio() {
    let desde = parseInt(document.getElementById('desde').value);
    let hasta = parseInt(document.getElementById('hasta').value);

    let filtrados = array.filter(producto => producto.cost >= desde && producto.cost <= hasta);
    showProductsList(filtrados);
};

function ordenarRelevancia() {
    let filtrados = array.sort((a,b)=>{
        return (a.soldCount < b.soldCount) ? 1 : -1;
    });
    showProductsList(filtrados);
};

function ordenarMayorPrecio() {
    let filtrados = array.sort((a,b)=>{
        return (a.cost < b.cost) ? 1 : -1;
    });
    showProductsList(filtrados);
};

function ordenarMenorPrecio() {
    let filtrados = array.sort((a,b)=>a.cost - b.cost);
    showProductsList(filtrados);
}




document.addEventListener("DOMContentLoaded", function(e){
    let catid = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + catid + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            array = resultObj.data;
            document.getElementById('catname').innerHTML = array.catName;
            array = resultObj.data.products;
            localStorage.setItem('arraydefault',JSON.stringify(array))
            showProductsList(array);
        }
    });
    document.getElementById('filtrar_precio').addEventListener('click', ()=>{
        filtrarPrecio(array);
    });
    document.getElementById('limpiar').addEventListener('click', ()=>{
        let arraydefault = JSON.parse(localStorage.getItem('arraydefault'))
        showProductsList(arraydefault);
    });
    document.getElementById('relevancia').addEventListener('click', ()=>{
        ordenarRelevancia(array);
    });
    document.getElementById('maxprecio').addEventListener('click', ()=>{
        ordenarMayorPrecio(array);
    });
    document.getElementById('minprecio').addEventListener('click', ()=>{
        ordenarMenorPrecio(array);
    });    
});