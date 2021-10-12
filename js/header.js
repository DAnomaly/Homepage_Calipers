/*
 * JQuery 필수
 * <div id="top-container"></div> 에 header와 nav를 생성합니다.
 */

$(document).ready(function(){
    generateHeader();
    generateFooter();
    scrollUpBtn();
})

// header, nav 내용을 생성합니다.
// id="top-container"가 필요합니다.
// class="loc-[Mapping]"에 경로를 생성합니다.
function generateHeader() {

    let $topContainer = $('#top-container').empty();
    let $header = $('<header>').attr('id', 'header').appendTo($topContainer);
    let $subMenu = $('<nav>')
        .attr('id', 'sub-menu')
        .appendTo($topContainer)
        .hide()
        .hover(function () {
                // over
                
            }, function () {
                // out
                hide_submenu();
            }
        );;

    let $mainMenu = $('<ul>').attr('id', 'main-menu');
    $('<div>')
        .appendTo($header)
        .append(
            $('<a>')
                .append(
                    $('<img>')
                        .attr('class', 'logo')
                        .attr('alt', 'TRIPLEAIMS')
                        .attr('src', './img/mainlogo.png')
                )
                .attr('href','index.html')
        )
        .append($mainMenu);

    // config/mapping.json의 내용을 가져옵니다.
    $.getJSON("./config/mapping.json", "GET",
        function (data, _textStatus, _jqXHR) {
            let mapping = data.mapping;
            
            // main-menu
            // main-menu에 메뉴를 생성합니다
            $.each(mapping, function(_index, item){
                var title = item.title;
                var href = item.href;
                $('<a>')
                    .text(title)
                    .attr('href',href)
                    .appendTo(
                        $('<li>').appendTo($mainMenu)
                    )
                    .hover(function(){
                        show_submenu(); 
                    });
            });
            
            //main-menu에 nav-bar를 추가합니다.
            $('<a>')
                .append('<i class="fas fa-bars"></i>')
                .attr('class', 'nav-bar')
                .appendTo(
                    $('<li>').appendTo($mainMenu)
                )
                .attr('href', 'javascript:show_submenu();')

            // sub-menu
            // sub-menu에 메뉴를 생성합니다
            function generate_submenu(items, menu) {
                var $ul = $('<ul>').appendTo(menu);
                $.each(items, function(_index, item){
                    var $li = $('<li>').appendTo($ul);
                    var title = item.title;
                    var href = item.href;
                    var contents = item.contents;
                    $('<a>')
                        .text(title)
                        .attr('href', href)
                        .appendTo($li);
                    if(contents != undefined) {
                        generate_submenu(contents, $li);
                    }
                })
            }
            generate_submenu(mapping, $subMenu);

            // class="loc-[title]"
            // 클래스명에 href를 생성해 줍니다.
            function repeat (param) {  
                $.each(param, function (_index, value) { 
                    // class="loc-[title]"의 href를 조정
                    var href = value.href;
                    var title = '.loc-' + value.title;
                    $('a' + title).attr('href', href);
                    $('div' + title).attr('onclick', 'location.href="' + href + '";');
                    
                    // 반복
                    var contents = value.contents;
                    if(contents != undefined) {
                        repeat(contents);
                    }
                });
            }
            repeat(mapping);

            generateNavBar(mapping);
        }
    );
}

// footer를 생성합니다.
// id="bottom-container"가 필요합니다.
function generateFooter() {
    // id="bottom-container" 지정
    let $bottomContainer = $('<div>').appendTo($('#bottom-container').empty());

    // 내용
    let content1 = 'Tripleaims company Inc';
    let content2 = '150-105 서울시 영등포구 양평동5가 39 우림라이온스밸리 A동 1404호';
    let content3 = '(02)6952-7005<br/>'
                 + 'kimys@tripleaims.co.kr<br/>'
                 + 'Copyright &copy; Tripleaims, Corp. All rights reserved';

    // 내용생성
    // left-container
    $('<div>')
        .addClass('left-container')
        .appendTo($bottomContainer)
        .append('<img alt="TRIPLEAIMS" src="./img/mainlogo.png"/>');
    // right-container
    $('<div>')
        .addClass('right-container')
        .appendTo($bottomContainer)
        .append(
            $('<p>')
                .html(content1)
        )
        .append(
            $('<p>')
                .html(content2)
        )
        .append(
            $('<p>')
                .html(content3)
        );
        
}

