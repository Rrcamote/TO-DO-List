



   $(document).ready(function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://testapi.io/api/Joseph/Qualifiers", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 && this.statusText == "OK") {
            var data = JSON.parse(this.responseText);
            for (var e of data.Qualifiers) {
                $("#qualified").append("<tr><td>" + e.Country + "</td><td>" + e.Key_Player + "</td><td>" + e.Ranking + "</td><td>" + e.Location + "</td></tr>")
            }
        }
    };
});


 $(document).ready(function () {
     var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "https://testapi.io/api/Joseph/Photography101", true);
      xhttp.send();
      xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200 && this.statusText == "OK") {               var data = JSON.parse(this.responseText);
              for (var e of data.Photography101) {
                  $("#photos").append("<tr><td>" + e.Type + "</td><td>" + e.Example + "</td><td>" + e.Description + "</td></tr>")
               }           }
      };
   });

