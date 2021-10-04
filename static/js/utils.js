String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return args[n];
    });
};

var urlParameterize = function(data){
    params = []
    $.each(data, function (key, value) {
        params.push(key+"="+value)
    });

    return encodeURI(params.join("&"))
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

var addMinutes = function(date, minutes) {
    // 1 SEC = 60,000 MS
    return new Date(date.getTime() + minutes*60000);
}


