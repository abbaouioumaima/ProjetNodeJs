$('#register-form').submit(function(e) {
    e.preventDefault();
    checkSchool();
})

function checkSchool()  {
    let school = $("#school").val();
    let location = $("#location").val();
    let role = $("#role").val();

    if(role == "admin") {
        $.ajax({
            url : 'http://127.0.0.1:3000/schools', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.
    
            data : {
                school_name: school,
                location: location,
            },
    
            success: function(data){
                sessionStorage.setItem("schoolid", data._id);
                console.log(sessionStorage.getItem("schoolid"));
                sessionStorage.setItem("schoolname", data.school_name);
                sessionStorage.setItem("location", data.location);
                signup();
            },
            error: function(e) {
                console.log(e);
            }
            
        });
    } else {
        $.ajax({
            url : 'http://127.0.0.1:3000/school/' + school,
            type : 'GET',
        }).done(function(response)  {
            console.log(response[0]._id);
            sessionStorage.setItem("schoolid", response[0]._id);
            signup();
        })
    }
}

function signup()    {
    
    let lastname = $("#last").val();
    let role = $("#role").val();
    let email =$("#email").val();
    let password = $("#pass").val();

    $.ajax({
        url : 'http://127.0.0.1:3000/users/register', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            email: email,
            lastname: lastname,
            password: password,
            role: role,
            school_id: sessionStorage.getItem("schoolid"),
        },

        success: function(data){
            sessionStorage.setItem("userconnected", data.email);
            sessionStorage.setItem("userid", data._id);
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("last", data.lastname);
            sessionStorage.setItem("password", data.password);
        },
        error: function(e) {
            console.log(e);
        }
    });

    if(role == "admin") {
        $.ajax({
            url : 'http://127.0.0.1:3000/schools/' + sessionStorage.getItem("schoolid"), // La ressource ciblée
            type : 'PUT', // Le type de la requête HTTP.
    
            data : {
                admin_id: sessionStorage.getItem("userid"),
            },
            success: function(data) {
                window.location.href = "dropProject.html";
            }, 
            error: function(e)  {
                console.log(e);
            }
        })
    } else {
        window.location.href = "application.html";
    }
}


