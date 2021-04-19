$(document).ready(function () {

    var container, dialog;
    var subject = $("#subject-input");
    var slot = $("#slot-input");
    var formError = $("#form-error");
    var eventColor = $('#event-color-input');
  
    dialog = $("#dialog").dialog({
        autoOpen: false,
        width: 350,
        close: function () {
            $('#form-error').text('');
            subject.val('');
            $("#slot-input").prop("disabled", false);
        }
    });


    $('td').dblclick(function () {
        container = $(this).find('.events');
        if ($(container).children().length < 2) {
            dialog.dialog({
                title: "Add Event",
                buttons: {
                    Done: finish
                }
            })
            dialog.dialog("open");
        }
    });


    function finish() {
        formValidate(container);
    }

    function formValidate(container) {

        current_slot = slotValidate(container);

        if (subject.val() == '') {
            formError.text('Please fill in the subject!');
        }
        else if (current_slot) {
            formError.text('Please find another slot!');
        } else {
            addEvent(container);
            dragElement();
           childClick();
            dialog.dialog('close');
        }
    }

    function slotValidate(container){

        let current_slot = false;
        if($(container).children().length > 0 ){
            $(container).children().each(function(){     
                return current_slot = $(this).find('span:first-child').text().trim() == slot.val();          
            });
        }
        return current_slot;
    }

    
    function addEvent(container)
    {
        if(slot.val() == 'AM'){
            $(container).prepend('<div class="event " style="background-color:' 
                        + eventColor.val() +';  "> <span>'+ slot.val() +'</span>:  '
                        + subject.val() +'<span class="ui-icon ui-icon-circle-close"> </span></div>');
        }else{
            $(container).append('<div class="event " style="background-color:' 
                        + eventColor.val() +' ; "> <span>'+slot.val()+'</span>: '
                        + subject.val() +'<span class="ui-icon ui-icon-circle-close"></span> </div>');
        }    
    }


    function childClick()
    {
        $('.event span.ui-icon').click(function(){
            $(this).parent().remove();
        });

        $('.event').click(function(){
            edit(this);
        });
    }

    function dragElement(){
        $('.event').draggable({
            revert : true,
            helper : "clone",
            cursor: "move",   
        });
    }
     
    $('td').droppable({
        accept  : '.events > div',
        drop: function(event,ui){
            eventContainer = $(this).find('.events');
            dropCheck(eventContainer,ui.draggable)
        },
    });

    
    function dropCheck(e,ui)
    {
        let eventslot = false;
        $(e).children().each(function(){
            if($(this).find('span:first-child').text() == $(ui).find('span:first-child').text() ){  
                eventslot =  true;   
            }                
        });
        ui.draggable({
            revert : eventslot
        })
        
        if(!eventslot){
          
                $eventList = $(e).length ? $(e) : $(ui).appendTo( $eventList );
                if($(ui).find('span:first-child').text() == 'PM' ){
                    $(ui).appendTo( $eventList ).fadeIn();
                }else{
                    $(ui).prependTo( $eventList ).fadeIn();
                } 
         
        }  
    }

})