function listPostsPage(now){
    let page=0;
    let postNum=15;
    $.ajax({
      url: '/blog/postlist.txt',
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
          $('#pagenum').append(`<li class="nownum" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
    }else if(now<4){
      for (let i=0; i<7; i++) {
        if (i==now){
          $('#pagenum').append(`<li class="nownum" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
      $('#pagenum').append(`<li class="ry">......</li>`);
      for (let i=page-3; i<page; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
    }else if(page-now<5){
      for (let i=0; i<3; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
      $('#pagenum').append(`<li class="ry">......</li>`);
      for (let i=page-7; i<page; i++) {
        if (i==now){
          $('#pagenum').append(`<li class="nownum" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
    }else{
      for (let i=0; i<2; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
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
          $('#pagenum').append(`<li class="nownum" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
        }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);}
      }
      if(now+3!=page-2){
        $('#pagenum').append(`<li class="ry">......</li>`);
      }
      for (let i=page-2; i<page; i++) {
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${i*postNum}, ${postNum});listPostsPage(${i});">${i+1}</li>`);
      }
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
    if (fileList==[] || fileList==""){
      $('.content').prepend(`<p class="nopost">目前沒有記事......</p>`);
      $(`#postblock`).css("display","none");
      $(`#pagenum`).css("display","none");
    }else if(fileList[startNum]==undefined){
      $('.content').prepend(`<p class="nopost">沒有更多記事了......</p>`);
      $(`#postblock`).css("display","none");
    }
    fileList.reverse();
    for (let i=startNum; i<startNum+endNum && i<fileList.length; i++) {
      let postData=fileList[i].split(' ');
      let postPath=postData[0];
      let postUrl=`/blog/posts/${postPath}`;
      $.ajax({
        url: `/blog/posts/${postPath}/index.html`,
        async: false,
        success: function(post){
          post = new DOMParser().parseFromString(post,'text/html');
          let time = post.getElementById('posttime').innerText;
          let posttitle = post.getElementById('posttitle').innerText;
          $('#postlist').append(`<tr><td class="time enw3">${time}</td><td class="posttitle"><a href="${postUrl}" class="zhwb">${posttitle}</a><td></tr>`);
        }
      });
    }
  }