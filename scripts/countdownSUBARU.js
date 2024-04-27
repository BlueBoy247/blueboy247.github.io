(function(d, s, id) {
    let js, pjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://www.tickcounter.com/static/js/loader.js";
    pjs.parentNode.insertBefore(js, pjs);
}(document, "script", "tickcounter-sdk"));