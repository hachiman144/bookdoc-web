(function ( $ ) {
    $.fn.markAlertfy = function(options){
        var _obj = this;

        var settings = $.extend({
            type: "modal",
            alert_id: "general_mark_alert",
            alert_type: "error",
            alert_title: "Error!",
            alert_icon: "",
            cta_button: "",
            alert_message: "An error has occurred!",
            data: [],
            callback: function(){
            },
        }, options );

        switch(settings.type){
            case "single":

                _obj.append(
                        "<div id="+settings.alert_id+" class='alert mark-alert alert-"+settings.alert_type+" alert-dismissible fade show' role='alert'>"+
                            "<strong>"+settings.alert_title+"</strong> "+ settings.alert_message+
                            "<button type='button' class='mark-alert-btn-close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>"+
                        "</div>"
                    );
                settings.callback();

                break;

            case "multi":
                _obj.html("");
                $.each(settings.data, function( index, value ) {
                    var alert_id = value.alert_id || "";

                    _obj.append(
                        "<div id="+alert_id+" class='alert mark-alert alert-"+value.alert_type+" alert-dismissible fade show' role='alert'>"+
                            "<strong>"+value.alert_title+"</strong> "+ value.alert_message+
                            "<button type='button' class='mark-alert-btn-close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>"+
                        "</div>"
                    );
                });
                settings.callback();

                break;

            default:
                var icon = settings.alert_icon == "" ?
                    "/static/img/mark_alert/alertify-"+settings.alert_type+"-icon.png" :
                    settings.alert_icon;

                _obj.html("");
                _obj.html(
                    "<div class='modal fade mark-alert mark-alert-modal "+settings.alert_type+"' data-backdrop='false' id='"+settings.alert_id+"' tabindex='-1' >"+
                        "<div class='modal-dialog modal-dialog-centered modal-sm'>"+
                            "<div class='modal-content'>"+
                                "<div class='modal-body'>"+
                                    "<button type='button' class='mark-alert-btn-close' data-dismiss='modal'>"+
                                        "<span aria-hidden='true'>&times;</span>"+
                                    "</button>"+
                                    "<div class='row'>"+
                                        "<div class='col-12 mark-alert-content'>"+
                                            "<img class='mark-alert-icon' src='"+icon+"'/>"+
                                            "<label class='mark-alert-title'>"+settings.alert_title+"</label>"+
                                            "<p class='mark-alert-text'>"+settings.alert_message+"</p>"+
                                        "</div>"+
                                        "<div class='col-12 center'>"+
                                            settings.cta_button+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"
                );

                var _obj_modal = _obj.find(".modal.mark-alert-modal");

                _obj_modal.modal("show");
                _obj_modal.click(function(e){
                    $(this).modal("hide");
                });
                _obj_modal.on("hidden.bs.modal", function(){
                    settings.callback();
                });
        }
    };
}(jQuery));