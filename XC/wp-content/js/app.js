$(function(){

})
$(document).ready( () => {
    // div convert pages 1 2 3 4 let count = 1;
    $('.section.section-4 .first, .section.section-4 .change-button a:nth-child(2)').show();
    $('.section.section-4 .second, .section.section-4 .third, .section.section-4 .change-button a:nth-child(1)').hide();
    $('#next-view').click( function () { window.scroll({ top: 480, left: 0, behavior: 'smooth' }); count++; if (count === 1) { $('.section.section-4 .second, .section.section-4 .third, .section.section-4 .change-button a:nth-child(1)').fadeOut(); $('.section.section-4 .first, .section.section-4 .change-button a:nth-child(2)').fadeIn() } else if (count === 2) { $('.section.section-4 .first, .section.section-4 .third').fadeOut(); $('.section.section-4 .second, .section.section-4 .change-button a:nth-child(1)').fadeIn() } else if (count === 3) { $('.section.section-4 .first, .section.section-4 .second, .section.section-4 .change-button a:nth-child(2)').fadeOut(); $('.section.section-4 .third, .section.section-4 .change-button a:nth-child(1)').fadeIn() } else { $('.section.section-4').hide() } }); $('#prev-view').click(function () { count--; if (count === 3) { $('.section.section-4 .first, .section.section-4 .second, .section.section-4 .change-button a:nth-child(2)').hide(); $('.section.section-4 .third, .section.section-4 .change-button a:nth-child(1)').show() } else if (count === 2) { $('.section.section-4 .first, .section.section-4 .third').hide(); $('.section.section-4 .second, .section.section-4 .change-button a:nth-child(2)').show() } else if (count === 1) { $('.section.section-4 .second, .section.section-4 .third, .section.section-4 .change-button a:nth-child(1)').hide(); $('.section.section-4 .first, .section.section-4 .change-button a:nth-child(2)').show() } else { $('.section.section-4').hide() } })
    // dynamic slide only on div on active 
    $('.box-toggle .toggle-button').click(function () { $('.box-toggle .toggle-button').not(this).siblings('p').slideUp(); $(this).siblings('p').slideToggle(); $(this).parents('.box-toggle').toggleClass('active').parents('.toggle-div').find('.box-toggle').not($(this).parent()).removeClass('active') })
    // input field add class active
    $('.serach-box input').blur(function () {
        if ($(this).val() != '') { $(this).closest('.serach-box').addClass('active'); } else { $(this).closest('.serach-box').removeClass('active'); }
    });
    $('.serach-box input').focusin(function () {
        $(this).closest('.serach-box').addClass('active');
    });
    $('.serach-box').click(function () {
        $('.serach-box').addClass('active');
    })
    if ($('input[type="text"]').val().length > 0) {
        $('fieldset').addClass('active');
    };
    $('.field input, .field textarea').blur(function () {
        if ($(this).val() != '') {
            $(this).closest('.field').find('fieldset').addClass('active');
        } else { $(this).closest('.field').find('fieldset').removeClass('active'); }
    });
    $('.field input, .field textarea').focusin(function () {
        $(this).closest('.field').find('fieldset').addClass('active');
    });
    // button convert in anchor <a href="" target="_blank"></a> let button = 
    $('body').find('button'); button.click(function () { let buttonHref = $(this).attr(`href`); let buttonTarget = $(this).attr(`target`); if (buttonHref != '' && buttonHref != false && buttonHref != undefined && buttonTarget != '' && buttonTarget != false && buttonTarget != undefined && buttonTarget == '_blank') { window.open(buttonHref) } else if (buttonHref != '' && buttonHref != false && buttonHref != undefined) { window.location.href = buttonHref } else { false } })
    // close // page scroll use by ID # 
    $('a[href*="#"]:not([href="#"])').click(function () { if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) { var target = $(this.hash); target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'); if (target.length) { $('html, body').animate({ scrollTop: target.offset().top }, 1500); return false; } } });
    //from other page go to same location 
    var target = window.location.hash; if (target != '') { var $target = jQuery(target); jQuery('html, body').stop().animate({ 'scrollTop': $target.offset().top }, 900, 'swing', function () { window.location.hash = target - 240; }); }
    // sliders 
    $('.moving-bann').slick({ slidesToShow: 3, slidesToScroll: 3, autoplay: true, autoplaySpeed: 2000, dots: true, responsive: [{ breakpoint: 1030, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true } }, { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } }] }); $('.moving-bann-2').slick({ slidesToShow: 4, slidesToScroll: 4, autoplay: true, autoplaySpeed: 2000, dots: true, responsive: [{ breakpoint: 1030, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } }, { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } }] }); $('.xs-slider-NOT').slick({ slidesToShow: false, slidesToScroll: false, autoplay: true, autoplaySpeed: 2000, dots: false, responsive: [{ breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } }] });
    // console.log() 
});