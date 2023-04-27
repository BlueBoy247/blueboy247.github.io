function include(pagename){
  $.get('/public/head.html', function(data) {
    $('head').append(data);
  });
  $(document).ready(function() {
    $('footer').load('/public/footer.html');
  });

  if(pagename==='Index'){
    $('head').append(`<title>BlueBoy's Space</title>`);
    $('head').append(`<link rel="stylesheet" href="/styles/index.css" media="screen and (min-width: 992px)">`);
    $('head').append(`<link rel="stylesheet" href="/styles/index-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
    $('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />`);
  }else{
    $(document).ready(function() {
      $('header').load('/public/header.html');
    });
    $('head').append(`<title>${pagename} | BlueBoy's Space</title>`);
    $('head').append(`<link rel="stylesheet" href="/styles/main.css" media="screen and (min-width: 992px)">`);
    $('head').append(`<link rel="stylesheet" href="/styles/main-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
  }

  if (pagename==='About' || pagename==='Contact'){
    let cssname=pagename.toLowerCase()
    $('head').append(`<link rel="stylesheet" href="/styles/${cssname}.css" media="screen and (min-width: 992px)">`);
    $('head').append(`<link rel="stylesheet" href="/styles/${cssname}-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
  }
}

function listPostsPage(){
  let page=0;
  let postNum=15;
  $.ajax({
    url: '/blog/postlist.txt',
    async: false,
    success: function(data){
      page = Math.ceil((data.split('\n').length - 1) / postNum);
    }
  });
  listPostsBlock(0,postNum);
  for (let i=0; i<page; i++) {
    $('#pagenum').append(`<li onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});">${i+1}</li>`);
  }
}

function listPostsBlock(startNum,endNum){
  let fileList = [];
  $.ajax({
    url: '/blog/postlist.txt',
    async: false,
    success: function(data){
      fileList = data.split('\r\n');
    }
  });
  console.log(fileList);
  if (fileList[0]==''){
    $('#post').prepend(`<p style="text-align: center; font-size: 25px;">目前沒有文章......</p>`);
  }
  for (let i=startNum; i<startNum+endNum && i<fileList.length; i++) {
    let postName=fileList[i];
    let postUrl=`/blog/posts/${postName}`;
    $.ajax({
      url: `/blog/posts/${postName}/index.txt`,
      async: false,
      success: function(post){
        let content = post.split('\n');
        let time = content[0];
        let posttitle = content[1];
        $('#postblock').append(`<li><span class="time enw3">${time} </span><a href="${postUrl}" class="posttitle zhw">${posttitle}</a></li>`);
      }
    });
  }
}
