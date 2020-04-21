$(document).ready(function() {
 
    $('#completed').click(function() {
    var milestoneid  = $(this).val();
    var module = document.getElementById('Mid').getAttribute('value');
    var data =  {"module_id" : module , "milestone_id" : milestoneid } ;
    $.ajax({
        type : "POST",
        contentType : "application/json",
        data : JSON.stringify(data),
        url : 'http://localhost:3000/completeMilestone',
        success : function(data){
            if(data == "done"){
                milstoneSwitch(milestoneid);
            }else {}
        },
        error : function(error){
            
        }
    })
    });

})

function milstoneSwitch(milestone_id){
    var val = $('#complete').text(); 
    if(val == " false " || val == "false"){
        $('#complete').text("true");
        $('#' + milestone_id).css("background", "green");
    }else{
        $('#complete').text("false");
        $('#' + milestone_id).css("background", "");
    }
}