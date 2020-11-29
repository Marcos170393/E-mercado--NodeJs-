let historialDeCompras = [];
let usuarioActual = window.localStorage.getItem('current-user')
let contentToAppend= '';


document.addEventListener('DOMContentLoaded', (e)=>{
    getJSONData(BUY_REGISTRY).then(function(result){
        if(result.status === "ok"){
            historialDeCompras = result.data;
            console.log(historialDeCompras)


            for(let items of historialDeCompras){
                console.log(items)
                if(items.id === usuarioActual){
                    contentToAppend +=`
                  <div class="card mb-3 productos-item" style="max-width: 540px;">
                    <div class="row no-gutters align-items-center">
                        <div class="col-md-4 ">
                            <img src="${items.img}" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-header">
                            <a href="product-info.html"  style=" color:black;">    
                                <h5 class="card-title">${items.name}</h5>
                            </a>
                            
                            </div>
                            <div class="card-body bg-light">
                                <p class="card-text font-weight-bold">Costo: <span class="font-weight-light">${items.cost}</span></p>
                                <p class="card-text font-weight-bold">Enviado a: <span class="font-weight-light">${items.location} ${items.address}</span></p>
                                <p class="card-text"><small class="text-muted font-weight-bold">Fecha de compra <span class="font-weight-light">${items.date}</span></small></p>
                            </div>
                        </div>
                    </div>
                </div>
                `
                }else{
                    console.log('Error');
                }
                document.getElementById('history-productos').innerHTML = contentToAppend;
            }
        
        }
    }).catch((error)=>{
        console.log(error);
    });

    
})


