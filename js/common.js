var _body = $("body");
//Lyte lazy loading code
var zlyte_lazy_elem, zlyte_lazy_bg_elem;
function z_lyte_lazy(){
	var zlyte_lazy = $(".zlyte_lazy"),
	    zlyte_lazy_bg = $(".zlyte_lazy_bg"),
        zlyte_lazy_lnth = zlyte_lazy.length,
        zlyte_lazy_bg_lnth = zlyte_lazy_bg.length;
	if(("IntersectionObserver" in window)||("FileReader" in window)){
		var v_height = $(window).height();
		if(zlyte_lazy_lnth > 0){
			zlyte_lazy_elem = $L.lazyload({
				selector : '.zlyte_lazy',
				threshold: v_height,
				removeOnEnter: true,
				cancelOnExit: false,
				afterLoading: zlyte_loaded
			});
		}
		if(zlyte_lazy_bg_lnth > 0){
			zlyte_lazy_bg_elem = $L.lazyload({
				selector : '.zlyte_lazy_bg',
				threshold: v_height,
				removeOnEnter: true,
				cancelOnExit: false,
                enteredClass: 'bg_lazy_loaded'
			});
		}
		function zlyte_loaded(element) {
            if($(element).prop("nodeName") == 'VIDEO' || $(element).prop("nodeName") == 'video') {
                _vid_poster(element);
            }
			$(element).removeClass('zlyte_loading');
		}
	}
	else{
		if(zlyte_lazy_lnth > 0 || zlyte_lazy_bg_lnth > 0){
            if(zlyte_lazy_bg_lnth > 0){
                zlyte_lazy_bg.each(function() {
                    $(this).addClass("zlyte_lazy").removeClass("zlyte_lazy_bg");
                });
            }
            _fall_back();
            window.addEventListener('scroll', _debounce(_fall_back, 15, true));
            window.addEventListener('resize', _debounce(_fall_back, 15, true));
        }
	}
	//Lyte lazy loading code
}
function update_img_all(){
    $L.lazyload( "loadAll", zlyte_lazy_elem );
}
function update_bg_all(){
    $L.lazyload( "loadAll", zlyte_lazy_bg_elem );
}
function _fall_back(){
    var v_hght = $(window).outerHeight();
    v_hght = _v_hght * 2;
    _cmn_scrl_lazy("zlyte_lazy", v_hght);
}
function _debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		}, wait);
		if (callNow) func.apply(context, args);
	}
}
// custom lazy for img, background image, object, picture, video, audio and iframe
function _cmn_scrl_lazy(_selector_elem, v_hght) {
    var _cmn_lazy = $("."+_selector_elem),
        scroll_top = $(window).scrollTop();
        scroll_bottom = scroll_top + v_hght;
    _cmn_lazy.each(function () {
        var _dis = $(this),
            _dis_top = _dis.offset().top;
        if (_dis_top < scroll_bottom) {
            _dis.removeClass(_selector_elem);
            var cur_node = _dis.prop("nodeName").toLowerCase();
            if (cur_node == 'img') {
                var cur_parent = _dis.parent().prop("nodeName").toLowerCase();
                if (cur_parent == 'picture') {
                    var _webp = _dis.siblings(".webp"),
                        _other_format = _dis.siblings(".other_format");
                    _webp.attr('srcset', _webp.attr('data-srcset')).removeAttr('data-srcset');
                    _other_format.attr('srcset', _other_format.attr('data-srcset')).removeAttr('data-srcset');
                    _dis.attr('src', _dis.attr('data-src')).removeAttr('data-src');
                }
                else{
                    _dis.attr('src', _dis.attr('data-src')).removeAttr('data-src');
                }
            } 
            else if (cur_node == 'object') {
                _dis.attr('data', _dis.attr('data-src')).removeAttr('data-src');
            }
            else if(cur_node == 'video') {
                _vid_poster(_dis);
                var _src = _dis.children("source");
                _src.attr('src', _src.attr('data-src')).removeAttr('data-src');
            }
            else if(cur_node == 'audio') {
                var _src = _dis.children("source");
                _src.attr('src', _src.attr('data-src')).removeAttr('data-src');
            }
            else if(cur_node == 'iframe') {
                _dis.attr('src', _dis.attr('data-src')).removeAttr('data-src');
            }
            else{
                _dis.addClass("bg_lazy_loaded");
            }
            _dis.removeClass("zlyte_loading").addClass("zlyte_loaded");
        }
    });
}
//custom lazy end
//webp check start
function _webp_check() {
    var elem = document.createElement('canvas'), _webp_class = "";
    if (!!(elem.getContext && elem.getContext('2d'))) {
       elem.toDataURL('image/webp').indexOf('data:image/webp') == 0?_webp_class = "s_webp":_webp_class = "n_webp";;
    }
    _body.addClass(_webp_class);
}
//webp check end
// video poster lazy start
function _vid_poster(_dis){
    var _poster_src;
    if(_body.hasClass("s_webp")){
        _poster_src = $(_dis).data("wposter");
    }
    else{
        _poster_src = $(_dis).data("sposter");
    }
    $(_dis).attr('poster', _poster_src).removeAttr('data-sposter data-wposter');
}
// video poster lazy end
$(window).on("load", function () {
    z_lyte_lazy();
});
//lazy end