// id="nav-bar"
// Banner아래에 nav-bar를 생성합니다.
function generateNavBar(mapping) {

    let $bar = $('#nav-bar');
    // id="nav-bar"가 존재하지 않는다면 해당 메소드를 실행하지 않습니다.
    if($bar[0] == undefined){
        return;
    }

    let title = $bar.data('title');
    // data-title=""가 존재하지 않는다면  해당 메소드를 실행하지 않습니다.
    if(title == undefined){
        return;
    }
    
    // class="left-div"를 작성합니다.
    let leftDiv = $('<div>').appendTo($bar).addClass('left-div');
    function generateLeftDiv(element) {
        if(element.contents != null){
            leftDiv
            .append(
                $('<a>')
                    .attr('href',element.href)
                    .text(element.title)
            )
            .append(
                $('<span>')
                    .html('&gt;')
            );
            $.each(element.contents, function (_index, element) { 
                 leftDiv
                    .append(
                        $('<a>')
                            .attr('href',element.href)
                            .text(element.title)
                 );
            });
        }
    }
    $.each(mapping, function (_index, element) { 
        var repeatEach = true;
        if(element.title == title) {
            generateLeftDiv(element);
            return false;
        }
        if(element.contents != null) {
            $.each(element.contents, function (_index, element) { 
                 if(element.title == title) {
                     generateLeftDiv(element);
                     repeatEach = false;
                     return false;
                 }
            });
        }
        return repeatEach;
    });
    

    // class="right-div"를 작성합니다.
    let rightDiv = $('<div>').appendTo($bar).addClass('right-div');
    function generateRightDiv(contents) {
        var result = true;
        var tempHtml = rightDiv.html();
        $.each(contents, function (_index, element) { 
            
            rightDiv.empty();
            rightDiv.html(tempHtml);

            rightDiv.append(
                $('<span>').html('&gt;')
            );

            rightDiv.append(
                $('<a>').attr('href',element.href).text(element.title)
            );
            if(element.title == title) {
                return result = false;
            }
            if(element.contents != null) {
                return result = generateRightDiv(element.contents);
            }
            if(result) {
            }
        });

        return result;
    }
    $.each(mapping, function (_index, element) {
        var repeatEach = true;
        
        rightDiv.empty();
        rightDiv.append('<i class="fas fa-home"></i>');
        rightDiv.append(
            $('<a>').attr('href',element.href).text(element.title)
        );
        
        if(element.title == title){
            repeatEach = false;
            return repeatEach;
        }
        
        if(element.contents != null) {
            repeatEach = generateRightDiv(element.contents);
        }

        return repeatEach;
    });
}


// scrollUpBtn를 기능과 함께 생성합니다.
function scrollUpBtn() {

    var $btn = $('#top-button');
    $btn.html('<i class="fas fa-chevron-circle-up"></i>');

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $btn.fadeIn();
        } else {
            $btn.fadeOut();
        }
    });

    $btn.click(function() {
        $('html').scrollTop(0);
    });
}

// 스크롤 보이기
function show_submenu() {
    $('#sub-menu').slideDown();
    $('#header').addClass('nav-open');
    $('#sub-menu').addClass('nav-open');
    $('#header').removeClass('nav-close');
    $('#sub-menu').removeClass('nav-close');
}

// 스크롤 숨기기
function hide_submenu() {
    $('#sub-menu').slideUp();
    $('#header').removeClass('nav-open');
    $('#sub-menu').removeClass('nav-open');
    $('#header').addClass('nav-close');
    $('#sub-menu').addClass('nav-close');
}

