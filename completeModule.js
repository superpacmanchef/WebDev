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

    $('#showCompleted').click(function(){
        if($(this).val() == 0 ){
            document.getElementById('showCompleted').value = 1 ; 
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : 'http://localhost:3000/getModules',
            success : function(data){
                var module = [];
                var number = 0;
                for(var x=0; x<data.module.length; x++){
                    if(data.module[x].courseworkCompleted==true){
                        module[number]=data.module[x];
                        number++;
                    }
                }
                var completed = {"module":module};
                $('#modules').empty();
                displayTable(completed);
            }
      });
    }else{
        document.getElementById('showCompleted').value = 0 ; 
        getSorted();
    }
  
    })
})