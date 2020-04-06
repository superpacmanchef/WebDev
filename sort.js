$(document).ready(function() {

    //Sets default sorting method
    getSorted();

    //On chnage of dropdown menu sets selected sorting method
    $('#sort').change(function(){
       getSorted();
    });

});


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
    console.log(json);
    $.get('/templates/table.htm' , function(templates) {
        var template = $(templates).filter('#tables').html();
        $('#modules').append(Mustache.render(template,json));
    })
    console.log(json);
}
