$(document).ready(function () {
    $(".open-popup").on("click", function (e) {
        e.preventDefault(); // 阻止默認連結行為
        $(".popup-content").html(""); // 清空彈出視窗內容
        
        const name = $(this).data("name"); // 取得 data-name 的值
        const lang = $(this).data("lang"); // 取得 data-lang 的值
        const url = `/sections/${lang}/${name}.html`; // 拼接外部 HTML 的 URL

        // 動態載入 HTML 到彈出視窗中
        $(".popup-content").load(url, function (_, status) {
            if (status == "error") {
                const content = lang == "en"
                                ? $("<p>Loading failed, please try again later.</p>")
                                : $("<p>載入失敗，請稍後再試。</p>");
                $(".popup-content").html(content);
            }
        });

        $(".overlay, .popup").fadeIn(250); // 顯示彈出視窗與遮罩
    });

    // 關閉彈出視窗
    $(".close-btn, .overlay").on("click", function () {
        $(".overlay, .popup").fadeOut(250); // 隱藏彈出視窗與遮罩
    });
});