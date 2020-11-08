const USUARIO = document.getElementById('user-nickname');
const EMAIL = document.getElementById('user-email');
const NOMBRE_REAL = document.getElementById('realName');
const TELEFONO = document.getElementById('user-tel');
const DOCUMENTO = document.getElementById('user-document');
const PHOTO = document.getElementById('img-div');



document.getElementById('guardar').addEventListener("click", function (e) {
    let user = document.getElementById('nick').value;
    let email = document.getElementById('email').value;
    let name = document.getElementById('real-name').value;
    let userTel = document.getElementById('tel').value;
    let ci = document.getElementById('document').value;
    let photo = document.getElementById('user-photo').value;
    

   let jsonStorage = {
       "nickname" : user,
       "email" : email,
       "realName" : name,
       "phone" : userTel,
       "document" : ci, 
       "photoUser" : photo
   };

   let usuarioActual = window.localStorage.getItem('current-user')

   var jsonLocal = JSON.stringify(jsonStorage)
   window.localStorage.setItem(usuarioActual, jsonLocal);
   
   

   
    // se recarga la pagina para que se reflejen todos los cambios en el localstorage
    window.location.reload();
});

document.addEventListener('DOMContentLoaded', (e)=>{
    let usuarioActual = window.localStorage.getItem('current-user')
    let json = localStorage.getItem(usuarioActual);
    let stringStorage  = JSON.parse(json);
        
    USUARIO.innerHTML = stringStorage.nickname
    EMAIL.innerHTML = stringStorage.email
    NOMBRE_REAL.innerHTML = stringStorage.realName
    TELEFONO.innerHTML = stringStorage.phone
    DOCUMENTO.innerHTML = stringStorage.document
    PHOTO.innerHTML = stringStorage.photoUser;
    PHOTO.getElementsByTagName('img')[0].style = " width: 200px; height:200px;"
  })