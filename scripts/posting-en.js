function showPostContent(postFile){
    $('head').append(`<link rel="stylesheet" href="/styles/post.css">`);
    $('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`);
    $.ajax({
      url: `/en/blog/posts/${postFile}/index.txt`,
      async: false,
      success: function(data){
        let content = data.split('\n');
        let postTime = content[0];
        let postTitle = content[1];
        $('head').append(`<title>${postTitle} - Blog | BlueBoy's Space</title>`);
        $('#post').append(`<p id="postdetail"><span class="material-symbols-outlined" id="back"> <a href="/en/blog/">chevron_left</a> </span><span class="enw3" id="posttime">${postTime}</span><span class="enw2" id="posttitle">${postTitle}</span></p>`);
        $('#post').append(`<div id="postdiv"></div>`);
        for (let i=2; i<content.length;i++){
          let postContent = content[i];
          if (content[i]==''){
            $('#postdiv').append(`<p class="enw2" id="postcontent"><br></p>`);
          }else{
            $('#postdiv').append(`<p class="enw2" id="postcontent">${postContent}</p>`);
          }
        }
      }
    });
  }
  
  function listPostsPage(now){
    let page=0;
    let postNum=15;
    $.ajax({
      url: '/en/blog/postlist.txt',
      async: false,
      success: function(data){
        page = Math.ceil((data.split('\n').length) / postNum);
      }
    });
    if(now==undefined){
      now=0;
      listPostsBlock(0,postNum);
    }
    $('#pagenum').empty();
    if (page<10){
      for (let i=0; i<page; i++) {
        if (i==now){
          $('#pagenum').append(`<li class="nownum" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
    }else if(now<4){
      for (let i=0; i<7; i++) {
        if (i==now){
          $('#pagenum').append(`<li class="nownum" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
      $('#pagenum').append(`<li class="ry">......</li>`);
      for (let i=page-3; i<page; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
    }else if(page-now<5){
      for (let i=0; i<3; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
      $('#pagenum').append(`<li class="ry">......</li>`);
      for (let i=page-7; i<page; i++) {
        if (i==now){
          $('#pagenum').append(`<li class="nownum" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
    }else{
      for (let i=0; i<2; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
      let left,right;
      if(now+3==page-2){
        $('#pagenum').append(`<li class="ry">......</li>`);
        left=3;
        right=3;
      }else if(now-2==2){
        left=2;
        right=4;
      }else{
        $('#pagenum').append(`<li class="ry">......</li>`);
        left=2;
        right=3;
      }
      for (let i=now-left; i<now+right; i++) {
        if (i==now){
          $('#pagenum').append(`<li class="nownum" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
      if(now+3!=page-2){
        $('#pagenum').append(`<li class="ry">......</li>`);
      }
      for (let i=page-2; i<page; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postblock').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
    }
  }
  
  function listPostsBlock(startNum,endNum){
    let fileList = [];
    $.ajax({
      url: '/en/blog/postlist.txt',
      async: false,
      success: function(data){
        fileList = data.split('\n');
      }
    });
    $.ajax({
      url: '/en/blog/pinlist.txt',
      async: false,
      success: function(data1){
        fileList=fileList.concat(data1.split('\n'));
      }
    });
    if (fileList==[]){
      $('#post').prepend(`<p style="text-align: center; font-size: 25px;">There are currently no articles available.</p>`);
    }else if(fileList[startNum]==undefined){
      $('#postblock').prepend(`<p style="text-align: center; font-size: 25px;">There are no more articles available.</p>`);
    }
    fileList.reverse();
    for (let i=startNum; i<startNum+endNum && i<fileList.length; i++) {
      let postName=fileList[i];
      let postUrl=`/en/blog/posts/${postName}`;
      let pinned=pin(postName);
      $.ajax({
        url: `/en/blog/posts/${postName}/index.txt`,
        async: false,
        success: function(post){
          let content = post.split('\n');
          let time = content[0];
          let posttitle = content[1];
          $('#postblock').append(`<tr><td class="time enw3">${time} </td><td><span class="posttitle">${pinned}</span><a href="${postUrl}" class="posttitle enw2">${posttitle}</a><td></tr>`);
        }
      });
    }
  }
  
  function pin(title){
    let pinList = [];
    $.ajax({
      url: '/en/blog/pinlist.txt',
      async: false,
      success: function(data){
        pinList = data.split('\n');
      }
    });
    for(let i=0;i<pinList.length;i++){
      if (title==pinList[i]){
        return '📌';
      }
    }
    return '';
  }