$(document).ready(function(){
    $("#taskForm").submit(function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url: "index.php",
            data: $(this).serialize(),
            success: function(response){
                var jsonData = JSON.parse(response)
                // if(jsonData.success == 1){
                //     console.log(jsonData);
                //     alert(jsonData);
                // }else{
                //     alert("Error!!");
                // }
                console.log(jsonData)
                alert ("SUCCESSFULLY ADDED");
            }
        })
    })
})
