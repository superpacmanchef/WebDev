$(document).ready(function(){
    //Sets default sorting method
    getSorted();

    //On chnage of dropdown menu sets selected sorting method
    $('#sort').change(function(){
       getSorted();
    });

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
        document.querySelector('.modal-Adding').style.display = "none";
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


    //Adds new module to database
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
            milestone = {"milestone_id" : milestoneID, "Desc" : Desc, "milestoneStep" : milestoneStep, "milestoneCompleted" : false} ;
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
 

})




//Gets current slection of sorting method and 
function getSorted(){
    whatTable($('#sort').find(":selected").val());
}

//Table Sorting
/* 
    0 = unsorted
    1 = ALPH
    2 = Reverse ALPH
    3 = Earlys
    4 = Late
*/
//Decides whta table to show to User
function whatTable(sort){
    switch(sort){
        case "0":
            setTableUnsorted();
            break;
        case "1":
            setTableSorted();
            break;
        case "2":
            setTableDescSorted();
            break;
        case "3":
            setTableEarlySorted();
            break;
        case "4":
            //setTableLate()
            break;
    }   
}

//Gets Unsorted data and then runs fucntion to display data.
function setTableUnsorted(){
    $('#modules').empty();
    var table = getUnsortedModules() ;
    table.then((data) => {
        displayTable(data);
    });
}

//Gets alphbeitcall sorted sorted data and then runs fucntion to display data.
function setTableSorted(){
    var sorted = getAlphModules() ;
        sorted.then((data) => {
            $('#modules').empty();
            displayTable(data);
    
        })
}

//Gets reverse alphbeitcall sorted sorted data and then runs fucntion to display data.
function setTableDescSorted() {
    var sorted = getDescModules();
    sorted.then((data) => {
        $('#modules').empty();
        displayTable(data);
    }) 
}

//Gets ealiest due date sorted data and then runs fucntuion to display data.
function setTableEarlySorted() {
    var sorted = getLatestModules();
    sorted.then((data) => {

        $('#modules').empty();
        displayTable(data);
    }) 
}

//Gets Undorted modules from database and returns them.
function getUnsortedModules(){
    return new Promise((resolve , reject) => {
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : 'http://localhost:3000/getModules',
            success : function(data){
                resolve(data);               
            },
            error : function(error){
                reject(error)
            }
        })
    })
}

//Gets alphabetically sorted modules from database and returns them.
function getAlphModules(){
    return new Promise((resolve , reject) => {
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : 'http://localhost:3000/sort',
        success : function(data){
            resolve(data);               
        },
        error : function(error){
            reject(error)
        }
    })
})
}

//Gets reverse alphbetically sorted modules from the database and returns them.
function getDescModules(){
    return new Promise((resolve , reject) => {
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : 'http://localhost:3000/sortD',
            success : function(data){
                resolve(data);               
            },
            error : function(error){
                reject(error)
            }
        })
    })
}

//Gets modules sorted by earliest dueDate from the database and returns them.
function getLatestModules(){
    return new Promise((resolve , reject) => {
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : 'http://localhost:3000/sortEDueDate',
            success : function(data){
                resolve(data);               
            },
            error : function(error){
                reject(error)
            }
        })
    })
}

//Takes in Json object and display table using mustcahe templates.
function displayTable(json){
    $.get('/templates/table.htm' , function(templates) {
        var template = $(templates).filter('#tables').html();
        $('#modules').append(Mustache.render(template,json));
    })
    console.log(json);
}


