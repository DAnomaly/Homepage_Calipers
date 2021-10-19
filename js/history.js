$(document).ready(function () {
    loadJson();
});

function loadJson() {

    let $section = $('#section').empty();
    if($section[0] == null) return;

    $.getJSON("./config/history.html", 
        function (data, _textStatus, _jqXHR) {

            // console.log(Object.keys(data));

            if(data == null || !data.load) return;

            var maxYear = Math.max.apply(null, Object.keys(data.datas));
            console.log("maxYear", maxYear);

            var minYear = Math.min.apply(null, Object.keys(data.datas));
            console.log("minYear", minYear);

            for (let year = maxYear; year >= minYear; year--) {
                var arrHistory = data.datas[year];

                // console.log(year);

                $('<div>')
                    .append(
                        $('<span>')
                            .html('<i class="fas fa-chevron-right"></i>')
                            .attr('id','check-' + year)
                            .addClass('check')
                            .hide())
                    .append(
                        $('<a>')
                            .text(year)
                            .attr('onclick','yearOnClickEvent(this, ' + year + ');')
                            .attr('href','javascript:void(0);'))
                    .appendTo($section)
                    .addClass("year");

                var contentDiv = $('<div>')
                    .appendTo($section)
                    .addClass("contentDiv")
                    .attr("id","content-" + year)
                    .hide();

                arrHistory.forEach(element => {
                    var key = Object.keys(element)[0];
                    var content = element[key];
                    if(key < 10) 
                        key = year + ".0" + key;
                    else
                        key = year + "." + key;

                    // console.log(key, content);

                    $('<p>')
                        .append(
                            $('<span>')
                                .addClass('month')
                                .text(key))
                        .append(
                            $('<span>')
                                .addClass('content')
                                .text(content))
                        .appendTo(contentDiv);

                });
            }

            showYear = maxYear;
            $('#check-' + showYear).show();
            $('#content-' + showYear).show();

        }
    );

}


let showYear = 0;
function yearOnClickEvent(loc, year) {

    // 연혁 보이기 / 숨기기
    if(showYear == year){
        $('.check').hide();
        $('.contentDiv').slideUp();
        showYear = 0;
    } else {
        showYear = year;
    
        $('.check').hide();
        $('.contentDiv').slideUp();
        $('#check-' + showYear).show(3);
        $('#content-' + showYear).slideDown();
    }

    // 해당 연혁으로 스크롤
    setTimeout(function(){
        $('html, body').animate({
             scrollTop: $(loc).offset().top - 180
        }, 0);
    }, 400)
}
