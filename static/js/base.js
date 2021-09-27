$(function(){
    localStorage['sidebar_state'] == "opened" ? $(".side-container").addClass("opened") : $(".side-container").removeClass("opened");

    var activenavs = ($("meta[name=activenavs").attr("content") || "").split(",");
    activenavs.forEach(function(item) { if(item.trim())$("[data-nav='"+item.trim()+"'").addClass('active')});

    $('.side-container').bind('classChange', function(e){localStorage['sidebar_state'] = $(this).hasClass("opened") ? "opened" : ""});
    $("[data-sidebar-toggler]").on("click", function(e){
        e.preventDefault();

        var _this = $(this);
        var target = _this.data("target");

        switch(_this.data("action")){
            case "open":
                $(target).addClass("opened");
                _this.addClass("opened");
                break;
            case "close":
                $(target).removeClass("opened");
                _this.removeClass("opened");
                break;
            default:
                $(target).toggleClass("opened");
                _this.toggleClass("opened");
                break;
        }

        $(target).trigger("classChange")
    });

    $("[data-scroll-detect]").scroll(function(e){
        var _this = $(this);
        var _target = _this.attr("data-target") || _this;
        var scroll_class = _this.attr("data-scroll-class") || "scrolled";
        var scrollTop = _this.scrollTop();

        _this.scrollTop() > 0 ?  $(_target).addClass(scroll_class): $(_target).removeClass(scroll_class);
    });

    $(document).on('click', 'a[href^="#"][data-smooth-scroll]', function(e) {
        e.preventDefault();
        var $id = $($(this).attr('href'));
        if ($id.length === 0) {return}

        $('.main-content').animate({scrollTop: $id.offset().top}, 500);
    });

    $(document).on("click", "[data-open-modal]", function(e){
        var _obj = $(this);
        e.preventDefault();

        var modal_target = _obj.attr("data-modal-target") || "#gen_modal";
        var size = _obj.attr("data-modal-size") || "";
        var url = _obj.attr("data-modal-url") || $(this).attr("href");
        var loader_icon = _obj.attr("data-loader-icon") || "";
        var loader_text = _obj.attr("data-loader-text") || "";

        var params = {
            url: url,
            size: size,
        }

        if(loader_icon != "") params['loader_icon'] = loader_icon;
        if(loader_text != "") params['loader_text'] = loader_text;

        $(modal_target).openModal(params);
    });

    $("[data-persist-tab]").markTabPersistencefy();


    $("#form_logout").markFormfy({
        content_type: false,
        process_data: false,
        additional_data: {},
        on_init: function(form){},
        success: function(response){
            if(response.success){
                location.href=response.redirect_url;
            }
        },
        error: function(response){},
        pre_submit: function(response){}
    });
});

(function( $ ) {
    $.fn.toggleProp = function(key){
        $(this).prop(key) ? $(this).prop(key, false) : $(this).prop(key, true);
    }

    $.fn.removeProp = function(key){
        if($(this).prop(key)) $(this).prop(key, false);
    }

    $.fn.addProp = function(key){
        if(!$(this).prop(key)) $(this).prop(key, true);
    }
}(jQuery));

(function( $ ) {
    $.fn.markTabPersistencefy = function(options){
        var _obj = this;

        var settings = $.extend({
            group: _obj.attr("data-tab-group") || "",
            default_tab: "",
            _navs: _obj.find("[data-toggle='tab']") || undefined,
            _tabs: undefined,
        }, options);

        var group = settings.group;

        if(group != ""){
            settings._tabs = $("[data-persist-tab-group='"+group+"']")

            if(settings.default_tab != "")
                localStorage[group] = settings.default_tab;

            var active_tab = localStorage[group] || "";

            if(active_tab != ""){
                settings._navs.removeClass("active show");
                settings._tabs.find(".tab-pane").removeClass("active show");
                _obj.find("[data-toggle='tab'][href='"+active_tab+"']").addClass("active show");
                settings._tabs.find(".tab-pane"+active_tab).addClass("active show");
            }
        }

        settings._navs.on("click", function(e){
            e.preventDefault();
            localStorage[settings.group] = $(this).attr("href");
        });
    }
}(jQuery));

