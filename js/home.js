let modalDiv = document.getElementById('modal-suscribe');
let triggerData = window.localStorage.getItem('trigger');


    console.log(triggerData)
    if(triggerData == "false"){
        console.log("hola");
        modalDiv.id = 'modal-hidden';
    }

    
function trigger(){
    window.localStorage.setItem('trigger', "false");
}