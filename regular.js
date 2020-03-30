var alph = false ; 
$(document).ready(function(){

    setTableUnsorted();

    $('#alp').click(function() {
        if(alph == false){
            alph = true ; 
            setTableSorted();
            
    }else {
        alph = false;
        setTableUnsorted();
    }
    
    
    
    });

    $(document).on("click","#modules tr td button.modify", function() { // any button
        console.log("bumss");
      });

    $("#newAdd").click(function(){
        document.querySelector(".modal-Adding").style.display = "block";
    })

    $('#addProject').click(function() {
        var projectTitle = $('#projectTitle').val();
        var mName = $('#mName').val();
        var noOfMilestones = $('#noOfMilesstones').find(':selected').text();
        var dueDate = $('#dueDate').val();
        var milestones = [] ;

        for (var x = 0 ; x <= noOfMilestones ; x++){
            var Desc =prompt("DESC" + x + 1 );
            var milestoneID = Math.floor(Math.random() * 101) ; //TEMP
            milestone = {"Desc" : Desc , "completed" : false , "milestoneStep" : x, "milestone_id" : milestoneID} ;
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
                    if(alph == false){
                        setTableSorted();
                }else {
                    setTableUnsorted();
                }         
                },
                error : function(error){
                    console.log("error");
                }
            })
        
        
    })
 
})










//TABLE APLH
function setTableUnsorted(){
    $('#modules').empty();
    var table = getUnsortedModules() ;
    table.then((data) => {
        displayTable(data);
    });
}

function setTableSorted(){
    var sorted = getAlphModules() ;
        sorted.then((data) => {
            
            $('#modules').empty();
            displayTable(data);
    
        })
}

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

function displayTable(json){
    $.get('/templates/table.htm' , function(templates) {
        var template = $(templates).filter('#tables').html();
        $('#modules').append(Mustache.render(template,json));
    })
}