(function ( $ ) {
    $.fn.openModal = function(options){
        var _modal = this;
        var _modal_dialog = _modal.find("#modal_dialog");
        var _modal_content = _modal.find(".modal-content");


        var settings = $.extend({
            url: "",
            size: "",
            centered: true,
            show_loading: true,
            loader_icon: "",
            loader_text: "",
        }, options );

        if(settings.url != ""){
            var dialog_class = "modal-dialog "+settings.size;

            if(settings.centered)
                dialog_class += " modal-dialog-centered";

            if(settings.show_loading){
                var params = {}

                if(settings.loader_icon != "") params['loader_icon'] = settings.loader_icon;
                if(settings.loader_text != "") params['loader_text'] = settings.loader_text;

                _modal_content.showLoading(params);
            }


            _modal_dialog.attr("class", dialog_class);
            _modal.modal({backdrop: 'static', keyboard: false}, "show");
            _modal_content.load(settings.url);
        }

        _modal.on('hidden.bs.modal', function () {
            _modal_content.html("");
            _modal.unbind();
        });
    }
}(jQuery));

(function ( $ ) {
    $.fn.loadSubpage = function(options){
        var _obj = this;

        var settings = $.extend({
            url: "",
            show_loading: true,
            pre_load: function(elem){},
            callback: function(){},
            loader_icon: "",
            loader_text: "",
        }, options );

        if(settings.url != ""){

            if(settings.show_loading){
                var params = {}

                if(settings.loader_icon != "") params['loader_icon'] = settings.loader_icon;
                if(settings.loader_text != "") params['loader_text'] = settings.loader_text;

                _obj.showLoading(params);
            }

            settings.pre_load(_obj);

            _obj.load(settings.url);
        }

        settings.callback();
    };
}(jQuery));

(function( $ ) {
    $.fn.validateEmailField = function(options){
        var _obj = this;
        var _parent = _obj.parent();

        var settings = $.extend({
            status_cont: "",
            url: "",
            csrf_token: "",
            callback: function(){},
            available_class: "available",
            unavailable_class: "unavailable",
            invalid_class: "invalid",
            msg_on_available: false,
            msg_loading: "",
            msg_available: "",
            msg_unavailable: "",
            msg_invalid: "",
        }, options );

        _obj.css("flex", 1);

        var _status_container = settings.status_cont != "" ? $(settings.status_cont) : _parent;

        var checking = "<span class='validity-status-txt'><i class='fas fa-spinner fa-spin fa-fw ml5'></i> "+settings.msg_loading+"</span>";
        var available = "<span class='validity-status-txt'><i class='far fa-check-circle fa-fw ml5'></i> "+settings.msg_available+"</span>";
        var not_available = "<span class='validity-status-txt'><i class='far fa-times-circle fa-fw ml5'></i> "+settings.msg_unavailable+"</span>";
        var not_email = "<span class='validity-status-txt'><i class='far fa-times-circle fa-fw ml5'></i> "+settings.msg_invalid+"</span>";

        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

        _obj.on("input", debounced(200, function(e){
            var email = _obj.val().trim();

            _status_container.find(".validity-status-txt").remove();
            _obj.removeClass(function (index, className) {
                return (className.match (/(^|\s)validated-field-\S+/g) || []).join(' ');
            });

            if(email.length > 2){

                if(!pattern.test(email)){
                    _status_container.append(not_email);
                    _obj.get(0).setCustomValidity("Invalid email format.");
                    _obj.addClass("validated-field-"+settings.invalid_class);
                }
                else{
                    _obj.get(0).setCustomValidity("");

                    if(settings.url != ""){
                        _status_container.append(checking);

                        $.ajax({
                            type: "POST",
                            url: settings.url,
                            headers: {
                                "X-CSRFToken": settings.csrf_token
                            },
                            data: {
                                "email": email
                            },
                            dataType: 'json',
                            success: function(response){
                                _status_container.find(".validity-status-txt").remove();

                                if(response.availability){
                                    _obj.addClass("validated-email-"+settings.available_class);
                                    _status_container.append(available);
                                }
                                else{
                                    _obj.addClass("validated-email-"+settings.unavailable_class);
                                    _status_container.append(not_available);
                                }
                            },
                        });
                    } else {
                        _obj.addClass("validated-email-"+settings.available_class);
                        if(settings.msg_on_available){
                            _status_container.append(available);
                        }
                    }
                }
            }
            else{
                _obj.get(0).setCustomValidity("");
            }
        }));
    };
}(jQuery));

