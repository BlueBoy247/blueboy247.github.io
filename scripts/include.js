$(function(){
  $.get('/public/head.html', function(data) {
    $('head').append(data);
  });
  $(document).ready(function() {
    $('header').load('/public/header.html');
  });
  $(document).ready(function() {
    $('footer').load('/public/footer.html');
  });
});   