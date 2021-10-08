$(document).ready(function () {
    generate_list();
});


function generate_list() {
    $.getJSON("./config/mapping.json", null,
        function (data, _textStatus, _jqXHR) {
            var container = $('#box-container').empty();
            $.each(data.mapping, function (_index, element) { 
                if(element.title == '솔루션'){
                    $.each(element.contents, function (_index, element) { 
                        var box = $('<div>')
                            .appendTo(container)
                            .addClass('content-box');
                        $('<div>')
                            .appendTo(box)
                            .addClass('title')
                            .append(
                                $('<a>')
                                    .attr('href',element.href)
                                    .text(element.title));
                        var content = $('<div>')
                            .appendTo(box)
                            .addClass('content');
                        if(element.contents != null) {
                            generate_li(element.contents, content);
                        }
                    });
                    return false;
                }
            });
        }
    );
}

function generate_li(contents, box) {
    var $ul = $('<ul>').appendTo(box);
    $.each(contents, function (_index, element) { 
        var $li = $('<li>')
            .append(
                $('<a>')
                    .attr('href',element.href)
                    .text(element.title)
            )
            .appendTo($ul);
        if(element.contents != null)
            generate_li(element.contents, $li);
    });
    
}