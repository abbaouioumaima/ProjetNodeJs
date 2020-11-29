$("#list").ready(function() {
    console.log("A");
    printApplications();
})

// print applications for this school project and print button to accept or decline the application
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

// function that triggers when an application is accepted
function accept(e) {
    console.log($(e).attr('id'));
    console.log(sessionStorage.getItem("schoolid"));
    // get maximum number of student on the project and check if there is room for one other
    $.ajax({
        url : 'http://127.0.0.1:3000/schools/' + sessionStorage.getItem("schoolid"),
        type : 'GET',
    }).done(function(response)  {
        console.log(response.nombre_participant)
        console.log("nb: " + response.nombre_participant + "nb tableau: " + response.users_id.length)
        if(response.users_id.length < response.nombre_participant)   {
            // make user registered
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
        
            // add user_id to project in School
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
            
        } else {
            alert("Votre équipe est déjà pleine");
        }
    })
    $("#app"+$(e).attr('id')+"").hide();
}


// function that triggers when an application is rejected
function reject(e) {
    // make user not registered
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

//logout
function logout()   {
    sessionStorage.clear();
    window.location.href = "connexion.html";
}