$("#login").click(function (e) { 
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    const data = new URLSearchParams();
    data.append('email', IDplaca);
    data.append('password', receta);
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
        if (texto == "Okay") {
            $('#recetacollapseOkay').collapse('show');
            //console.log(texto);
            setTimeout(function(){ $('#recetacollapseOkay').collapse('hide'); }, 2000);
            
        }else{
            $('#recetacollapseFail').collapse('show');
            //console.log(texto);
            setTimeout(function(){ $('#recetacollapseFail').collapse('hide'); }, 2000);
    
        }
    });
});