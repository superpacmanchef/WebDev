$(document).ready(function(){
    //Deletes selected 
    $(document).on("click","#modules tr td button.completeCW", function() {
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

    $(document).on("click","#modules tr td button.view", function() {
        var t  =$(this).val();
        window.location.replace("http://localhost:3000/view?view=" + t);
    });
})