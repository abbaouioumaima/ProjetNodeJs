$('#login-form').submit(function(e) {
    e.preventDefault();
    login();
})

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
            sessionStorage.setItem("userconnected", username);
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

function checkrole()    {
    if(sessionStorage.getItem("role") == "admin")  {
        window.location.href = "dropProject.html";
    } else {
        window.location.href = "application.html";
    }
}