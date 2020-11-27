$("#form-project").submit(function(e)   {
    e.preventDefault();
    console.log($("#number").val());
    if($("#number").val() == "2" || $("#number").val() == "3" || $("#number").val() == "4" || $("#number").val() == "5")   {
        addProjectToSchool();
    } else {
        alert("The number of participants must be between 2 and 5");
    }
})

function addProjectToSchool() {
    var titre = $("#title").val();
    var description = $("#description").val();
    var number = $("#number").val();
    
    $.ajax({
        url : 'http://127.0.0.1:3000/schools/' + sessionStorage.getItem("schoolid"), // La ressource ciblée
        type : 'PUT', // Le type de la requête HTTP.

        data : {
            project_title: titre,
            project_description: description,
            nombre_participant: number,
        },

        success: function(data){
            sessionStorage.setItem("project_title", titre);
            sessionStorage.setItem("project_description", description);
            sessionStorage.setItem("number", number);
            window.location.href = "listApplications.html";
        },
        error: function(e) {
            console.log(e);
            alert("Wrong password or username !")
        }
    });
}