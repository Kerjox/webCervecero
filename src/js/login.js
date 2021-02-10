$("#login").click(function (e) { 
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    const data = new URLSearchParams();
    //data.append('email', IDplaca);
    data.append('password', password);
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

        location.href = 'index.html';
    });
});