function onMessageArrived(message) {}
$(".cervezaCard button").click(function (e) { 

    let id_Receta = $(this).attr("id");

    let jsonMessage = JSON.stringify({id_User: id_User});
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "user/recipe/unload";
    client.send(message);

    jsonMessage = JSON.stringify({ id_Receta: id_Receta, id_User: id_User, id_Placa: id_Placa});
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "user/recipe/load";
    client.send(message);

    $(this).html("Cargando...").attr("disabled", true);

    setTimeout(function () 
    {  window.location = "index.php"; }, 1500);
   
});