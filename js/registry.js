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
                    <div class="card productos-item m-2 border" style="width: 17rem;">
                        <div class="card-header text-center " >
                            <h5 class="card-title">${items.name}</h5>
                        </div>
                        <a href="product-info.html"  style="text-decoration:none; color:black;">    
                            <img src="${items.img}" class="card-img-top" alt="...">
                        </a>
                        <div class="card-body">
                            <p class="card-text">Cantidad comprada:  </p>
                        </div>
                        <div class="card-footer">
                            <p class="card-text text-primary">$ ${items.cost}</p>
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


