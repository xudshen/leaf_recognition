/**
 * Created by xudshen on 14-3-16.
 */

$(function() {
    function resp(){
        $(window).resize(function() {
            $('#pt-main').css({
                position: 'fixed',
                width: $(window).width(),
                height: $(window).height()
            });
        });
    }

    $( document ).ready(function() {
        resp();
        $('#find').click(function(){
            $("#find_btn").slideToggle(300);
        });
        $('li img').on('click',function(){
            var src = $(this).attr('src');
            var name = $(this).attr('name');
            var img = '<img src="' + src + '" class="img-responsive"/>';
            $('#myModal').modal();
            $('#myModal').on('shown.bs.modal', function(){
                $('#myModal .modal-body').html('<h1 style="color: #000000">' + name + '</h1>' + img);
            });
            $('#myModal').on('hidden.bs.modal', function(){
                $('#myModal .modal-body').html('');
            });
        });
        var showRandom = false;
        function toggle_list(){
            if(!showRandom){
                $('#random').slideUp(400,
                    function(){
                        $('#species_list').slideDown();
                    }
                );
            }
            else{
                $('#species_list').slideUp(400,
                    function(){
                        $('#random').slideDown();
                    }
                );
            }
            showRandom = !showRandom;
        }
        $('#species').click(function(){
            toggle_list();
        });
        $('.img-responsive').on('click',function(){
            var src = $(this).attr('src');
            var name = $(this).attr('name');
            toggle_list();
            $('#iterateEffects').click();
        });

        if (document.title.indexOf('Predict') >= 0){
            $.get("/api/species/" + document.title.substring(9), function( data ) {
                if (data.trim()) {
                    $('#info_body').html(data);
                }
                else $('#info_body').html("can not find info");
            });
        }

    });
});