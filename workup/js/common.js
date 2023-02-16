$(document).ready(function(){
    /* 아코디언, 드롭다운 동작 [S] */
    $('.ui_accordion, .ui_dropdown').each(function(){
        var _this = $(this),
            btn = _this.find("> [class*='btn']"),
            cont = _this.find("> [class*='cont']");

        btn.click(function(e){
            e.preventDefault();
            _this.toggleClass('open');
        });
        
        // 드롭다운
        $('.ui_dropdown').each(function(){
            var button = $(this).find('.drop_btn'),
                list_btn = $(this).find('.drop_cont li a');
            if(!$(this).hasClass('none')) button.addClass('material-icons-outlined');
            
            if($(this).hasClass('date')){ // 날짜 선택형
                var wrap_cont_btn = $(this).find('.drop_cont_btn .butn'),
                    listyear = $(this).find('.drop_cont .list.year li'),
                    listmonth = $(this).find('.drop_cont .list.month li'),
                    year, month;
                
                listyear.each(function(){// 년도 선택
                    $(this).click(function(e){
                        e.preventDefault();
                        listyear.siblings().removeClass('on');
                        $(this).addClass('on');
                        year = $(this).find('a').text();
                    });
                });
                listmonth.each(function(){// 월 선택
                    $(this).click(function(e){
                        e.preventDefault();
                        listmonth.siblings().removeClass('on');
                        $(this).addClass('on');
                        month = $(this).find('a').text();
                    });
                });
                wrap_cont_btn.click(function(e){ // 확인 또는 취소 버튼 입력 시 동작
                    e.preventDefault();
                    if($(this).hasClass('comfirm')){
                        $(this).parents('.drop_cont').siblings('.drop_btn').find('.year').text(year);
                        $(this).parents('.drop_cont').siblings('.drop_btn').find('.month').text(month);
                        $(this).parents('.ui_dropdown').removeClass('open');
                    }
                    else{
                        $(this).parents('.ui_dropdown').removeClass('open');
                    }
                });
                $(this).find('.drop_cont .list').slimScroll({
                    alwaysVisible: true,
                    width : '89px',
                    height: '189px'
                });
            }
            else{ // 그 외의 드롭다운 형태들
                list_btn.click(function(e){
                    e.preventDefault();
                    var list = $(this).text();
                    $(this).parents('.drop_cont').siblings('.drop_btn').find('span').text(list);
                    $(this).parents('.ui_dropdown').removeClass('open');
                });
            }
        });
    });
    /* 아코디언, 드롭다운 동작 [E] */
    
    /* 드롭다운 오픈 시 드롭다운 밖 영역 클릭 했을 때 닫기는 스크립트[S] */
    $('html').on('click', function(e) {
        if (!$('.ui_dropdown').has(e.target).length) {
            if($('.ui_dropdown').hasClass('open') === true) $('.ui_dropdown').removeClass('open');
        }
    });
    /* 드롭다운 오픈 시 드롭다운 밖 영역 클릭 했을 때 닫기는 스크립트[E] */

    /* tab [S] */
    $('.wrap_tab, .wrap_tab2, .wrap_tab_action').each(function(){
        if($(this).hasClass('wrap_tab') == true){
            var btn = $(this).find('>.wrap_tab_btn > .tab_btn'),
                cont = $(this).find('>.wrap_tab_cont > .tab_cont');
        }
        else{
            var btn = $(this).find('.wrap_tab_btn .tab_btn'),
                cont = $(this).find('.wrap_tab_cont .tab_cont');
        }
        
        btn.click(function(){
            var i = $(this).index();
            
            $(this).siblings('.tab_btn').removeClass('open');
            $(this).addClass('open');
            cont.removeClass('open');
            cont.eq(i).addClass('open');
        });
    });
    /* tab [S] */

    /* 업무화면 tab [S] */
    $('.wrap_tab.task').each(function(){
        var btn = $(this).find('>.wrap_tab_btn .tab_btn');
        
        btn.click(function(){
            var cont = $(this).parent().siblings().find('.tab_cont'),
                i = $(this).index();
            
            $(this).siblings('.tab_btn').children('a').removeClass('active');
            $(this).addClass('active');
            cont.removeClass('active');
            cont.eq(i).addClass('active');
        });
    });
    /* 업무화면 tab [E] */
    
    /* gnb 메뉴 - 펼침/닫힘 [S] */
    $('.NavClose').each(function(){
       var btn = $(this).find('button'),
           accordion = $(this).parent().find('.ui_accordion');
        btn.click(function(){
            $(this).siblings().removeClass('on')
            $(this).addClass('on');
            if($(this).hasClass('open') == true){
                accordion.addClass('open');
            }
            else{
                accordion.removeClass('open');
            }
        });
    });
    /* gnb 메뉴 - 펼침/닫힘 [E] */
    
    /* gnb 메뉴 - 페이지 위치 확인 및 sub 영역 스크롤 [S] */
    $('.gnb').each(function(){
        $(this).find('li.on').parents('.depth2 > li').addClass('on');
        $(this).find('.depth3 .ui_accordion').addClass('open');
        if($(this).find('.depth2 > li').hasClass('on') == true){
            var menu = $(this).find('.depth2 > li.on'),
                parent = menu.parents('.ui_accordion');
            parent.addClass('open');
        }
        if($(this).parents().hasClass('addAuth') != true) $(this).find('.default > .acco_cont').css('display','block');
        $(this).find('.subNav').each(function(){
            $(this).slimScroll({
                alwaysVisible: true, // 2021-07-26 추가
                width: '166px',
                height: '100vh'
            });
        });

    });
    /* gnb 메뉴 - 페이지 위치 확인 및 sub 영역 스크롤 [E] */
    
    /* gnb 메뉴 - sub 영역 펼침/닫힘 [S] */
    $('.gnbClose').click(function(){
        var header = $(this).parents('.header'),
            content = header.siblings('.content'),
            hoverDiv = $(this).siblings('.gnb').find('.depth2 li.on .slimScrollDiv');
        if(!header.hasClass('wide')){
            header.addClass('wide');
            hoverDiv.animate({
                width: "0px"
            })
            $(this).animate({
                right: "-10px"
            })
        }
        else{
            header.removeClass('wide');
            hoverDiv.animate({
                width: "166px"
            })
            $(this).animate({
                right: "-174px"
            })
        }
        $(this).toggleClass('shut');
    });
    /* gnb 메뉴 - sub 영역 펼침/닫힘 [E] */
    
    /* 팝업[S] */
    $('.popup').each(function(){
        if(!$(this).hasClass('modal')){
            if($(this).hasClass('dim') === true) {
                $(this).parents('body').append("<div class='dimed'></div>");
            }
        }
        else if($(this).hasClass('modal')){
            if($(this).hasClass('board') === true) {
                $(this).find('.wrap_board_cont, .wrap_board_write').slimScroll({
                    alwaysVisible: true
                });
            }
            else if($(this).hasClass('noscroll') === true) {
                $(this).find('[class*="body"]').slimScroll({
                    destroy: true
                });
            }
            else{
                $(this).find('[class*="body"]').slimScroll({
                    alwaysVisible: true
                });
            }
        }
    });
    /* 팝업[E] */
    
    /* 체크박스 전체선택[S] */
    $('.wrap_agree').each(function(){
        var allcheck = $(this).find('.allcheck'),
            checkboxs = $(this).find('input[name="allcheck"]');
        
        allcheck.click(function(){
            if($(this).find('> input').prop('checked')){
                checkboxs.prop("checked",true);
            }
            else{
                checkboxs.prop("checked",false);
            }
        });
    });
    /* 체크박스 전체선택[E] */
    
    /* HR담당자 팝업 스크롤[S] */
    $('#hrmodal .modal-body').each(function(){
        $(this).slimScroll({
            alwaysVisible: true, // 2021-07-26 추가
            width: '100%',
            height: '444px'
        });
    });
    /* HR담당자 팝업 스크롤[E] */
    
    /* 할일 팝업 링크추가 > 메뉴선택 트리 스크롤[S] */
    $('.wrap_tree dd').each(function(){
        $(this).slimScroll({
            alwaysVisible: true, // 2021-07-26 추가
        }).parent().css({
            'float': 'left',
            'height': '513px'
        });
    });
    /* 할일 팝업 링크추가 > 메뉴선택 트리 스크롤[E] */
    
    /* main HR 관리자 링크 바로가기 빈곳 체크해서 추가하기 버튼 넣기 */
    $('.authHR .list.link').each(function(){
        var li_len = $(this).find('li').length,
            i = 0, j,
            appendHTML = '';
        
        if(li_len % 3 == 0) i = 3;
        else if(li_len % 3 == 1)  i = 2;
        else {
            i = 1;
            return i;
        }
        
        for(j = 0; j < i; j++){
            appendHTML += '<li><button class="butn gray add"><i></i><span>추가하기</span></button></li>';
        }
        $(this).append(appendHTML);
    });
});

