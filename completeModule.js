
$(document).ready(function(){
    //Deletes selected 
    $(document).on("click","#modules tr td button.completeCW", function() {
        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data = {"id" : $(this).val()}),
            url : 'https://webdev2-coursework.herokuapp.com/completeCW',
            success : function(){
                getSorted();
            }
      });
    });

    $(document).on("click","#modules tr td button.view", function() {
        var t  =$(this).val();
        window.location.replace("https://webdev2-coursework.herokuapp.com/view?view=" + t);
    });

    $(document).on("click","#modules tr td button.modify", function() {
        //Hide other forms
        document.querySelector("#Adding").style.display = "none";
        document.querySelector("#delMultipleProjects").style.display = "none";
        document.querySelector("#delAllProjects").style.display = "none";
        $("#modifyHeading").empty();
        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data = {"id" : $(this).val()}),
            url : 'https://webdev2-coursework.herokuapp.com/getModule',
            success : function(response){
                var json = response.module;
                console.log(json);
                $('#modMName').val(json.moduleName);
                $('#modProjectTitle').val(json.projectTitle);
                $("#modifyHeading").append("Modify " + json.projectTitle);
                $('#modDueDate').val(json.dueDate);
                $('#modNoOfMilestones').val(json.milestones.length);
                $('#modProject').val(json.module_id);
                if(json.courseworkCompleted == true) {
                    $('#modCompleted').prop('checked', true);
                }
                else {
                    $('#modCompleted').prop('checked', false);
                }
                
                document.querySelector("#Modify").style.display = "block"; //Display modify form
            }
      });

        
    });
})