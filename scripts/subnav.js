const scrollContainer = document.getElementsByClassName('subnav')[0];

// 滑鼠滾輪滾動監聽
scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault(); // 阻止預設的垂直滾動
    scrollContainer.scrollLeft += e.deltaY; // 橫向滾動
});

function scrollToBlock(blockName) {
    const block = document.getElementById(blockName);
    let blockPosition = block.getBoundingClientRect().top;
    let currentScroll = window.scrollY;
    let offset = window.innerHeight * 0.09;

    window.scrollTo({
        top: currentScroll + blockPosition - offset,
        behavior: 'smooth'
    });
}