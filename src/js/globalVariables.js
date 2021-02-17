let id_User;
let id_Placa;
let id_Sonda;
let id_receta;
let paso_Actual;
let id_Proceso_Actual;

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
          paso_Actual = json.paso_Actual;
          id_Proceso_Actual = json.id_Proceso_Actual;

        },
        error: function() {
          alert('There was some error performing the AJAX call!');
        }
     }
  );