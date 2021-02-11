let id_User;
let id_Placa;
let id_Sonda;

/* $("#login").click(function (e) { 
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('pass', password);
    fetch('../php/login.php', {
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
        window.alert(texto);
        console.log(texto);
        if (texto == "Okay") {
            
            //window.location = 'index.html';
        }
    });
}); */

$("#login").click(function (e) {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    $.ajax({
        url: '../php/login.php',
        data: {email, pass},
        type: 'POST',
        success: function (response) {
            if(!response.error) {
                //let payload = JSON.parse(response);
                console.log(response);
                window.alert(response);
                window.location.href = "index.php";
            }
        } 
    })
});