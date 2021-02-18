let client;

function initMQTT() {

  var hostname = "192.168.1.230";
  var port = 9001;
  var clientId = "WebClient" + gv.id_User + "R" + parseInt(Math.random()*1000);
  console.log(clientId);
  
  client = new Paho.MQTT.Client(hostname, port, clientId);
  
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  
  // connect the client
  client.connect({onSuccess:onConnect});
  
  
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("MQTT connected");
    client.subscribe("webCervecero/updateTable/" + gv.id_User);
    client.subscribe("webCervecero/sonda/" + gv.id_Sonda);
    client.subscribe("webCervecero/arduino/" + gv.id_Placa);
    //message = new Paho.MQTT.Message("Hello");
    //message.destinationName = "World";
    //client.send(message);
  }
  
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
      client.connect({onSuccess:onConnect});
    }
  }
}