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

const updateLastUpdateTime = async () => {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            response.json().then(data => {
                const gitHubUpdateTime = data.pushed_at;
                const date = new Date(gitHubUpdateTime);
                let timezone = date.getTimezoneOffset() / -60;
                timezone = (timezone > 0) ? `+${timezone}` : `${timezone}`;

                const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
                const formattedDate = String(date.getDate()).padStart(2, '0');
                const formattedHour = String(date.getHours()).padStart(2, '0');
                const formattedMinute = String(date.getMinutes()).padStart(2, '0');
                const formattedSecond = String(date.getSeconds()).padStart(2, '0');
                lastupdatetime.innerText = `${date.getFullYear()}/${formattedMonth}/${formattedDate} ${formattedHour}:${formattedMinute}:${formattedSecond} (UTC${timezone})`;
            });
        }
    } catch (error) {
        console.error('Fetch error:', error);
        lastupdatetime.innerText = 'Error';
    }
};

updateLastUpdateTime();

// backtotop
const backtotop = document.getElementById('backtotop');
backtotop.addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

// scrollable block
for(let block of document.getElementsByClassName('scrollitems')){
    // 滑鼠滾輪滾動監聽
    block.addEventListener('wheel', (e) => {
        let widthSum = 0;
        for(let item of block.getElementsByClassName('item')){
            widthSum += item.offsetWidth;
        }
        // 若內容超過可顯示寬度
        if(widthSum > block.offsetWidth){
            e.preventDefault(); // 阻止預設的垂直滾動
            block.scrollLeft += e.deltaY; // 橫向滾動
        }
    });
}
