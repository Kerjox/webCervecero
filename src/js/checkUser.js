$(document).ready(function (e) { 
    const data = new URLSearchParams();
    fetch('../php/checkUser.php', {
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
        if (texto != "Okay") {
            
            window.location = "login.html";
        }
    });
});