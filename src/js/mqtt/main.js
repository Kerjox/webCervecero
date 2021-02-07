document.documentElement.classList.remove('no-js');

// called when a message arrives
function onMessageArrived(message) {
  //console.log(message.destinationName);
  let payload = JSON.parse(message.payloadString);
  switch (message.destinationName) {

    case "webCervecero/sonda/2":
      
      $('#temp').text(payload.temp + " º" + payload.temp_Unit);
      $('#process').text(getProcessName(payload.process));
      //$('#timeLeft').text(getTimeLeft());
      break;

    case "webCervecero/arduino/2":

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