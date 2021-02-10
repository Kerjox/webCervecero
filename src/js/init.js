let id_User;
let id_Sonda;
let id_Placa;

$(document).ready(function (e) { 
    const data = new URLSearchParams();
    fetch('../php/init.php', {
        method: 'POST',
        body: data
    })
    .then(function(response) {
        if(response.ok) {

            return response.text();
        } else {

            throw "Error en la llamada Ajax";
        }
    
    })
    .then(function(texto) {

        texto = texto.substring(0, texto.length - 1);
        if (texto == "login") {
            
            window.location = "login.html";
        }else {
            window.alert(texto);
            let payload = JSON.parse(texto);
            id_User = payload.id_User;
            id_Placa = payload.id_Placa;
            id_Sonda = payload.id_Sonda;
            console.log(payload);
        }
    });
});