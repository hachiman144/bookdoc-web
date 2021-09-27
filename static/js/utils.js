String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return args[n];
    });
};

String.prototype.generateRandom = function () {
    var _this = this;

    var today = new Date();
    var date = "{0}{1}{2}".format(today.getFullYear(), (today.getMonth()+1), today.getDate());
    var time = "{0}{1}{2}".format(today.getHours(), today.getMinutes(), today.getSeconds());
    var m = window.performance.now();


    var full = parseFloat("{0}{1}{2}{3}".format(_this, date, time, m)).toString(36);
    return full.replace(".", "");
};

String.prototype.moneyFormat = function(options){
    var value = this;

    var settings = $.extend({prefix: "", suffix: ""}, options)

    if(value != ""){
        values = String(value).split(".");
        whole_num = values[0];
        decimal_num = values.length > 1 ? '.' + values[1] : '.00';

        value = whole_num.replace(/(?![.-])[\D.]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return settings.prefix+value+decimal_num+settings.suffix;
    }

    return 0.00;
}

var urlParameterize = function(data){
    params = []
    $.each(data, function (key, value) {
        params.push(key+"="+value)
    });

    return encodeURI(params.join("&"))
}

var setUrlParams = function(params){
    window.history.replaceState(null, null, "?"+params);
}

var debounced = function(delay, fn) {
    let timerId;

    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
}

var randomColor = function(format="rgb"){
    var rint = Math.floor( 0x100000000 * Math.random());

    switch( format ){
        case 'hex':
            return '#' + ('00000'   + rint.toString(16)).slice(-6).toUpperCase();
        case 'hexa':
            return '#' + ('0000000' + rint.toString(16)).slice(-8).toUpperCase();
        case 'rgb':
            return 'rgb('  + (rint & 255) + ',' + (rint >> 8 & 255) + ',' + (rint >> 16 & 255) + ')';
        case 'rgba':
            return 'rgba(' + (rint & 255) + ',' + (rint >> 8 & 255) + ',' + (rint >> 16 & 255) + ',' + (rint >> 24 & 255)/255 + ')';
        default:
            return rint;
    }
}
var generateCode = function(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}