let gv;

getGlobalVariables().then(function(data) {
    // Run this when your request was successful
    //console.log(data)
    gv = data;
    initMQTT();
    initRecipes();
  }).catch(function(err) {
    // Run this when promise was rejected via reject()
    console.log(err)
  })

function onMessageArrived(message) {}

function initRecipes() {

    $(".cervezaCard button").click(function (e) { 

        let id_Receta = $(this).attr("id");

        let jsonMessage = JSON.stringify({id_User: gv.id_User});
        message = new Paho.MQTT.Message(jsonMessage);
        message.destinationName = "user/recipe/unload";
        client.send(message);

        jsonMessage = JSON.stringify({id_Receta: id_Receta, id_User: gv.id_User, id_Placa: gv.id_Placa});
        message = new Paho.MQTT.Message(jsonMessage);
        message.destinationName = "user/recipe/load";
        client.send(message);

        $(this).html("Cargando...").attr("disabled", true);

        setTimeout(function () 
        {  window.location = "index.php"; }, 1500);
    
    });
}