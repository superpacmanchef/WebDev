$(document).ready(function() {

    $('.milestonesBtn').click(function() {
    var milestoneid  = $(this).val();
    var id = $(this).attr('id') ;
    var module = document.getElementById('Mid').getAttribute('value');
    var data =  {"module_id" : module , "milestone_id" : milestoneid } ;
    $.ajax({
        type : "POST",
        contentType : "application/json",
        data : JSON.stringify(data),
        url : 'https://webdev2-coursework.herokuapp.com/completeMilestone',
        success : function(data){
            if(data == true){
                $('#' + id).removeClass('false').addClass('true');
            }else{
                $('#' + id).removeClass('true').addClass('false');
                $('#' + id).css('background-color', '');        
            }
        },
        error : function(error){
            
        }
    })
    });

})
