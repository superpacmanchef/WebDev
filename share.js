$(document).ready(function(){
    $(document).on("click","#modules tr td button.view", function() {
        var t  =$(this).val();
        window.location.replace("http://localhost:3000/view?view=" + t);
    });
})