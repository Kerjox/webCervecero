document.documentElement.classList.remove('no-js');

  // Esto lo sacamos de una llamada post a un php que tenga la varialble de entorno user

let process;
let recipe;
let state;
/* let id_User = 1;
let id_Sonda = 2;
let id_Placa = 2; */
// called when a message arrives
function onMessageArrived(message) {
  //console.log(message.destinationName);
  let payload = JSON.parse(message.payloadString);
  switch (message.destinationName) {

    case "webCervecero/actualProcess/1":        //Con el ususario

      //console.log(payload);
      process = payload.process;
      recipe = payload.recipe;
      state = payload.state;
      break;

    case "webCervecero/sonda/2":
      
      if (getProcessName(process) != "Fermentación") return;
      $('#temp').text(payload.temp + " º" + payload.temp_Unit);
      $('#process').text(getProcessName(payload.process));
      //$('#timeLeft').text(getTimeLeft());
      break;

      case "webCervecero/arduino/2":
        
      if (getProcessName(process) == "Fermentación") return;
      $('#processProgress').attr('aria-valuenow', payload.porcentaje).css('width', payload.percentage + "%");
      $('#temp').text(payload.temp + " ºC");
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
    
      return "Transvase";
      break;

    case 4:
    
      return "Fermentación";
      break;
  }
}