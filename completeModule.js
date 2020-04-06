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

    var set = 0;

    $('#showCompleted').click(function(){
        if(set == 0){
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
                set = 1;
                console.log(completed);
            }
      });
    }
    else{getSorted();
    set = 0;
    };
    })
})