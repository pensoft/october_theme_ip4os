var viewed = false;

var width = window.innerWidth;

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};

window.addEventListener('scroll', function (e) {
    var headernavbar = document.getElementById("headernavbar");
    if (window.scrollY > headernavbar.offsetHeight){
        var headerNavbarNav = document.querySelector('#headerNavbarNav')
        headernavbar.classList.add('scrolled');
    }else{
        headernavbar.classList.remove('scrolled');
    }
});



$(document).ready(function() {
    // $("nav").removeClass("no-transition");
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}

	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    if (width < 992) { // mobile
        $('#menuToggle input[type="checkbox"]').change(function(){
            var checked = $(this).is(":checked");
            if(checked){
                $('#menu').show("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('#menu').css({
                    'visibility': 'visible'
                });
                $('body', 'html').css({
                    'overflow': 'hidden'
                });
            }else{
                $('#menu').hide("slide", { direction: "right" }, 400);
                $('#search').hide();
                $('body', 'html').css({
                    'overflow': 'auto'
                });
            }
        });
    }


    $('body').on('click', '.work_packages .accordion-toggle, .partner_description .accordion-toggle, .getinvolved_form_accordion .accordion-toggle', function () {
        if ($(this).next(".accordion-content").is(':visible')) {
            $(this).next(".accordion-content").slideUp(300);
            $(this).children().find(".plusminus").text('+');
            $(this).children(".plusminus").html('<span class="plus"></span>');
        } else {
            $(this).next(".accordion-content").slideDown(300);
            $(this).children().find(".plusminus").text('-');
            $(this).children(".plusminus").html('<span class="minus"></span>');
        }
    });


    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    $("nav").removeClass("no-transition");

    if (window.location.hash) {
        var link = window.location.hash;
        var anchorId = link.substr(link.indexOf("#") + 1);
        if($("#"+anchorId).offset()){
            $('html, body').animate({
                scrollTop: $("#"+anchorId).offset().top - 150
            }, 500);
        }else{
            $('.accordion-border').each(function(){
                var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                var toggler = $(this).find(".accordion-toggle");
                if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                    $('html, body').animate({
                        scrollTop: toggler.parent().offset().top - 150
                    }, 500);
                    toggler.trigger( "click" );
                }
            });
        }
    }

    $('.dropdown a').click(function(event) {

        if (location.href.indexOf("#") != -1) {
            var link = $(this).attr('href');
            var anchorId = link.substr(link.indexOf("#") + 1);
            if($("#"+anchorId).length>0){
                $('html, body').animate({
                    scrollTop: $("#"+anchorId).offset().top - 150
                }, 500);
            }else{
                // event.preventDefault();
                $("path[title='"+anchorId.toUpperCase()+"']").addClass('active_path');

                $('.accordion-border').each(function(){
                    var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                    var toggler = $(this).find(".accordion-toggle");
                    if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                        $('html, body').animate({
                            scrollTop: toggler.parent().offset().top - 150
                        }, 500);
                        toggler.trigger( "click" );
                        event.preventDefault();
                    }
                });
            }
        }
    });


	$('.subscribe-items a').attr('data-aos', 'fade-up');
	$('.about_impact ul li').attr('data-aos', 'fade-up');
	$('.about h1.display-1').attr('data-aos', 'fade-up');
	$('h2.underline').attr('data-aos', 'fade-up');
	$('.btn.btn-primary').attr('data-aos', 'zoom-in');
	$('.read_more').attr('data-aos', 'zoom-in');
	$('.library-item').attr('data-aos', 'fade-up');
	$('.entry_item').attr('data-aos', 'fade-up');
	$('.profile-item').attr('data-aos', 'fade-up');
    $('#work-packages').attr('data-aos', 'fade-up');
    $('.work-packages .accordion-border').attr('data-aos', 'fade-up');


    /* News highlights carousel **/
    $('.news-carousel').slick({
        autoplay: false,
        // autoplaySpeed: 2000,
        draggable: true,
        // pauseOnHover: true,
        centerMode: false,
        variableWidth: true,
        infinite: true,
        slidesToShow: 3,
        speed: 1000,
        centerPadding: '4%',
        slidesToScroll: 1,
        // centerPadding: '40px',
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    centerPadding: '2%',
                    slidesToShow: 1
                }
            }
        ]
    });


    $('.events_tabs, .resources_tabs').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');
        var speed = "fast";
        var activeTab = $(location.hash);
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

        if($(this).parent().parent().parent().hasClass('videos')){
            $active.addClass('active');
        }

        if($(this).parent().parent().parent().hasClass('resources')){
            $('.resources_tabs li').each(function(){
                $(this).removeClass('active');
            });
            $active.parent().addClass('active');
        }

        if($(this).parent().parent().parent().hasClass('events')){
            $active.addClass('active');
        }

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        if(activeTab.length){
            $content.slideDown(speed);
            //scroll to element
            $('html, body').animate({
                scrollTop:  activeTab.offset().top - $('header').height()
            }, speed);
        }

        // Bind the click event handler
        $(this).find("a").click(function (e) {
            if($(this).hasClass('active')) {
                $content.slideDown({
                    scrollTop: $content.offset().top - $('header').height()
                }, speed);
                var screenSize = getScreenSize();
                if (screenSize.width < 800) {
                    // scroll to element
                    $('html, body').animate({
                        scrollTop: $content.offset().top - $('header').height() + 300  // mobile
                    }, speed);
                }else{
                    //scroll to element icons top
                    $('html, body').animate({
                        scrollTop:  $content.offset().top - $('header').height() + 300
                    }, speed);
                }
                e.preventDefault();
                return false;
            }
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            location.hash = $active[0].hash;

            // Make the tab active.
            $active.addClass('active');
            $content.slideDown({
                scrollTop: $content.offset().top - $('header').height()
            }, speed);

            // Prevent the anchor\'s default click action
            e.preventDefault();
        });
    });


    $(".readmore-link").text("Read more");
    $(".readmore-link").click( function(e) {
        // record if our text is expanded
        var isExpanded =  $(e.target).hasClass("expand");

        //close all open paragraphs
        $(".readmore.expand").removeClass("expand");
        $(".readmore-link.expand").removeClass("expand");
        $(".readmore-link").text("Read more");

        // if target wasn't expand, then expand it
        if (!isExpanded){
            $( e.target ).parent( ".readmore" ).addClass( "expand" );
            $(e.target).addClass("expand");
            $(".readmore-link").text("Read less");
        }
    });
});


