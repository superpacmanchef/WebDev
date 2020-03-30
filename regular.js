$(document).ready(function(){
    $("#alp").click(function() {
        $("#tableContents th").remove();
    })
});

$(document).ready(function() {
    $("#newAdd").click(function(){
        console.log("5");
        document.querySelector(".modal-Adding").style.display = "block";
    })

    document.querySelector('.close').addEventListener("click", function() {
        document.querySelector('.modal-Adding').style.display = "none";
      });

})