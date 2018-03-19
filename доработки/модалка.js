
// должна быть на всех страницах

$(".modal-lids__input").inputmask("+7 (999) 999-999");

$(document).ready(function() {
    if (!sessionStorage.getItem("lidsmodal")) {
        setTimeout(function() {
            $(".modal-lids").fadeIn(300);
        }, 1000*20)    
    }
})

$(".modal-lids__close_down").on("click", closeLidsModal);

function closeLidsModal() {
    sessionStorage.setItem("lidsmodal", "true");
    $(".modal-lids").fadeOut(300);
}