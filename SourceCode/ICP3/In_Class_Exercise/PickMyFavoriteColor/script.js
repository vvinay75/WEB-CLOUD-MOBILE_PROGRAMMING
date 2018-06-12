//function to set the color of the preview div
function setPreviewColor(color) {
    $('.preview').css('background-color',color);
    $('.color-code').text($('.preview').css('background-color'));
}

//key up event handler to set the preview div with the color typed in the text input
$(document).on('keyup','#color',function () {
    var inputColor=$('#color').val();
    setPreviewColor(inputColor);
});
//function to add a box with desired color to the #colors div(i.e. favorites)
function addBox(color){
    var box='<div class="item" style="background-color: '+color+';"></div>';
    return $('#colors').prepend(box);
}
//event handler that reads the input color(#color) and adds it to the favorites(#colors) when add the favorites button is clicked
$(document).on('click','#add-to-favorite',function () {
    var color=$('#color').val();
    addBox(color);
    if ($('#colors .item' ).length>=16){
        $('#colors .item').last().remove();
    }
    $('#color').val('');
    $('#color').focus();



});

//event handler to display some initial colors after the page is loaded(ready)
$(document).ready(function () {
    //add predefined initial colors to colors div
    var initialColors = [  ];
    initialColors.forEach(function (initialColor) {
        addBox(initialColor);
    });
    //select one of the colors added to the colors div randomly and add ot the preview div
    var randomIndex=Math.floor(Math.random()*initialColors.length);
    intialPreviewColor=initialColors[randomIndex];
    setPreviewColor(intialPreviewColor);
});
//event handler to add the clicked color in the favorites(#colors .item) to the preview(.preview)
$(document).on('click','#colors .item',function () {
    $('.preview').css('background-color',($(this).css('background-color')));
});
var previewColor;
//event handler for the mouseenter event to change the color of the preview div to that of the mouse over color in the colors div
$(document).on('mouseenter','#colors .item',function () {
    previewColor=$('.preview').css('background-color');
    var boxColor=$(this).css('background-color');
    setPreviewColor(boxColor);
});

