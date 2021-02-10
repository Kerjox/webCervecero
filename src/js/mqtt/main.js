document.documentElement.classList.remove('no-js');

  // Esto lo sacamos de una llamada post a un php que tenga la varialble de entorno user

let process;
let recipe;
let state;
let id_User = 1;
let id_Sonda = 2;
let id_Placa = 2;
// called when a message arrives
function onMessageArrived(message) {
  //console.log(message.destinationName);
  let payload = JSON.parse(message.payloadString);
  console.log("webCervecero/sonda/" + id_User);
  switch (message.destinationName) {

    case "webCervecero/actualProcess/" + id_User:

      //console.log(payload);
      process = payload.process;
      recipe = payload.recipe;
      state = payload.state;
      break;

    case "webCervecero/sonda/" + id_Sonda:
      
      if (getProcessname(process) != "Fermentación") return;
      $('#temp').text(payload.temp + " º" + payload.temp_Unit);
      $('#process').text(getProcessName(payload.process));
      //$('#timeLeft').text(getTimeLeft());
      break;

    case "webCervecero/arduino/" + id_Placa:

      if (getProcessname(process) == "Fermentación") return;
      $('#processProgress').attr('aria-valuenow', payload.porcentaje).css('width', payload.percentage + "%");
      $('#temp').text(payload.temp + " º" + payload.temp);
      $('#process').text(getProcessName(payload.process));
      $('#progress').text(payload.percentage + "%");
      //processProgress.aria-valuenow;
      break;

  }
  //console.log("onMessageArrived:"+message.payloadString);
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
    
      return "Fermentación";
      break;

    case 4:
    
      return "Transvase";
      break;
  }
}