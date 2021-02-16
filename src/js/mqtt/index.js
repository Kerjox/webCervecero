document.documentElement.classList.remove('no-js');

  // Esto lo sacamos de una llamada post a un php que tenga la varialble de entorno user

let process;
let recipe;
let state;
// called when a message arrives
function onMessageArrived(message) {
  //console.log(message.destinationName);
  let payload = JSON.parse(message.payloadString);
  switch (message.destinationName) {

    case "webCervecero/sonda/" + id_Sonda:
      
      payload.process;
      if (getProcessName(process) != "Fermentación") return;
      $('#temp').text(payload.temp + " º" + payload.temp_Unit);
      $('#process').text(getProcessName(payload.process));
      addData(tempChart, new Date(Date.now()), payload.temp);
      //$('#timeLeft').text(getTimeLeft());
      break;

      case "webCervecero/arduino/" + id_Placa:
        
      process = payload.process;
      if (getProcessName(process) == "Fermentación") return;
      receta = payload.recipe;
      state = payload.state;
      let timeLeft = decodeTimeLeft(payload.timeLeft);
      $('#processProgress').attr('aria-valuenow', payload.porcentaje).css('width', payload.percentage + "%");
      $('#temp').text(payload.temp + " ºC");
      $('#process').text(getProcessName(payload.process));
      $('#progress').text(payload.percentage + "%");
      $('#timeLeft').text(timeLeft);
      addData(tempChart, new Date(Date.now()), payload.temp);
      //processProgress.aria-valuenow;
      break;
      
    }
  //console.log("onMessageArrived:"+message.payloadString);
}

function decodeTimeLeft(timeLeft) {

  let d = new Date(timeLeft*1000);
  var hora = (d.getHours()==0)?23:d.getHours()-1;
  hora = (hora<9)?"0"+hora:hora;
  var minuto = (d.getMinutes()<9)?"0"+d.getMinutes():d.getMinutes();
  var segundo = (d.getSeconds()<9)?"0"+d.getSeconds():d.getSeconds();
  hora = (d.getHours()==0)?23:d.getHours()-1;

  return hora + ":" + minuto + ":" + segundo;
}

function getProcessName(n) {
  
  switch (n) {

    case 1:
      
      return "Maceración";
      break;

    case 2:
    
      return "Cocción";
      break;
    
    case 3:
    
      return "Transvase";
      break;

    case 4:
    
      return "Fermentación";
      break;

    case 4:
  
      return "Reposo";
      break;
  }
}

$("#cancelarRecetaButton").click(function (e) {

  let jsonMessage = JSON.stringify({ id_User: id_User, id_Placa: id_Placa});            // id_User
  message = new Paho.MQTT.Message(jsonMessage);
  message.destinationName = "user/recipe/unload";
  client.send(message);

  $("#dataReceta tbody").html("<tr><td colspan='5' align='center'>No hay receta</td></tr>");
});

$("#cancelarProceso").click(function (e) {

  let jsonMessage = JSON.stringify({ menu: 4, dato1: 0, dato2: 0});            // id_User
  message = new Paho.MQTT.Message(jsonMessage);
  message.destinationName = "cervecero/menu/" + id_Placa;
  client.send(message);
  });

$(document).ready(function() {
  $('#dataReceta').DataTable( {
    "paging":   false,
    "ordering": false,
    "info":     false,
    "searching": false
  });
});

$("#dataReceta tbody tr td button").click(function (e) {
  
  console.log();
  let id_Paso_Receta = $(this).attr("id_Paso_Receta");

  $.ajax(
    '../php/getInfoPasoReceta.php?id_Paso_Receta=' + id_Paso_Receta + "&id_Receta=" + id_Receta,
    {
        success: function(data) {
          
          let json = JSON.parse(data);
          //console.log(data);
          $("#parrafoInfo").text(json.info);
          
        },
        error: function() {
          alert('There was some error performing the AJAX call!');
        }
      }
    );
});