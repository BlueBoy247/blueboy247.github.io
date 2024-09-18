let expanded = false;
let nav = document.getElementById('mobilenav');
document.getElementById('menu').addEventListener('click',function(){
    if(expanded){
        nav.style.width = '0';
        nav.style.paddingLeft = '0';
        nav.style.display = 'none';
        expanded = false;
    }else{
        nav.style.display = 'block';
        nav.style.width = '300px';
        nav.style.paddingLeft = 'calc(100vw - 300px)';
        expanded = true;
    }
})