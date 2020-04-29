$(document).ready(function() {

$('#reg').click(function() {
    var uname = document.getElementById("uname").value;
    var data = {"uname" : uname};
    
    $.ajax({
        type : "POST",
        contentType : "application/json",
        data : JSON.stringify(data),
        url : 'http://localhost:3000/regCheck',
        success : function(dataa)
        {       console.log(dataa);
                if(dataa == "true"){
                    reg();
                }else{
                    alert("That name is already taken");
                }
        },
        error : function(error){
            
        }
    })
    });


});


function reg(){
    var uname = document.getElementById("uname").value;
    var fname = document.getElementById("fname").value;
    var sname = document.getElementById("sname").value;
    var psw = document.getElementById("psw").value;
    var pswR = document.getElementById("pswR").value;
    var course = document.getElementById("course").value;
    var unis = document.getElementById("unis").value;

    var data = {"uname" : uname , "fname" : fname , "sname" : sname , "psw" : psw , "pswR" : pswR , "course" : course , "unis" : unis};
    $.ajax({
        type : "POST",
        contentType : "application/json",
        data : JSON.stringify(data),
        url : 'http://localhost:3000/register',
        success : function(data){
            window.location.replace("http://localhost:3000/");
        },
        error : function(error){
            
        }
    })
};
