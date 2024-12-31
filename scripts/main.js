// sidemenu
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

// lastupdate
const lastupdatetime = document.getElementById("lastupdatetime");
const user = 'BlueBoy247';
const repoName = 'blueboy247.github.io';
const apiUrl = `https://api.github.com/repos/${user}/${repoName}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const gitHubUpdateTime = data.pushed_at;
        const date = new Date(gitHubUpdateTime);
        let timezone = date.getTimezoneOffset() / -60;
        if(timezone > 0){
            timezone = `+${timezone}`;
        }else{
            timezone = `${timezone}`;
        }
        const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} (UTC${timezone})`;
        lastupdatetime.innerText = formattedDate;
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

// backtotop
const backtotop = document.getElementById('backtotop');
backtotop.addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})