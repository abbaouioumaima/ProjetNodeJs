$('#app-form').submit(function(e) {
    e.preventDefault();
    submitApp();
})


console.log(window.name);
function submitApp()    {
    let username = $("#name").val();
    let experience = $("#experience").val();
    let motivation = $("#motivation").val();
    console.log(window.name);

    $.ajax({
        url : 'http://127.0.0.1:3000/school/' + sessionStorage.getItem("schoolid") + '/' + sessionStorage.getItem("userid"), // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            experience:experience,
            motivation:motivation,
            user_name: username
        },

        success: function(data){
            alert("Your application has been sent succefully!")
        },
        error: function(e) {
            console.log(e);
            alert("Something went wrong!  ")
        }
        
    });
}


