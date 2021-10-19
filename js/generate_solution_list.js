$(document).ready(function () {
    generate_list();
});

// id="solution-contents"에 리스트를 생성합니다.
function generate_list() {
    $.getJSON("./config/mapping.html", null,
        function (data, _textStatus, _jqXHR) {
            var container = $('#solution-contents').empty();
            $.each(data.mapping, function (_index, element) { 
                if(element.title == '솔루션'){
                    $.each(element.contents, function (_index, element) { 

                        // E-PROCESS, E-KNOWLEDGE, E-WIRELESS는 생성하지 않습니다.
                        if(element.title == 'E-PROCESS')
                            return true;
                        if(element.title == 'E-KNOWLEDGE')
                            return true;
                        if(element.title == 'E-WIRELESS')
                            return true;

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