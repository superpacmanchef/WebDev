$(document).ready(function(){
    //Update selected 
    $(document).on("click","#modules tr td button.completeCW", function() {
        console.log("ass");
        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data = {"id" : $(this).val()}),
            url : 'http://localhost:3000/completeCW',
            success : function(){
                getSorted();
            }
      });
    });
})