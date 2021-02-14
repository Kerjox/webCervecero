function onMessageArrived(message) {}
$(".cervezaCard button").click(function (e) { 

    let id_Recipe = $(this).attr("id");

    let jsonMessage = JSON.stringify({ menu: 1, dato1: id_Recipe, dato2: 0});
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "2/menu";
    client.send(message);

    jsonMessage = JSON.stringify({ id_Recipe: id_Recipe, id_User: 1});
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "user/recipe/load";
    client.send(message);

    $(this).html("Cargando...").attr("disabled", true);

    setTimeout(function () 
    {  window.location = "index.php"; }, 1500);
   
});