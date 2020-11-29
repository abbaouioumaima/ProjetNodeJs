
//when login form is submitted
$('#login-form').submit(function(e) {
    e.preventDefault();
    login();
})

// call to login function in back end 
function login()    {
    let username = $("#email").val();
    let password = $("#pass").val();
    console.log("username: " + username + "password: " + password);

    $.ajax({
        url : 'http://127.0.0.1:3000/users/login', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            email: username,
            password: password,
        },

        success: function(data){
            sessionStorage.setItem("usermail", username);
            sessionStorage.setItem("username", data.lastname);
            sessionStorage.setItem("schoolid",data.school_id);
            sessionStorage.setItem("userid", data._id);
            sessionStorage.setItem("role", data.role);
            
            checkrole();
        },
        error: function(e) {
            console.log(e);
            alert("Wrong password or username !")
        }
    });
}

// redirect depending on the user's role
 function checkrole()    {
            if(sessionStorage.getItem("role") == "admin")  {
                
                $.ajax({
                    url : 'http://127.0.0.1:3000/schools/'+sessionStorage.getItem("schoolid"),
                    type : 'GET',
                
                success : function(res){
                      
                    if(res.project_title == undefined || res.project_description == undefined){
                        
                        window.location.href = "dropProject.html";
                    }
                    
                    else{

                       
                        window.location.href = "listApplications.html";
                        
                    }

                },
                error: function(e) {
                    console.log(e);
                    alert("Wrong password or username !")
                }
                })
                
            } else {
                $.ajax({
                    url : 'http://127.0.0.1:3000/schools/'+sessionStorage.getItem("schoolid"),
                    type : 'GET',
                
                success : function(res){
                      
                    if(res.project_title == undefined || res.project_description == undefined){
                        
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

        }