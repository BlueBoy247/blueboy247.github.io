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
        const utc8Date = new Date(date.getTime() + 8 * 60 * 60 * 1000);
        const formattedDate = `${utc8Date.getFullYear()}/${String(utc8Date.getMonth() + 1).padStart(2, '0')}/${String(utc8Date.getDate()).padStart(2, '0')} ${String(utc8Date.getUTCHours()).padStart(2, '0')}:${String(utc8Date.getUTCMinutes()).padStart(2, '0')}:${String(utc8Date.getUTCSeconds()).padStart(2, '0')} (UTC+8)`;

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