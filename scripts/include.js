$(function(){
    $.get('/public/head.html', function(data) {
      $('head').append(data);
    });
    $.get('/public/header.html', function(data) {
      data = data.replace(/>[\n\t ]+</g, "><");
      $('header').append(data);
    });
    $.get('/public/footer.html', function(data) {
      data = data.replace(/>[\n\t ]+</g, "><");
      $('footer').append(data);
    });
});   