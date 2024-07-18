function countArticles(name){
  let num=0;
  $.ajax({
    url: `/article/${name}/articlelist.txt`,
    async: false,
    success: function(data){
      num = data.split('\n').length;
    }
  });
  document.getElementById(name).innerHTML = num;
}

function listArticlesPage(name,now){
    let page=0;
    let postNum=15;
    $.ajax({
      url: `/article/${name}/articlelist.txt`,
      async: false,
      success: function(data){
        page = Math.ceil((data.split('\n').length) / postNum);
      }
    }); 
    if(now==undefined){
      now=0;
      listArticlesBlock(name,0,postNum);
    }
    $('#pagenum').empty();
    if(page==0){
      return;
    }else if (now+1<=3){
      listArticleNum(name,0,5,now,postNum,page);
    }else if(now+1>=page-2){
      listArticleNum(name,page-5,page,now,postNum,page);
    }else{
      listArticleNum(name,now-2,now+3,now,postNum,page);
    }
  }
  
  function listArticleNum(name,start,end,now,postNum,page){
    for (let i=start; i<end; i++) {
      if(i<0 || i>=page){
        continue;
      }
      if (i==now){
        $('#pagenum').append(`<li class="nownum" onclick="$('#postlist').empty();listPostsBlock(${name}, ${i*postNum}, ${(i+1)*postNum});listPostsPage(${i});">${i+1}</li>`);
      }else{
        $('#pagenum').append(`<li class="num" onclick="$('#postlist').empty();listPostsBlock(${name}, ${i*postNum}, ${(i+1)*postNum});listPostsPage(${i});">${i+1}</li>`);
      }
    }
  }
    
  function listArticlesBlock(name,startNum,endNum){
    let fileList = [];
    $.ajax({
      url: `/article/${name}/articlelist.txt`,
      async: false,
      success: function(data){
        fileList = data.split('\n');
      }
    });
    if (fileList==[] || fileList==""){
      $('.content').prepend(`<p class="nopost">目前沒有文章......</p>`);
      $(`#postblock`).css("display","none");
      $(`#pagenum`).css("display","none");
      return;
    }else if(fileList[startNum]==undefined){
      $('.content').prepend(`<p class="nopost">沒有更多文章了......</p>`);
      $(`#postblock`).css("display","none");
      return;
    }
    $(`#postblock`).css("display","table");
    fileList.reverse();
    for (let i=startNum; i<endNum && i<fileList.length; i++) {
      let postData=fileList[i].split(' ');
      let postPath=postData[0];
      let postUrl=`/article/${name}/${postPath}`;
      $.ajax({
        url: `/article/${name}/${postPath}/index.html`,
        async: false,
        success: function(post){
          post = new DOMParser().parseFromString(post,'text/html');
          let time = post.getElementById('posttime').innerText;
          let posttitle = post.getElementById('posttitle').innerText;
          $('#postlist').append(`<tr><td class="time enw3">${time}</td><td class="posttitle"><a href="${postUrl}" class="zhwb" title="${posttitle}">${posttitle}</a><td></tr>`);
        }
      });
    }
  }