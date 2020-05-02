$(document).ready(function(){
    //Deletes selected 
    $(document).on("click","#modules tr td button.delete", function() { 
        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data = {"id" : $(this).val()}),
            url : 'http://localhost:3000/del',
            success : function(){
                getSorted();
            }
      });
    });


    //Displays new module form 
    $("#newAdd").click(function(){
        closeForms();
        $('#mName').val("");
        $('#projectTitle').val("");
        $('#noOfMilestones').val(1);
        $('#dueDate').val("");
        document.querySelector("#Adding").style.display = "block";
    })

    //Displays Mass Deleting option form
    $("#delMul").click(function(){
        closeForms();
        document.querySelector("#delMultipleProjects").style.display = "block";
    })

    //Close module forms (One Function - Has to apply function to all close buttons, to close all modals)
    const closeListener = document.querySelectorAll(".close");
    for (let i = 0; i < closeListener.length; i++) {
        closeListener[i].addEventListener("click", function() {
            closeForms();
        });
    }
    function closeForms() {
        const modalForms = document.querySelectorAll(".modal-form");
        for (let j = 0; j < modalForms.length; j++) {
            modalForms[j].style.display = "none";
        }
    }


    //Close Delete All Projects form
    document.querySelector('#delAllProjects .close').addEventListener("click", function() {
        document.querySelector('#delAllProjects').style.display = "none";
        document.querySelector("#delMultipleProjects").style.display = "block";
    });


    //Adds new module to database /// MORE TIDY
    $('#addProject').click(function() {
        var projectTitle = $('#projectTitle').val();
        var mName = $('#mName').val();
        var noOfMilestones = $('#noOfMilestones').find(':selected').text();
        var dueDate = $('#dueDate').val();
        var milestones = [] ;

        for (var x = 0 ; x < noOfMilestones ; x++){
            var milestoneStep = x + 1; //Use 'human' counting, start from 1
            var Desc = prompt("Description of milestone " + milestoneStep);
            var milestoneID = Math.floor(Math.random() * 101) ; //TEMP
            milestone = {"milestone_id" : milestoneID, "Desc" : Desc, "milestoneStep" : x, "milestoneCompleted" : false} ;
            milestones[x] = milestone ; 
        }

        var data = {projectTitle , mName ,milestones, dueDate} ; 
        

            $.ajax({
                type : "POST",
                contentType : "application/json",
                data : JSON.stringify(data),
                url : 'http://localhost:3000/add',
                success : function(data){
                    document.querySelector("#Adding").style.display = "none";
                    getSorted();
                },
                error : function(error){
                    console.log("error");
                }
            })
        
        
    })

    $("#massDeleteBtn").click(function(){
        var radioValue = $("input[name='deleteOptions']:checked").val(); //Get radio button selection
        console.log(radioValue);
        //Execute something depending on what the user has selected
        if(radioValue == "CompletedProjects") {
            document.querySelector('#delMultipleProjects').style.display = "none";
            document.querySelector("#delCompletedProjects").style.display = "block";
        } else if(radioValue == "DeleteAllProjects") {
            document.querySelector('#delMultipleProjects').style.display = "none";
            document.querySelector("#delAllProjects").style.display = "block";
        } else {
            alert("You didnt select an option")
        }
    })

    $("#delAllProjectsBtn").click(function(){
        var deleteValue = $("#deleteEntry").val(); //Get user input

        //Validate that user input matches "delete"
        if(deleteValue.toLowerCase() == "delete") {
            //Delete all the projects
            $.ajax({
                type : "POST",
                contentType : "application/json",
                url : 'http://localhost:3000/delAll',
                success : function(){
                    getSorted();
                    document.querySelector("#delAllProjects").style.display = "none";
                },
                error : function(error){
                    console.log("error");
                }
            })
        }
    })

    $('#delCompletedProjectsBtn').click(function () {
        var deleteValue = $("#deleteCompletedEntry").val(); //Get user input
        console.log(deleteValue);
        //Validate that user input matches "delete"
        if(deleteValue.toLowerCase() == "delete") {
            //Delete all the projects
            $.ajax({
                type : "POST",
                contentType : "application/json",
                url : 'http://localhost:3000/delCompleted',
                success : function(data){
                    document.querySelector("#delCompletedProjects").style.display = "none";
                    if(data != "done"){
                        alert("No Projects to be Deleted");
                    }
                    getSorted();
                },
                error : function(error){
                    console.log("error");
                }
            })
        }
    })

    $('#modProject').click(function() {
        var module_id = $('#modProject').val();
        var projectTitle = $('#modProjectTitle').val();
        var moduleName = $('#modMName').val();
        var noOfMilestones = $('#modNoOfMilestones').find(':selected').text();
        var dueDate = $('#modDueDate').val();
        var milestones = [] ;

        for (var x = 0 ; x < noOfMilestones ; x++){
            var milestoneStep = x + 1; //Use 'human' counting, start from 1
            var Desc = prompt("Description of milestone " + milestoneStep);
            var milestoneID = Math.floor(Math.random() * 101) ; //TEMP
            milestone = {"milestone_id" : milestoneID, "Desc" : Desc, "milestoneStep" : x, "milestoneCompleted" : false} ;
            milestones[x] = milestone ; 
        }

        var data = {"module_id" : module_id ,"projectTitle" :projectTitle , "mName" : moduleName, "dueDate" : dueDate,"milestones" : milestones , "courseworkCompleted" : false , "completionDate" : ""} ; 
        

        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data),
            url : 'http://localhost:3000/updateModule',
            success : function(){
                document.querySelector("#Modify").style.display = "none";
                getSorted();
            },
            error : function(error){
                console.log("error");
            }
        })
        
    })
 

})