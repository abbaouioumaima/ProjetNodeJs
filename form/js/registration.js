/*$("#register-Form").submit(function(e){
    e.preventDefault(); 
    var form_url = $(this).attr("action"); 
    var form_method = $(this).attr("method");
    var form_data = $(this).serialize(); 
    $.ajax({
      url : form_url,
      type: form_method,
      data : form_data
    }).done(function(response){ 
      $("#res").html(response);
    });
  });*/

  /*function submitForm(form){
    var url = form.attr("action");
    var formData = $(form).serializeArray();
    $.post(url, formData).done(function (data) {
        alert(data);
    });
}*/

$('#register-form').submit(function(e) {
    e.preventDefault();
    logup();
})


function logup()    {
    
    let lastname = $("#last").val();
    let role = $("#role").val();
    let email =$("#email").val();
    let password = $("#pass").val();
   console.log("lastname"+ lastname+ "role" + role+ "email"+ email + "password "+ password);

    $.ajax({
        url : 'http://127.0.0.1:3000/users/register', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            email:email,
            lastname: lastname,
            password: password,
            role:role,
        },

        success: function(data){
            sessionStorage.setItem("userconnected", data.email);
            sessionStorage.setItem("userid", data._id);
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("last", data.lastname);
            sessionStorage.setItem("password", data.password);
            alert("you've been registered !")
        },
        error: function(e) {
            console.log(e);
            alert("Wrong  !")
        }
        
    });
}


