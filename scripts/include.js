function include(pagename,en){
  $.get('/public/head.html', function(data) {
    $('head').append(data);
  });
  $(document).ready(function() {
    $('footer').load('/public/footer.html');
  });

  if(pagename!=='Index'){
    //$('head').append(`<link rel="preload" href="/pictures/title_bg.png" as="image"></link>`);
    if (en){
      $('head').append(`<base href="/en/">`);
      $(document).ready(function() {
        $('header').load('/public/header-en.html');
      });
    }else{
      $(document).ready(function() {
        $('header').load('/public/header.html');
      });
    }
    if(pagename!=='Post'){
      $('head').append(`<title>${pagename} | BlueBoy's Space</title>`);
    }
    $('head').append(`<link rel="stylesheet" href="/styles/main.css"><!-- media="screen and (min-width: 992px)"-->`);
    //$('head').append(`<link rel="stylesheet" href="/styles/main-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
  }
  if (pagename==='Blog' || pagename==='Post'){
    if (en){
      var path='-en';
    }else{
      var path=''
    }
    $('head').append(`<script src="/scripts/posting${path}.js"></script>`);
  }
  if (pagename==='About' || pagename==='Blog'){
    let cssname=pagename.toLowerCase()
    $('head').append(`<link rel="stylesheet" href="/styles/${cssname}.css"><!-- media="screen and (min-width: 992px)"-->`);
    //$('head').append(`<link rel="stylesheet" href="/styles/${cssname}-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
  }
  if (pagename==='Project'){
    $('head').append(`<link rel="stylesheet" href="/styles/about.css"><!-- media="screen and (min-width: 992px)"-->`);
  }
}

