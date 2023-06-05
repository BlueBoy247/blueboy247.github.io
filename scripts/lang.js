function language(lang){
    if (lang==undefined){
        if (location.hash){
            lang=location.hash.split('#')[1];
        }else{
            lang='zh';
        };
    };
    var id=0;
    if (lang=='en'){
        location.hash="#en";
        id=document.getElementById('langbt');
        id.setAttribute('title',"語言：中文");
        id.setAttribute('onclick',"language('zh');");
        id=document.getElementById('siteinfobt');
        id.href="/en/about/site.html";
        id.setAttribute('title',"About Site");
        id=document.getElementById('in-link-button');
        id.setAttribute('style',"display: none;");
        id=document.getElementById('in-link-button-en');
        id.setAttribute('style',"display: block;");
    }else if (lang=='zh'){
        location.hash="#zh";
        id=document.getElementById('langbt');
        id.setAttribute('title',"Language: English");
        id.setAttribute('onclick',"language('en');");
        id=document.getElementById('siteinfobt');
        id.href="/about/site.html";
        id.setAttribute('title',"本站資訊");
        id=document.getElementById('in-link-button');
        id.setAttribute('style',"display: block;");
        id=document.getElementById('in-link-button-en');
        id.setAttribute('style',"display: none;");
    };
};