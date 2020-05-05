$(document).ready(function(){
    $(document).on("click","#modules tr td button.view", function() {
        var t  =$(this).val();
        var data={"view" : t};
        $.ajax({
            type : "GET",
            contentType : "application/json",
            data : JSON.stringify(data),
            url : 'https://webdev2-coursework.herokuapp.com/view',
            success : function(data){
               
            },
            error : function(error){
                
            }
        })
    });
})