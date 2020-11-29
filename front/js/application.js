//when the application form is submitted
$('#app-form').submit(function(e) {
    e.preventDefault();
    submitApp();
})

function submitApp()    {
    let username = $("#name").val();
    let experience = $("#experience").val();
    let motivation = $("#motivation").val();
    console.log(window.name);

//create application in back end with cv, motivation letter et user_id
    $.ajax({
        url : 'http://127.0.0.1:3000/school/' + sessionStorage.getItem("schoolid") + '/' + sessionStorage.getItem("userid"), // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            experience:experience,
            motivation:motivation,
            user_name: username
        },

        success: function(data){
            window.location.href = "succeeded.html";
        },
        error: function(e) {
            console.log(e);
            alert("Something went wrong!  ")
        }
        
    });
}

// print informations of the school project
    $.ajax({
    url : 'http://127.0.0.1:3000/schools/'+sessionStorage.getItem("schoolid"),
    type : 'GET',

      success : function(res){
      

       
        document.getElementById("infosprojet").innerHTML = "<small>Welcome, your school offers you to work on this project: <br><br>" +res.project_title + "<br>" + res.project_description + "</small>";
    },
    error: function(e) {
        console.log(e);
        alert("Wrong  !")
}


})






