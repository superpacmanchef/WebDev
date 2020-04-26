$(document).ready(function() {

    buttonStyle();

    $('.milestonesBtn').click(function() {
    var milestoneid  = $(this).val();
    var id = $(this).attr('id') ;
    var module = document.getElementById('Mid').getAttribute('value');
    var data =  {"module_id" : module , "milestone_id" : milestoneid } ;
    $.ajax({
        type : "POST",
        contentType : "application/json",
        data : JSON.stringify(data),
        url : 'http://localhost:3000/completeMilestone',
        success : function(data){
            if(data == true){
                $('#' + id).removeClass('false').addClass('true');
                $('#' + id).css('background-color', 'green');
            }else{
                $('#' + id).removeClass('true').addClass('false');
                $('#' + id).css('background-color', '');        
            }
        },
        error : function(error){
            
        }
    }).always();
    });

})


function buttonStyle(){
    var id = document.getElementById('Mid').getAttribute('value');
    var data = {"id" : id };
    $.ajax({
        type : "POST",
        contentType : "application/json",
        data : JSON.stringify(data),
        url : 'http://localhost:3000/getModule',
        success : function(data){
            $('#0').css({
                'border-radius': '25px 25px 0px 0px',
            });

            if(data.module.milestones.length > 1){
                var end = '#' + (data.module.milestones.length - 1);
                $(end).css({
                    'border-radius': '0px 0px 25px 25px',
                }); 
            }
        },
        error : function(error){
            
        }
    }).always();

}


