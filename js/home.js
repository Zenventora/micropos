var _view_height = 0;
var _v_hght = 0;
var _scroll_top = 0;
var _bnr_strip_state = null;
var _bnr_slot_classes = ['b4_card', 'b3_card', 'b2_card', 'b1_card', 'active', 'f1_card', 'f2_card', 'f3_card', 'f4_card'];
var _bnr_reset_classes = ['active', 'b_card', 'f_card', 'f_Card', 'b1_card', 'b2_card', 'b3_card', 'b4_card', 'b5_card', 'b6_card', 'f1_card', 'f2_card', 'f3_card', 'f4_card', 'f5_card', 'f6_card'];

$(document).ready(function () {
    init_banner_strip();
    _resize_banner_section();
    _scroll_banner_section();
    window.addEventListener('scroll', _debounce_banner(_scroll_banner_section, 0, true));
    window.addEventListener('resize', _debounce_banner(_resize_banner_section, 0, true));
    $(".zcpr-prod-addon").click(function(){
        var _this = $(this);
        _this.toggleClass("active");
    });
});

$(window).on('load', function () {
    _resize_banner_section();
    _scroll_banner_section();
});

function _debounce_banner(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        var call_now = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
        if (call_now) {
            func.apply(context, args);
        }
    };
}

function _resize_banner_section() {
    _view_height = $(window).outerHeight();
    _v_hght = _view_height / 2;
    sync_banner_strip(true);
}

function _scroll_banner_section() {
    _scroll_top = $(window).scrollTop();
    if ($(window).outerWidth() > 1180) {
        _scrol_anim('brand_sec', brand_anim, 0, 1, _scroll_top);
    }
}

