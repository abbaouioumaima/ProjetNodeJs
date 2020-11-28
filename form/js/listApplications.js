$("#list").ready(function() {
    console.log("A");
    printApplications();
})

function printApplications()    {
    console.log("b")
    $.ajax({
        url : 'http://127.0.0.1:3000/apps/school/' + sessionStorage.getItem("schoolid"),
        type : 'GET',
    }).done(function(response)  {

        for (r in response) {
            console.log("test:" + response[r].user_name + "//" + response[r].experience + "//" + response[r].motivation);
            $("#list").append("<span class='wrap-input100' id='app"+ response[r].user_id +"'><b>Eleve:</b> " + response[r].user_name + "<br><b>Expérience:</b> " + response[r].experience + "<br><b>Motivation:</b> " + response[r].motivation + "<button class='contact100-form-btn' id='" + response[r].user_id + "' onclick=accept(this)>Accepter</button><button class='contact100-form-btn'style='background: red;' id='" + response[r].user_id + "' onclick=reject(this)>Rejeter</button></span><br><br>")
        }
    })
}

function accept(e) {
    console.log($(e).attr('id'));

    //ajax get school condition compare users_id[].length et nbparticipants
    $.ajax({
        url : 'http://127.0.0.1:3000/school/' + sessionStorage.getItem("schoolname"),
        type : 'GET',
    }).done(function(response)  {
        console.log("nb: " + response[0].nombre_participant + "nb tableau: " + response[0].users_id.length)
        if(response[0].users_id.length < response[0].nombre_participant)   {
            $.ajax({
                url : 'http://127.0.0.1:3000/users/' + $(e).attr('id'), // La ressource ciblée
                type : 'PUT', // Le type de la requête HTTP.
        
                data : {
                    registered: true,
                },
        
                success: function(data){
                    console.log("success")
                },
                error: function(e) {
                    console.log(e);
                }
            });
        
        
            $.ajax({
                url : 'http://127.0.0.1:3000/schools/' + sessionStorage.getItem("schoolid") + "/" + $(e).attr('id'), // La ressource ciblée
                type : 'PUT', // Le type de la requête HTTP.
        
                success: function(data){
                    console.log("success" + data.nombre_participant);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            //envoyer mail bravo
        } else {
            alert("Votre équipe est déjà pleine");
        }
    })
    $("#app"+$(e).attr('id')+"").hide();
}

function reject(e) {
    // user registered false: étudiant rejeté
    $.ajax({
        url : 'http://127.0.0.1:3000/users/' + $(e).attr('id'), // La ressource ciblée
        type : 'PUT', // Le type de la requête HTTP.

        data : {
            registered: false,
        },

        success: function(data){
            console.log("success")
        },
        error: function(e) {
            console.log(e);
        }
    });
    $("#app"+$(e).attr('id')+"").hide();
}