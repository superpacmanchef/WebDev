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
        document.querySelector(".modal-Adding").style.display = "block";
    })

    //Displays Mass Deleting option form
    $("#delMul").click(function(){
        document.querySelector(".modal-Deleting").style.display = "block";
    })

    //Close new module form
    document.querySelector('.close').addEventListener("click", function() {
        document.querySelector('.modal-Adding').style.display = "none" ; 
    });

    
    //Close new module form
    document.querySelector('.modClose').addEventListener("click", function() {
    document.querySelector('.modal-Modify').style.display = "none";
    });

    //Close Mass Deletion option form
    document.querySelector('.cancel').addEventListener("click", function() {
        document.querySelector('.modal-Deleting').style.display = "none";
    });

    //Close Delete All Projects form
    document.querySelector('.close3').addEventListener("click", function() {
        document.querySelector('.modal-del').style.display = "none";
        document.querySelector(".modal-Deleting").style.display = "block";
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
                    document.querySelector(".modal-Adding").style.display = "none";
                    getSorted();
                },
                error : function(error){
                    console.log("error");
                }
            })
        
        
    })


    $("#massDeleteBtn").click(function(){
        var radioValue = $("input[name='deleteOptions']:checked").val(); //Get radio button selection

        //Execute something depending on what the user has selected
        if(radioValue == "CompletedProjects") {
            alert("Completed Projects")
        } else if(radioValue == "DeleteAllProjects") {
            document.querySelector('.modal-Deleting').style.display = "none";
                document.querySelector(".modal-del").style.display = "block";
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
                    console.log("s");
                    getSorted();
                    document.querySelector(".modal-del").style.display = "none";
                },
                error : function(error){
                    console.log("error");
                }
            })
        } else {
            console.log("Didny dae it");
        }
        

    })

    $('#modProject').click(function() {
        var module_id = $('#modProject').val();
        var projectTitle = $('#modProjectTitle').val();
        var moduleName = $('#modMName').val();
        var noOfMilestones = $('#modNoOfMilestones').find(':selected').text();
        var dueDate = $('#modDueDate').val();
        var completionDate = $('#modComDate').val();
        var milestones = [] ;
        if(document.getElementById('modCompleted').checked){
            var courseworkCompleted = true ;
        }else {
            var courseworkCompleted = false ;
        }
        console.log(courseworkCompleted);

        for (var x = 0 ; x < noOfMilestones ; x++){
            var milestoneStep = x + 1; //Use 'human' counting, start from 1
            var Desc = prompt("Description of milestone " + milestoneStep);
            var milestoneID = Math.floor(Math.random() * 101) ; //TEMP
            milestone = {"milestone_id" : milestoneID, "Desc" : Desc, "milestoneStep" : x, "milestoneCompleted" : false} ;
            milestones[x] = milestone ; 
        }

        var data = {"module_id" : module_id ,"projectTitle" :projectTitle , "mName" : moduleName, "dueDate" : dueDate,"milestones" : milestones , "courseworkCompleted" : courseworkCompleted , "completionDate" : completionDate} ; 
        

        $.ajax({
            type : "POST",
            contentType : "application/json",
            data : JSON.stringify(data),
            url : 'http://localhost:3000/updateModule',
            success : function(){
                document.querySelector(".modal-Modify").style.display = "none";
                getSorted();
            },
            error : function(error){
                console.log("error");
            }
        })
        
    })
 

})