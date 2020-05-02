
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
        //Hide other forms
        document.querySelector("#Adding").style.display = "none";
        document.querySelector("#delMultipleProjects").style.display = "none";
        document.querySelector("#delAllProjects").style.display = "none";
        $("#modifyHeading").empty();
        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data = {"id" : $(this).val()}),
            url : 'http://localhost:3000/getModule',
            success : function(response){
                var json = response.module;
                console.log(json);
                $('#modMName').val(json.moduleName);
                $('#modProjectTitle').val(json.projectTitle);
                $("#modifyHeading").append("Modify " + json.projectTitle);
                $('#modDueDate').val(json.dueDate);
                $('#modNoOfMilestones').val(json.milestones.length);
                $('#modProject').val(json.module_id);
                document.querySelector("#Modify").style.display = "block"; //Display modify form
            }
      });

        
    });
})