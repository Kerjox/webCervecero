function getGlobalVariables() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '../php/getGlobalVariables.php',
      success: function(data) {

        let json = JSON.parse(data);

        let globalVariables = {
          "id_User": parseInt(json.id_User),
          "id_Placa": parseInt(json.id_Placa),
          "id_Sonda": parseInt(json.id_Sonda),
          "id_Receta": parseInt(json.id_Receta),
          "paso_Actual": parseInt(json.paso_Actual),
          "id_Paso_Receta_Actual": parseInt(json.id_Paso_Receta_Actual)
        }
        resolve(globalVariables) // Resolve promise and go to then()
      },
      error: function(err) {
        reject(err) // Reject the promise and go to catch()
      }
    });
  });
}