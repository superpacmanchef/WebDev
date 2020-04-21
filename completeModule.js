
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

    $(document).on("click","#modules tr td button.modify", function() {
        document.querySelector(".modal-Modify").style.display = "block";
        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data = {"id" : $(this).val()}),
            url : 'http://localhost:3000/getModule',
            success : function(response){
                var json = response.module ;
                console.log(json);
                $('#modMName').val(json.moduleName);
                $('#modProjectTitle').val(json.projectTitle);
                $('#modDueDate').val(json.dueDate);
                $('#modNoOfMilestones').val(json.milestones.length);
                $('#modProject').val(json.module_id);
                $('#modComDate').val(json.completionDate);
                if(json.courseworkCompleted == true){
                    $('#modCompleted').prop('checked', true);
                }else{
                    $('#modCompleted').prop('checked', false);
                }

                //DO THIS
                if(document.getElementById('modCompleted').checked){
                    document.querySelector(".modCOM").style.display = "block";
                }else{
                    document.querySelector(".modCOM").style.display = "block";
                }
            }
      });

        
    });
})