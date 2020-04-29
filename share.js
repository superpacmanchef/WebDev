$(document).ready(function(){
    $(document).on("click","#modules tr td button.view", function() {
        var t  =$(this).val();
        var data={"view" : t};
        $.ajax({
            type : "GET",
            contentType : "application/json",
            data : JSON.stringify(data),
            url : 'http://localhost:3000/view',
            success : function(data){
               
            },
            error : function(error){
                
            }
        })
    });
})