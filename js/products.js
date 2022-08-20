let autos = [];

function showProductsList(autos){
    let htmlContentToAppend = "";

    for(let i = 0; i < autos.products.length; i++){ 
        let product = autos.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("carLista").innerHTML = htmlContentToAppend; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(LIST_AUTOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autos = resultObj.data;
            showProductsList(autos);
        }
    });
});