function init_banner_strip() {
    var $strip = $('.bnr_img_strip');
    var $cards = $strip.find('.bnr_img_card');

    if (!$strip.length || $cards.length !== _bnr_slot_classes.length) {
        return;
    }

    _bnr_strip_state = {
        $strip: $strip,
        $cards: $cards,
        slots: [],
        positions: [],
        track_length: 0,
        speed: 0.50,
        raf_id: null,
        last_frame: 0,
        is_hovered: false,
        reduce_motion: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    sync_banner_strip(true);

    if (!_bnr_strip_state.reduce_motion) {
        start_banner_strip();
    }

    $strip.on('mouseenter', function () {
        if (_bnr_strip_state) {
            _bnr_strip_state.is_hovered = true;
        }
    });

    $strip.on('mouseleave', function () {
        if (_bnr_strip_state) {
            _bnr_strip_state.is_hovered = false;
        }
    });

    document.addEventListener('visibilitychange', function () {
        if (!_bnr_strip_state) {
            return;
        }
        _bnr_strip_state.last_frame = 0;
        if (document.hidden) {
            stop_banner_strip();
        } else if (!_bnr_strip_state.reduce_motion) {
            start_banner_strip();
        }
    });
}

function sync_banner_strip(reset_positions) {
    if (!_bnr_strip_state) {
        return;
    }

    var state = _bnr_strip_state;
    var viewport_width = $(window).outerWidth();

    if (viewport_width <= 768) {
        state.speed = 0.36;
    } else if (viewport_width <= 1180) {
        state.speed = 0.44;
    } else {
        state.speed = 0.50;
    }

    stop_banner_strip();
    state.range_min = -4.5;
    state.range_max = 4.5;
    state.track_length = state.$cards.length;
    suspend_banner_strip_styles(state);
    state.$strip.removeClass('is-ready');
    reset_banner_strip_styles(state);
    apply_banner_slot_classes(state);
    capture_banner_slot_layout(state);
    state.$strip.addClass('is-ready');

    if (reset_positions || state.positions.length !== state.$cards.length) {
        state.positions = [];
        for (var i = 0; i < state.$cards.length; i++) {
            state.positions.push(i - ((state.$cards.length - 1) / 2));
        }
    }

    render_banner_strip();
    restore_banner_strip_styles(state);

    if (!state.reduce_motion && !document.hidden) {
        start_banner_strip();
    }
}

function start_banner_strip() {
    if (!_bnr_strip_state || _bnr_strip_state.raf_id) {
        return;
    }
    _bnr_strip_state.raf_id = window.requestAnimationFrame(step_banner_strip);
}

function step_banner_strip(timestamp) {
    if (!_bnr_strip_state) {
        return;
    }

    var state = _bnr_strip_state;

    if (!state.last_frame) {
        state.last_frame = timestamp;
    }

    var delta = (timestamp - state.last_frame) / 1000;
    state.last_frame = timestamp;

    if (delta > 0.05) {
        delta = 0.05;
    }

    if (!document.hidden && !state.is_hovered) {
        for (var i = 0; i < state.positions.length; i++) {
            state.positions[i] = state.positions[i] + (state.speed * delta);
            if (state.positions[i] > state.range_max) {
                state.positions[i] = state.positions[i] - state.track_length;
            }
        }
        render_banner_strip();
    }

    state.raf_id = window.requestAnimationFrame(step_banner_strip);
}

function render_banner_strip() {
    if (!_bnr_strip_state) {
        return;
    }

    var state = _bnr_strip_state;

    state.$cards.each(function (index) {
        var position = state.positions[index];
        var slot_state = get_banner_slot_state(state, position);
        this.style.transform = 'translate3d(calc(-50% + ' + slot_state.base_x.toFixed(1) + 'px), calc(-50% + ' + slot_state.base_y.toFixed(1) + 'px), 0) ' + banner_matrix_to_string(slot_state.matrix);
        this.style.opacity = slot_state.opacity.toFixed(3);
        this.style.zIndex = String(100 - Math.round(Math.abs(position) * 10));
        this.style.boxShadow = '';
    });
}

function get_banner_slot_state(state, position) {
    var lower_slot = null;
    var upper_slot = null;
    var progress = 0;

    if (position < -4) {
        lower_slot = state.ghost_left;
        upper_slot = state.slots[0];
        progress = position + 5;
    } else if (position > 4) {
        lower_slot = state.slots[state.slots.length - 1];
        upper_slot = state.ghost_right;
        progress = position - 4;
    } else {
        var normalized = position + 4;
        var lower_index = Math.max(0, Math.floor(normalized));
        var upper_index = Math.min(state.slots.length - 1, lower_index + 1);
        progress = normalized - lower_index;
        lower_slot = state.slots[lower_index];
        upper_slot = state.slots[upper_index];
    }

    return {
        base_x: interpolate_banner_value(lower_slot.base_x, upper_slot.base_x, progress),
        base_y: interpolate_banner_value(lower_slot.base_y, upper_slot.base_y, progress),
        matrix: interpolate_banner_matrix(lower_slot.matrix, upper_slot.matrix, progress),
        opacity: interpolate_banner_value(lower_slot.opacity, upper_slot.opacity, progress)
    };
}

function capture_banner_slot_layout(state) {
    var strip_rect = state.$strip[0].getBoundingClientRect();
    var strip_center_x = strip_rect.left + (strip_rect.width / 2);
    var strip_center_y = strip_rect.top + (strip_rect.height / 2);
    var slot_widths = [];

    state.slots = [];

    state.$cards.each(function () {
        var rect = this.getBoundingClientRect();
        var matrix = get_banner_matrix_array(window.getComputedStyle(this).transform);
        var slot_matrix = matrix.slice();
        var card_center_x = rect.left + (rect.width / 2) - strip_center_x;
        var card_center_y = rect.top + (rect.height / 2) - strip_center_y;

        slot_matrix[12] = 0;
        slot_matrix[13] = 0;
        slot_matrix[14] = 0;

        slot_widths.push(rect.width);
        state.slots.push({
            base_x: card_center_x,
            base_y: card_center_y,
            matrix: slot_matrix,
            opacity: 1
        });
    });

    rebalance_banner_slot_layout(state, slot_widths);

    var left_step = (state.slots[1].base_x - state.slots[0].base_x) * 1.15;
    var right_step = (state.slots[state.slots.length - 1].base_x - state.slots[state.slots.length - 2].base_x) * 1.15;

    state.ghost_left = {
        base_x: state.slots[0].base_x - left_step,
        base_y: state.slots[0].base_y,
        matrix: state.slots[0].matrix.slice(),
        opacity: 0
    };

    state.ghost_right = {
        base_x: state.slots[state.slots.length - 1].base_x + right_step,
        base_y: state.slots[state.slots.length - 1].base_y,
        matrix: state.slots[state.slots.length - 1].matrix.slice(),
        opacity: 0
    };
}

function rebalance_banner_slot_layout(state, slot_widths) {
    var slot_count = state.slots.length;

    if (slot_count < 2) {
        return;
    }

    var target_gap = parseFloat(state.$strip.css('gap')) || 25;
    var mid_index = Math.floor(slot_count / 2);
    var centered_positions = new Array(slot_count);

    centered_positions[mid_index] = 0;

    for (var forward_index = mid_index + 1; forward_index < slot_count; forward_index++) {
        centered_positions[forward_index] = centered_positions[forward_index - 1] + (slot_widths[forward_index - 1] / 2) + target_gap + (slot_widths[forward_index] / 2);
    }

    for (var backward_index = mid_index - 1; backward_index >= 0; backward_index--) {
        centered_positions[backward_index] = centered_positions[backward_index + 1] - (slot_widths[backward_index + 1] / 2) - target_gap - (slot_widths[backward_index] / 2);
    }

    for (var slot_index = 0; slot_index < slot_count; slot_index++) {
        state.slots[slot_index].base_x = centered_positions[slot_index];
    }
}

function apply_banner_slot_classes(state) {
    state.$cards.each(function (index) {
        var $card = $(this);
        $card.removeClass(_bnr_reset_classes.join(' '));
        $card.addClass(_bnr_slot_classes[index]);
    });
}

function suspend_banner_strip_styles(state) {
    state.$cards.each(function () {
        this.style.transition = 'none';
    });
}

function restore_banner_strip_styles(state) {
    window.requestAnimationFrame(function () {
        state.$cards.each(function () {
            this.style.transition = '';
        });
    });
}

function reset_banner_strip_styles(state) {
    state.$cards.each(function () {
        this.style.transform = '';
        this.style.opacity = '';
        this.style.zIndex = '';
        this.style.boxShadow = '';
    });
}

function interpolate_banner_value(start, end, progress) {
    return start + ((end - start) * progress);
}

function interpolate_banner_matrix(start, end, progress) {
    var matrix = [];

    for (var i = 0; i < start.length; i++) {
        matrix.push(interpolate_banner_value(start[i], end[i], progress));
    }

    return matrix;
}

function get_banner_matrix_array(transform_value) {
    if (!transform_value || transform_value === 'none') {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    var matrix = new DOMMatrixReadOnly(transform_value);
    return [matrix.m11, matrix.m12, matrix.m13, matrix.m14, matrix.m21, matrix.m22, matrix.m23, matrix.m24, matrix.m31, matrix.m32, matrix.m33, matrix.m34, matrix.m41, matrix.m42, matrix.m43, matrix.m44];
}

function banner_matrix_to_string(values) {
    return 'matrix3d(' + values.map(function (value) {
        return Number(value.toFixed(6));
    }).join(',') + ')';
}

function stop_banner_strip() {
    if (_bnr_strip_state && _bnr_strip_state.raf_id) {
        window.cancelAnimationFrame(_bnr_strip_state.raf_id);
        _bnr_strip_state.raf_id = null;
    }
}

function _reverse_anim(_elem, _v_hght) {
    $('.' + _elem).each(function () {
        var _this = $(this);
        var _this_top = _this.offset().top;

        if (_scroll_top + _v_hght >= _this_top) {
            _this.removeClass('active');
        } else {
            _this.addClass('active');
        }
    });
}

function _static_anim(_elem, __v_hght) {
    $('.' + _elem).each(function () {
        var _this = $(this);
        var _this_top = _this.offset().top;

        if (_scroll_top + _v_hght >= _this_top) {
            _this.removeClass(_elem).addClass(_elem + 'd');
        }
    });
}

function _scrol_anim(_crnt_elem, _call_back, _frwd_flag, _divided_flag, _current_scroll_top) {
    if (typeof _crnt_elem === 'string') {
        _crnt_elem = $('.' + _crnt_elem);
    } else if (!(_crnt_elem instanceof jQuery)) {
        _crnt_elem = $(_crnt_elem);
    }

    if (!_crnt_elem.length) {
        return;
    }

    var _crnt_elem_hgt = _crnt_elem.outerHeight();
    var _crnt_top = _crnt_elem.offset().top;
    var _start_pos = _current_scroll_top + _view_height;
    var _end_pos = _crnt_top + _crnt_elem_hgt;

    if (_crnt_top <= _start_pos && _end_pos >= _current_scroll_top) {
        var _tot_len = (_view_height + _crnt_elem_hgt) / 2;
        var _c_val = _tot_len - (_start_pos - _crnt_top);
        var _perc1 = ((_c_val / (_tot_len / 2)) * 100) / 2;
        var _perc2 = 100 - _perc1;

        if (_divided_flag === 1) {
            _perc1 = _perc1 / 2;
            _perc2 = _perc2 / 2;
        }

        var _perc_neg1 = _perc1 - (_perc1 * 2);
        var _perc_neg2 = _perc2 - (_perc2 * 2);

        if (_frwd_flag === 1) {
            if (_perc1 > 0) {
                window.requestAnimationFrame(function () {
                    _call_back(_perc1, _perc_neg1, _perc2, _perc_neg2, _crnt_elem);
                });
            }
        } else {
            window.requestAnimationFrame(function () {
                _call_back(_perc1, _perc_neg1, _perc2, _perc_neg2, _crnt_elem);
            });
        }
    }
}

function brand_anim(_perc1) {
    $('.brand_inr').css('transform', 'translateX(' + _perc1 + '%)');
}
