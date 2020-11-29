// when signup form is submitted
$('#register-form').submit(function(e) {
    e.preventDefault();
    checkSchool();
})


function checkSchool()  {
    let school = $("#school").val();
    let location = $("#location").val();
    let role = $("#role").val();

    // if role is admin, create school
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
                sessionStorage.setItem("schoolname", data.school_name);
                sessionStorage.setItem("location", data.location);
                signup();
            },
            error: function(e) {
                console.log(e);
            }
            
        });
        // else check if school exists and redirect 
    } else {
        $.ajax({
            url : 'http://127.0.0.1:3000/school/' + school,
            type : 'GET',
            success: function(response){
                if(response[0] == undefined) {
                    console.log("1: " + response[0]);
                    window.location.href = "failed.html";
                } else{
                    console.log("2: " + response[0]._id);
                    sessionStorage.setItem("schoolid", response[0]._id);
                    signup();
                }
            },
            error: function(e) {
                console.log(e)
            }
        })
    }
}


function signup()    {
    
    let lastname = $("#last").val();
    let role = $("#role").val();
    let email =$("#email").val();
    let password = $("#pass").val();
    let schoolid = sessionStorage.getItem("schoolid");

    sessionStorage.setItem("usermail", email);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("username", lastname);
    // create user
    $.ajax({
        url : 'http://127.0.0.1:3000/users/register', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            email: email,
            lastname: lastname,
            password: password,
            role: role,
            school_id: schoolid,
        },

        success: function(data){
            sessionStorage.setItem("userid", data._id);
            if(role == "admin") {
                //if user is admin notify the school model
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
                // else redirect weither project is yet defined
                $.ajax({
                    url : 'http://127.0.0.1:3000/schools/'+sessionStorage.getItem("schoolid"),
                    type : 'GET',
                
                success : function(res){
                      
                    if(res.project_title == undefined || res.project_description == undefined){
                        console.log("3: " + res.project_title);
                        window.location.href = "failed.html";
                    }
                    
                    else{
 
                        window.location.href = "application.html";
                        
                    }   

                },
                error: function(e) {
                    console.log(e);
                    alert("Wrong password or username !")
                }
               })
            }
        },
        error: function(e) {
            console.log(e);
        }
    });

    
}


