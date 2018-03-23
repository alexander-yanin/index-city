$(".filter-toggle").on("click", function () {
    var filter = $(".filter");
    if (filter.css("display") === "none") {
        $(this).text("Закрыть фильтр");
        filter.css("display", "flex");
    } else {
        $(this).text("Открыть фильтр");
        filter.css("display", "none");
    }
});