function onMessageArrived(message) {}
$(".cervezaCard button").click(function (e) { 

    let id_Recipe = $(this).attr("id");
    let jsonMessage = JSON.stringify({ menu: 1, dato1: id_Recipe, dato2: 0})
    message = new Paho.MQTT.Message(jsonMessage);
    message.destinationName = "2/menu";
    client.send(message);
    window.location = "index.php";
});