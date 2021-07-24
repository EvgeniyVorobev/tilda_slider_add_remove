$(function () {
    var delete_tag = '<svg class="delete_slide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 80 80" style="enable-background:new 0 0 80 80;" xml:space="preserve" width="25" height="25">\n' +
        '<g>\n' +
        '\t<polygon style="fill:#F78F8F;" points="40,49.007 15.714,73.293 6.707,64.286 30.993,40 6.707,15.714 15.714,6.707 40,30.993    64.286,6.707 73.293,15.714 49.007,40 73.293,64.286 64.286,73.293  "/>\n' +
        '\t<path style="fill:#C74343;" d="M15.714,7.414l23.578,23.578L40,31.7l0.707-0.707L64.286,7.414l8.3,8.3L49.007,39.293L48.3,40   l0.707,0.707l23.578,23.579l-8.3,8.3L40.707,49.007L40,48.3l-0.707,0.707L15.714,72.586l-8.3-8.3l23.579-23.579L31.7,40   l-0.707-0.707L7.414,15.714L15.714,7.414 M64.286,6L40,30.286L15.714,6L6,15.714L30.286,40L6,64.286L15.714,74L40,49.714L64.286,74   L74,64.286L49.714,40L74,15.714L64.286,6L64.286,6z"/>\n' +
        '</g>\n' +
        '</svg>';

    window.$selected_slider;
    window.$element_clicked;
    window.$lastSlide;

    $('.slick_slider_1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        nextArrow: `<div class="right">
            <svg style="display: block" viewBox="0 0 9.3 17" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>Right</desc>
                <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1"
                          points="0.5,0.5 8.5,8.5 0.5,16.5"></polyline>
            </svg>
        </div>`,
        prevArrow: `<div class="left">
            <svg style="display: block" viewBox="0 0 9.3 17" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>Left</desc>
                <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1"
                          points="0.5,0.5 8.5,8.5 0.5,16.5"></polyline>
            </svg>
        </div>`
    }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });

    $('.add_img').on('click', function (e) {
        $element_clicked = $(e.target);
        $('#slider_upload').click();
    });

    /* Load file to slider */
    window.loadFile = function (e) {
        // слайдер с которым сейчас работаем
        $selected_slider = $element_clicked.parents('.slick-slider');
        // url загруженной фото в хранилище браузера
        console.log('e.target.files[0] ', e.target.files[0]);
        if (e.target.files[0] != undefined) {
            var file_url = URL.createObjectURL(e.target.files[0]);
            // добавление слайда в слайдер.
            $selected_slider.slick('slickAdd', '<img class="img_original" src="' + file_url + '">', '0');
            // номер последнего добавленно слайда
            lastSlide = $selected_slider.find('.slick-slide').not('.slick-cloned').last().data().slickIndex;
            console.log(lastSlide);
            // перемотка к добавленному слайду.
            $selected_slider.slick('slickGoTo', lastSlide)
            addHover();
        }
    }

    /* Hover on image functions */
    function addHover() {
        $('.slick-track img.img_original').off();
        $('.slick-track img.img_original').hover(hoverIn, hoverOut);
    }

    function hoverIn(e) {
        $('img.img_original.slick-slide.slick-current.slick-active').addClass('hovered');
        // добавляем тег удаления слайда
        if (!$('.delete_slide').is('.delete_slide')) {
            $('.slick-list').append(delete_tag);
            $('.delete_slide').on('click', function () {
                deleteSlide();
            })
        }
        $('.delete_slide').show();
        let $target = $(e.target);
        console.log("Зашел", $target)
    }

    function hoverOut(e) {
        let $target = $(e.target);
        let $targetOut = $(document.elementFromPoint(e.pageX, e.pageY));
        if ($targetOut.is('.delete_slide')) {
            return false;
        } else {
            $('img.img_original.slick-slide.slick-current.slick-active').removeClass('hovered');
            $('.delete_slide').hide();
        }
    }

    function deleteSlide() {
        var current_slide_index = $selected_slider.find('.slick-active').not('.slick-cloned').data('slick-index');
        console.log('current_slide_index',current_slide_index)
        $selected_slider.slick('slickRemove',current_slide_index);
        $('.delete_slide').hide();
    }


})