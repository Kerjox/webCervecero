var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

$(document).ready(function() {
  $('#dataReceta').DataTable( {
    "paging":   false,
    "ordering": false,
    "info":     false,
    "searching": false
  });
});

document.documentElement.classList.remove('no-js');

  // Esto lo sacamos de una llamada post a un php que tenga la varialble de entorno user

// Variables Globales
/* let id_User;
let id_Placa;
let id_Sonda;
let id_receta;
let paso_Actual;
let id_Proceso_Actual; */
let estado;

$(function () {
  
  if (id_Receta == 0) return;
  setTimeout(() => {
    
    //initButtonPasoReceta(id_Proceso_Actual);
  }, 100);
});

function initButtonPasoReceta(indexButton) {
  
  $("#dataReceta tbody tr td button").slice(1, 2).hide();

  let estado = $("#dataReceta tbody tr").eq(indexButton).find("td").eq(3).html();
  console.log(estado);
  let buttonStart = $("#dataReceta tbody tr").eq(indexButton).find("td:last").find("button").eq(1);
  let buttonCancel = $("#dataReceta tbody tr").eq(indexButton).find("td:last").find("button:last");


    switch (estado) {
      case "Iniciado":
        
        buttonCancel.fadeIn(500, function(e) {buttonStart.fadeOut(500)});
        break;

      default:

        buttonStart.fadeIn(500, function(e) {buttonCancel.fadeOut(500)});
        break;
    }
  

}

// called when a message arrives
function onMessageArrived(message) {
  //console.log(message.destinationName);
  let payload = JSON.parse(message.payloadString);
  switch (message.destinationName) {

    case "webCervecero/sonda/" + id_Sonda:
      
      if (getProcessName(process) != "Reposo") return;
      $('#temp').text(payload.temp + " º" + payload.temp_Unit);
      $('#process').text("Reposo");
      addData(tempChart, new Date(Date.now()), payload.temp);
      //$('#timeLeft').text(getTimeLeft());
      break;

      case "webCervecero/arduino/" + id_Placa:
        
      let process_Name = getProcessName(payload.process);
      if (process_Name == "Reposo") return;
      //state = payload.state;
      let timeLeft = decodeTimeLeft(payload.timeLeft);
      $('#processProgress').attr('aria-valuenow', payload.porcentaje).css('width', payload.percentage + "%");
      $('#temp').text(payload.temp + " ºC");
      $('#process').text(processName);
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

    case 5:
  
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

$("#dataReceta tbody tr td .btn-primary").click(function (e) {
  
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

$("#dataReceta tbody tr td .btn-success").click(function (e) {
  
  let button = $(this);
  let id_Proceso = button.attr("id_Proceso");
  let paso_Receta = button.attr("id_Paso_Receta");
  let paso_Proceso = button.attr("id_Paso_Proceso");

  $("#dataReceta tbody tr").eq(paso_Receta - 1).find("td").eq(3).text("Iniciado");
  initButtonPasoReceta(id_Proceso_Actual);

  let jsonMessage = JSON.stringify({ id_Placa: id_Placa, proceso: id_Proceso, paso_Proceso: paso_Proceso});            // id_User
  message = new Paho.MQTT.Message(jsonMessage);
  message.destinationName = "webCervecero/sendProcess";
  client.send(message);
  
});

$("#dataReceta tbody tr td .btn-warning").click(function (e) {

  //let paso_Receta = $(this).attr("id_Paso_Receta");

  $("#dataReceta tbody tr").eq(paso_Receta - 1).find("td").eq(3).html("Cancelado");
  initButtonPasoReceta(id_Proceso_Actual);

  let jsonMessage = JSON.stringify({ id_User: id_User, id_Placa: id_Placa});            // id_User
  message = new Paho.MQTT.Message(jsonMessage);
  message.destinationName = "user/recipe/unload";
  client.send(message);
  
});

/* function recetaButton(e, obj) {
  
  if (e) {

    actual_Process = $(obj).attr("id_Proceso");
    let paso_Proceso = $(obj).attr("id_Paso_Proceso");
    let paso_Receta = $(obj).attr("id_Paso_Receta");

    $("#dataReceta tbody tr").eq(paso_Receta - 1).find("td").eq(3).html("Iniciado");
    $(obj).removeClass("btn-success").addClass("btn-warning").html("<i class='fas fa-exclamation-circle'></i>").attr("id", "cancelButton");

    let jsonMessage = JSON.stringify({ id_Placa: id_Placa, proceso: actual_Process, paso_Proceso: paso_Proceso});            // id_User
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "webCervecero/sendProcess";
    client.send(message);
  }else {

    $(obj).removeClass("btn-warning").addClass("btn-success").html("<i class='fas fa-play'>").removeAttr("id");

    let jsonMessage = JSON.stringify({ id_User: id_User, id_Placa: id_Placa});            // id_User
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "user/recipe/unload";
    client.send(message);
  }
} */