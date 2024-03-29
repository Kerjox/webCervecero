let gv;
getGlobalVariables().then(function(data) {
  // Run this when your request was successful
  //console.log(data)
  gv = data;
  initIndex();
  initGravityChart();
  initMQTT();
  console.log("Welcome to the cervecero interface. Version beta 0.0.1");
}).catch(function(err) {
  // Run this when promise was rejected via reject()
  console.log(err);
})


$(function () {
  $('[data-toggle="popover"]').popover()
})

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
/* let bv.id_User;
let bv.id_Placa;
let id_Sonda;
let id_receta;
let paso_Actual;
let id_Paso_Receta_Actual; */
let estado;       // No borrar
let process_Name;

function initIndex() {

  if (gv.id_Receta != 0) {

    initButtonPasoReceta(gv.id_Paso_Receta_Actual);
  };

  $("#cancelarRecetaButton").click(function (e) {
    
    let jsonMessage = JSON.stringify({ id_User: gv.id_User, id_Placa: gv.id_Placa});            // bv.id_User
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "user/recipe/unload";
    client.send(message);
    
    $("#pasosRecetaButton").html("<a href='recipes.php' class='btn btn-success btn-icon-split loadRecipeButton'><span class='icon text-white-100'><i class='fas fa-play'></i></span><span class='text'>Preparar Cerveza</span></a>");
    $("#dataReceta tbody").html("<tr><td colspan='5' align='center'>No hay receta</td></tr>");

  });
    
  $("#dataReceta tbody tr td .btn-primary").click(function (e) {
    
    let id_Paso_Receta = $(this).attr("id_Paso_Receta");
    $.ajax(
      '../php/getInfoPasoReceta.php?id_Paso_Receta=' + id_Paso_Receta + "&id_Receta=" + gv.id_Receta,
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
    let paso_Proceso = button.attr("id_Paso_Proceso");
    
    $("#dataReceta tbody tr").eq(gv.id_Paso_Receta_Actual).find("td").eq(3).text("Iniciado");
    initButtonPasoReceta(gv.id_Paso_Receta_Actual);
    //console.log(gv.id_Paso_Receta_Actual + 1);
    
    let jsonMessage = JSON.stringify({id_User: gv.id_User, id_Paso_Receta: gv.id_Paso_Receta_Actual + 1, id_Placa: gv.id_Placa, proceso: id_Proceso, paso_Proceso: paso_Proceso});            // bv.id_User
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "webCervecero/sendProcess";
    client.send(message);
      
  });
    
  $("#cancelarProceso").click(function (e) {
    
    $("#dataReceta tbody tr").eq(gv.id_Paso_Receta_Actual).find("td").eq(3).html("Cancelado");
    initButtonPasoReceta(gv.id_Paso_Receta_Actual);
    
    let jsonMessage = JSON.stringify({id_User: gv.id_User, id_Paso_Receta: gv.id_Paso_Receta_Actual + 1, id_Placa: gv.id_Placa});            // bv.id_User
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "webCervecero/cancelProcess";
    client.send(message);
    
  });
}
function initButtonPasoReceta(indexButton) {
    
  if (indexButton == -1) return;
  $("#dataReceta tbody tr td button").slice(1, 2).hide();
  
  let estado = $("#dataReceta tbody tr").eq(indexButton).find("td").eq(3).html();
  //console.log(estado);
  process_Name = $("#dataReceta tbody tr").eq(indexButton).find("td").eq(1).html();
  //console.log(process_Name);
  let buttonStart = $("#dataReceta tbody tr").eq(indexButton).find("td:last").find("button").eq(1);
  let buttonCancel = $("#dataReceta tbody tr").eq(indexButton).find("td:last").find("button:last");
  
  
  switch (estado) {

    case "Iniciado":
      
      buttonStart.fadeOut(200, function(e) {buttonCancel.fadeIn(200)});
      break;
      
    default:
      
      buttonCancel.fadeOut(200, function (e) {buttonStart.fadeIn(200)});
      break;
  }  
}

// called when a message arrives
function onMessageArrived(message) {
  //console.log(message.destinationName);
  let payload = JSON.parse(message.payloadString);
  //console.log(process_Name);
  switch (message.destinationName) {
    
    case "webCervecero/sonda/" + gv.id_Sonda:
      
      if (process_Name == "Maceracion" || process_Name == "Coccion") return;
      $('#temp').text(payload.temp + " º" + payload.temp_Unit);
      $('#process').text("Reposo");
      addData(tempChart, new Date(Date.now()), payload.temp);
      //console.log(payload.gravity);
      updateBarChart(payload.gravity);
      //$('#timeLeft').text(getTimeLeft());
      break;
      
      case "webCervecero/arduino/" + gv.id_Placa:
        
        if (process_Name == "Reposo" || process_Name == "Fermentacion") return;
        //state = payload.state;
        let timeLeft = decodeTimeLeft(payload.timeLeft);
        $('#processProgress').attr('aria-valuenow', payload.porcentaje).css('width', payload.percentage + "%");
        $('#temp').text(payload.temp + " ºC");
        $('#process').text(getProcessName(payload.process));
        $('#progress').text(payload.percentage + "%");
        $('#timeLeft').text(timeLeft);
        addData(tempChart, new Date(Date.now()), payload.temp);
        //processProgress.aria-valuenow;
        break;
        
        case "webCervecero/updateTable/" + gv.id_User:
          
          $("#dataReceta tbody tr").eq(gv.id_Paso_Receta_Actual).find("td").eq(4).find("button:last").hide(500);
          $("#dataReceta tbody tr").eq(gv.id_Paso_Receta_Actual).find("td").eq(3).text("Finalizado");
          initButtonPasoReceta(++gv.id_Paso_Receta_Actual);
          //removeData(tempChart);

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
      
      return "Maceracion";
      break;
      
    case 2:
      
      return "Coccion";
      break;
        
    case 3:
      
      return "Transvase";
      break;
          
    case 4:
      
      return "Fermentacion";
      break;
            
    case 5:
      
      return "Reposo";
      break;
  }
}