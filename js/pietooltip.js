$(document).ready(function(){
  
  $("g").mousemove(function(event){

    $('.popover').css({'margin-left':event.pageX,
                      'margin-top':event.pageY - 50,
                      
                    }).show();       
    $(".popover-content").html($(this).children("text").attr("tooltip"));

    $(this).css({'opacity':0.9});

  });

  $("g").mouseout(function(){
      $('.popover').hide();
      $(this).css({'opacity':1});
  });

});
