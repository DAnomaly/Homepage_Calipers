$(document).ready(function () {
    loadJson();
});

function loadJson() {

    let section = $('#section').empty();
    if(section[0] == null) return;
    
    $.getJSON("./config/history.json", "GET",
        function (data, _textStatus, _jqXHR) {
            console.log(2);
            if(data.load == false) return;

            $.each(data.datas, function (_index, element) { 
                console.log(element);
                console.log(element.key);
                $div = $('<div>').addClass('');
                $.each(element, function (indexInArray, valueOfElement) { 
                    
                });
            });
        }
    );
}