(function ( $ ) {
    $.fn.markFormfy = function(options){
        var _form = this;
        var _form_copy = _form.html();

        var settings = $.extend({
            type: _form.attr("method") || "POST",
            url: _form.attr("action"),
            additional_data: {},
            data_type: "json",
            headers: {},
            cache: false,
            content_type: "application/x-www-form-urlencoded; charset=UTF-8",
            process_data: true,
            success: function(response, form){ console.log(response, "success") },
            error: function(response, form){ console.log(response, "error") },
            show_loading: true,
            loader_icon: "<img src='/static/img/loader.svg' style='width: 44px;'/>",
            loader_text: "Currently processing request, please wait a sec...",
            pre_submit: function(response){},
            post_submit: function(){},
            on_reset:function(form){},
            on_init:function(form){},
        }, options );

        _form.init = function(){
            var loader =
                "<div style='display:flex; align-items:center; height:100%; padding:3em;'>"+
                    "<div style='width:100%; text-align:center; display:inline-block;'>"+
                        "<div style='color:#676767; font-size:14px;'>"+
                            settings.loader_icon+
                        "</div>"+
                        "<div style='color:#9a9a9a; font-size:12px;'>"+settings.loader_text+"</div>"+
                    "</div>"+
                "</div>";

            _form.html(
                "<span id='form_loader' style='display:none' ></span>"+
                "<span id='form_content' ></span>"
            );

            var _form_loader = _form.find("#form_loader");
            var _form_content = _form.find("#form_content");

            _form_loader.html(loader);
            _form_content.html(_form_copy);

            settings.on_init(_form);
            _form.unbind();

            _form.submit(function(e){
                e.preventDefault();
                var form_data = new FormData(_form[0]);

                $.each(settings.additional_data, function(key, value){
                    form_data.append(key, value);
                });

                if(settings.show_loading){
                    _form_loader.show();
                    _form_content.hide();
                }

                $.ajax({
                    type: settings.type,
                    url: settings.url,
                    data: form_data,
                    headers: settings.headers,
                    dataType: settings.data_type,
                    cache: settings.cache,
                    contentType: settings.content_type,
                    processData: settings.process_data,
                    beforeSend: function(){settings.pre_submit()},
                    success: function(response){settings.success(response, _form)},
                    error: function(response){settings.error(response, _form)},
                    complete: function(){
                        settings.post_submit();

                        if(settings.show_loading){
                            _form_loader.hide();
                            _form_content.show();
                        }
                    },
                });
            });

            _form.on("reset", function(e){
                _form.find("input, textarea, select").val(null).change();
                _form.find("input, textarea, select").trigger("input");
                settings.on_reset(_form);
            });
        }

        _form.init();
    };
}(jQuery));

(function ( $ ) {
    $.fn.showLoading = function(options){
        var _obj = this;

        var settings = $.extend({
            loader_icon: "<img src='/static/img/loader.svg' style='width: 34px;'/>",
            loader_text: "Currently loading content, please wait a sec...",
        }, options );

        var loader =
            "<div style='display:flex; align-items:center; height:100%; padding:3em;width:100%;'>"+
                "<div style='width:100%; text-align:center; display:inline-block;'>"+
                    "<div style='color:#676767; font-size:14px;'>"+
                        settings.loader_icon+
                    "</div>"+
                    "<div style='color:#9a9a9a; margin-top:15px;'>"+settings.loader_text+"</div>"+
                "</div>"+
            "</div>";

         _obj.html(loader);
    }
}(jQuery));