function elementScrolled(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    if($(elem).offset()){
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }

}

$(window).scroll(function(){
    // This is then function used to detect if the element is scrolled into view
    if(elementScrolled('.graphic_svg path')) {
        $('.graphic_svg').addClass('scrolled');
    }else{
        $('.graphic_svg').removeClass('scrolled');
    }
});



function expandBiography(el){
    $el = $(el) // read-more link
    $body  = $el.parent().parent().find('.body');
    if($body.is(':visible')){
        $body.slideUp(300);
        $el.addClass('expanded');
    }else{
        $body.slideDown(300);
        $el.removeClass('expanded');
    }
}

function goToPage(url){
    window.location.href = url;
}

function expandReadMore(el){
    var $el, $ps, $up, totalHeight;

    totalHeight = 115;

    $el = $(el) // read-more link

    $up  = $el.parent(); // coordinator_info

    if ($el.text() == "Read more") {

        $ps = $up.find("p:not('.read-more')");

        // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
        $ps.each(function() {
            totalHeight += $(this).outerHeight();
        });

        $up.addClass('changed');

        $el.css({
            top: totalHeight - 120
        });
        // $el.html('<a class="revert" href="" onclick="revertChanges(this);">Read less</a>');

        $up.css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": $up.height(),
            "max-height": 9999,
        })
            .animate({
                "height": totalHeight
            });

        //Stuff to do when btn is in the read more state
        $el.html("Read less");
        // $up.slideDown();
    } else {

        $up.removeClass('changed');

        $el.css({
            top: 53
        });
        // $el.html('<a class="revert" href="" onclick="revertChanges(this);">Read less</a>');

        $up.css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": $up.height(),
            "max-height": 460,
        })
            .animate({
                "height": totalHeight
            });
        //Stuff to do when btn is in the read less state
        $el.html("Read more");

        $('html, body').animate({
            scrollTop:  $up.offset().top - $('header').height() - 300
        });
    }
    return false;
}

function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}


function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
	// $('.navbar a.p-search').css('visibility', 'hidden');
	// $('#menu li').hide();
	// $('nav a:not(.navbar-brand)').hide();
}

function hideSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').hide();
    $('.navbar a.p-search').css('visibility', 'visible');
	// $('#menu li').show();
    // $('nav a').show();
}

function requestFormLibrary() {
	$('#mylibraryForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function expand(el, label){
    var link = $(el);
    link.parent().parent().find('.toogle-' +  label).slideToggle('slow', function() {
        if ($(this).is(':visible')) {
            link.text('View less');
            link.parent().parent().find('.hide-' +  label).hide();
        } else {
            link.text('View all');
            link.parent().parent().find('.hide-' +  label).show();
        }
    });
}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	if($(elem).height()){
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	return;

}



function scrollDown(){
	var element = $('#layout-content');
	$("html, body").animate({ scrollTop: element.offset().top - 190 }, 500);
}


function hideMe(elem){
    $(elem).parent().hide();
}


function getScreenSize() {
    var myHeight = 0;
    var myWidth = 0;
    if (window.innerWidth && window.innerHeight) {
        // Netscape & Mozilla
        myHeight = window.innerHeight;
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        // IE > 6
        myHeight = document.documentElement.clientHeight;
        myWidth = document.documentElement.clientWidth;
    } else if (document.body.offsetWidth && document.body.offsetHeight) {
        // IE = 6
        myHeight = document.body.offsetHeight;
        myWidth = document.body.offsetWidth;
    } else if (document.body.clientWidth && document.body.clientHeight) {
        // IE < 6
        myHeight = document.body.clientHeight;
        myWidth = document.body.clientWidth;
    }

    return {'width': myWidth, 'height': myHeight};
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev"/>',
                    nextArrow: '<i class="slick-next"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev"/>',
                    nextArrow: '<i class="slick-next"/>',
                });
            }
        }
		requestFormLibrary()
		// requestFormPartners()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

function scrollToField(errors){
    $(".get_involved_form input, .get_involved_form select, .get_involved_form .row").removeClass('red_err_field');
    $.each(errors.scroll_to_field, function(key,valueObj){
        $("#"+key).addClass('red_err_field');
        $('html, body').animate({
            scrollTop: $("#"+key).offset().top - 200
        }, 1000);
        return false; // breaks
    });
}

init()