//업무 쪽 공통
//상단 탭 X버튼 지우기
$('.tab>li.tablinks>button').click(function(){
    $(this).parent().remove();
});

//상단 탭 클릭 시 active
$('.tab>li.tablinks').click(function(){
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
});

//이동에 관련된 함수
function moveNavigation(byX) {
    var _scrollX = $('.tab-navigation .inner-wrap').scrollLeft();
    $('.tab-navigation .inner-wrap').scrollLeft(_scrollX + byX);
};

//탭 좌측 이동 버튼 클릭 이벤트
$('.tab-control.arrow-left').click(function(e) {
    moveNavigation(-100);
});

//탭 우측 이동 버튼 클릭 이벤트
$('.tab-control.arrow-right').click(function(e) {
    moveNavigation(+100);
});

/* 숫자 입력 시 하이픈 구분 시켜주는 스크립트[S] */
function putHyphen(e, type) {
    var number = e.value.replace(/[^0-9]/g, "");
    var phone = "";

    if (number.length < 6) {
        return number;
    } else if (number.length < 10) { // 00-000-0000 형태의 전화번호
        phone += number.substr(0, 2);
        phone += "-";
        phone += number.substr(2, 3);
        phone += "-";
        phone += number.substr(5);
    } else if (number.length < 11 && type === "n") { // 사업자번호
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 2);
        phone += "-";
        phone += number.substr(5);
    } else if (number.length < 11 && type == null) { // 000-000-0000 형태의 전화번호
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 3);
        phone += "-";
        phone += number.substr(6);
    } else if (number.length < 12) { // 000-0000-0000 형태의 전화번호
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 4);
        phone += "-";
        phone += number.substr(7);
    } else { // 주민등록번호, 법인등록번호
        phone += number.substr(0, 6);
        phone += "-";
        phone += number.substr(6);
    }

    e.value = phone;
}
/* 숫자 입력 시 하이픈 구분 시켜주는 스크립트[E] */