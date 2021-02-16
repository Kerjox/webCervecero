let id_User = null;
let id_Placa = null;
let id_Sonda = null;

$.ajax(
    '../php/getGlobalVariables.php',
    {
        success: function(data) {
          /* alert('AJAX call was successful!');
          alert('Data from the server' + data); */
          let json = JSON.parse(data);
          id_User = json.id_User;
          id_Placa = json.id_Placa;
          id_Sonda = json.id_Sonda;
          id_Receta = json.id_Receta;
        },
        error: function() {
          alert('There was some error performing the AJAX call!');
        }
     }
  );