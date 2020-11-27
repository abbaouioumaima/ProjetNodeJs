$('#app-form').submit(function(e) {
    e.preventDefault();
    submitApp();
})


function submitApp()    {
    
    let experience = $("#experience").val();
    let motivation = $("#motivation").val();
   console.log("experience"+ experience + "motivation"+ motivation);

    $.ajax({
        url : 'http://127.0.0.1:3000/school/' + sessionStorage.getItem("schoolid") + '/user/' + sessionStorage.getItem("userid"), // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            experience:experience,
            motivation:motivation,
           
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

function myFunction()
{
    
    $.ajax({
    url : 'http://127.0.0.1:3000/schools/'+sessionStorage.getItem("schoolid"),
    type : 'GET',

      success : function(res){
      

       
        document.getElementById("title").innerHTML = res.project_title;
        document.getElementById("description").innerHTML = res.project_description;
    },
error: function(e) {
    console.log(e);
    alert("Wrong  !")
}


})
}





