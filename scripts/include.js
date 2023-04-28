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
    if(pagename!=='Post'){
      $('head').append(`<title>${pagename} | BlueBoy's Space</title>`);
    }
    $('head').append(`<link rel="stylesheet" href="/styles/main.css" media="screen and (min-width: 992px)">`);
    $('head').append(`<link rel="stylesheet" href="/styles/main-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
  }

  if (pagename==='About' || pagename==='Contact'){
    let cssname=pagename.toLowerCase()
    $('head').append(`<link rel="stylesheet" href="/styles/${cssname}.css" media="screen and (min-width: 992px)">`);
    $('head').append(`<link rel="stylesheet" href="/styles/${cssname}-m.css" media="only screen and (min-width: 0px) and (max-width: 992px)">`);
  }
}

function showPostContent(postFile){
  $('head').append(`<link rel="stylesheet" href="/styles/post.css">`);
  $('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`);
  $.ajax({
    url: `/blog/posts/${postFile}/index.txt`,
    async: false,
    success: function(data){
      let content = data.split('\n');
      let postTime = content[0];
      let postTitle = content[1];
      $('head').append(`<title>${postTitle} - Blog | BlueBoy's Space</title>`);
      $('#post').append(`<p id="postdetail"><span class="material-symbols-outlined" id="back"> <a href="/blog/">chevron_left</a> </span><span class="enw3" id="posttime">${postTime}</span><span class="zhw" id="posttitle">${postTitle}</span></p>`);
      $('#post').append(`<div id="postdiv"></div>`);
      for (let i=2; i<content.length;i++){
        let postContent = content[i];
        if (content[i]==''){
          $('#postdiv').append(`<p id="postcontent"><br></p>`);
        }else{
          $('#postdiv').append(`<p id="postcontent">${postContent}</p>`);
        }
      }
    }
  });
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
      fileList = data.split('\n');
    }
  });
  if (fileList[0]==''){
    $('#post').prepend(`<p style="text-align: center; font-size: 25px;">目前沒有文章......</p>`);
  }
  fileList.reverse();
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
        $('#postblock').append(`<tr><td class="time enw3">${time} </td><td><a href="${postUrl}" class="posttitle zhw">${posttitle}</a><td></tr>`);
      }
    });
  }
}