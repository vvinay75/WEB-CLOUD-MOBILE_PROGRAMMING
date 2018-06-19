$(document).ready(function(){
    $('#translate').click(translate);
});
 
function translate(){
        var APIkey = "trnsl.1.1.20180619T203237Z.163922d373cf3afe.cefe99cce8952d102eb6f49df26081dd0380ae44";
        var language = $('#language').val();
        var translateText = $("#en-text").val().replace(" ","+");
        $.getJSON("https://translate.yandex.net/api/v1.5/tr.json/translate?key="
		+APIkey+"&lang=en-"+language
		+"&text="+ translateText +"&callback=?", 
		function(data){
                $('#output').empty();
                $('#output').html(data.text[0]);
        });
}