$(document).ready(function () {
    loadJson();
});

function loadJson() {

    let section = $('#section').empty();
    if(section[0] == null) return;
    
    $.getJSON("./config/history.json", 
        function (data, _textStatus, _jqXHR) {
            $.each(collection, function (indexInArray, valueOfElement) { 
                 
            });
        }
    );

}