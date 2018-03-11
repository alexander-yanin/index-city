$(document).ready(function () {
    svg4everybody({});

    new slider('slider-hot-offer');
    new slider('slider-news');
    new gallery_slider('gallery-slider');
    document.getElementById("calc") ? calcMortgage() : null;
    document.getElementById("defaultOpen") ? document.getElementById("defaultOpen").click() : null;
    document.getElementById("mortgage_default_tab") ? document.getElementById("mortgage_default_tab").click() : null;

});

function slider(id) {
    let self = this;
    self.slider = $("#"+id);
    self.slidesArray = self.slider.find(".slides").children();
    self.dotsContainer = self.slider.find(".slider-footer-dots");
    self.prevDot = null;
    self.curDot = 0;
    self.dotsArray = [];

    self.init = function() {
        for (let i = 0; i < Math.ceil(self.slidesArray.length/3); i++) {
            let a = $("<a href='#' dot-num='"+i+"' class='slider-dot" + (i === self.curDot ? ' active' : '') + "'></a>");
            self.dotsContainer.append(a);
            self.dotsArray.push(a);
        }

        self.slider.find(".slider-dot").on("click", function (e) {
            e.preventDefault();
            self.prevDot = self.curDot;
            self.curDot = parseInt($(e.target).attr("dot-num"));
            self.dotsArray[self.prevDot].removeClass("active");
            self.dotsArray[self.curDot].addClass("active");
            self.slider.find(".slides").css("transform", "translateX("+self.curDot*(-100)+"%)")
        });
    };

    self.selectSlide = function(e, num) {
        e.preventDefault();
        self.prevDot = self.curDot;
        self.curDot = num;
        self.dotsArray[self.prevDot].removeClass("active");
        self.dotsArray[self.curDot].addClass("active");

    };

    return self.init();
}


function gallery_slider(id) {
    let self = this;
    self.slider = $("#"+id);
    self.mainImg = self.slider.find(".housing-gallery-main").find("img");
    self.slides = self.slider.find(".housing-gallery-slides").find("img");
    self.slidesArray = self.slider.find(".housing-gallery-slides").children();
    self.prevImg = null;
    self.curImg = 0;
    self.prevArrow = self.slider.find(".arrow-prev");
    self.nextArrow = self.slider.find(".arrow-next");

    self.nextArrow.on("click", function (e) {
        e.preventDefault();
        self.prevImg = self.curImg;
        self.curImg += 1;
        if (self.curImg >= self.slidesArray.length) {
            self.curImg = 0;
        }
        $(self.slidesArray[self.prevImg]).removeClass("active");
        $(self.slidesArray[self.curImg]).addClass("active");
        $(self.mainImg).attr("src", $(self.slidesArray[self.curImg]).attr("src"));
    });

    self.prevArrow.on("click", function (e) {
        e.preventDefault();
        self.prevImg = self.curImg;
        self.curImg -= 1;
        if (self.curImg <= 0) {
            self.curImg = self.slidesArray.length-1;
        }
        $(self.slidesArray[self.prevImg]).removeClass("active");
        $(self.slidesArray[self.curImg]).addClass("active");
        $(self.mainImg).attr("src", $(self.slidesArray[self.curImg]).attr("src"));
    });

    self.slides.on("click", function (e) {
        e.preventDefault();
        self.prevImg = self.curImg;
        self.curImg = parseInt($(e.target).attr("num-slide-img"));
        $(self.slidesArray[self.prevImg]).removeClass("active");
        $(self.slidesArray[self.curImg]).addClass("active");
        $(self.mainImg).attr("src", $(self.slidesArray[self.curImg]).attr("src"));
    });

}

$(document).ready(function () {
    $(".icon-menu").on("click", function () {
        $(".mobile-nav").css("transform", "translateX(0%)");
    });
    $(".icon-close").on("click", function () {
        $(".mobile-nav").css("transform", "translateX(100%)");
    });
});

// 2gis
$(document).ready(function () {
    var map;

    document.getElementById("map") ?
        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });
        }) : null

    document.getElementById("contacts-map") ?
        DG.then(function () {
            map = DG.map('contacts-map', {
                center: [54.98, 82.89],
                zoom: 13
            });
        }) : null
});


// табы типы оплаты
function openPayment(evt, paymentType) {
    evt.preventDefault();
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(paymentType).style.display = "block";
    evt.currentTarget.className += " active";
}


function openModalImage(evt, imagePath) {
    evt.preventDefault();
    $('.modal-image').attr('src', imagePath);
    $('.modal-plan-overlay').show();
}

function closeModalImage(evt, context) {
    console.log(evt.target);
    console.log(context);
    if (evt.target.className === context.className) {
        $('.modal-plan-overlay').hide();
    }
}


// табы ипотека
function mortgageTabs(evt, type) {
    evt.preventDefault();
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("mortgage-tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(type).style.display = "block";
    evt.currentTarget.className += " active";
}


function changeInput(event, className) {
    // $("." + className).val(event.target.value.toString().replace(/[^.\d]+/g,""));
    $("." + className).slider("value", event.target.value.toString().replace(/[^.\d]+/g,""));

    calcMortgage();
}
function changeRange(className, val, char) {
    $("." + className).val(val.toString().replace(/[^.\d]+/g,"") + " " + char);
    calcMortgage();
}


function calcMortgage() {
    var priceHouse = parseFloat($(".price-house-input").val().replace(/[^.\d]+/g,"")),
        iHave = parseFloat($(".ihave-input").val().replace(/[^.\d]+/g,"")),
        percent = parseFloat($(".percent-input").val().replace(/[^.\d]+/g,"")/100),
        age = parseFloat($(".age-input").val().replace(/[^.\d]+/g,"")),
        sumMort = priceHouse - iHave,
        monthCount = age * 12,
        percentPerMonth = percent/12;
    $(".sum-credit").html(sumMort +  "&#8381;");
    var payInMonth = (sumMort * (percentPerMonth/(1-Math.pow((1+percentPerMonth), -monthCount)))).toFixed(2);
    $(".pay-in-month").html(payInMonth + "&#8381;");
}


// фильтр
$(document).ready(function() {
    $('.filter-select').multiselect({
        buttonWidth: "160px",
        maxHeight: "40px",
        buttonClass: "form-control filter-select",
        nSelectedText: "Выбрано",
        allSelectedText: "Выбрано все",
        nonSelectedText: "Не выбрано",
        numberDisplayed: 2
    });
});

$(".filter-toggle").on("click", function () {
    var filter = $(".filter");
    if (filter.css("display") === "none") {
        $(this).text("Закрыть фильтр");
        filter.css("display", "block");
    } else {
        $(this).text("Открыть фильтр");
        filter.css("display", "none");
    }
});


$( document ).ready(function() {

    function createHoverState (myobject){
        myobject.hover(function() {
            $(this).prev().toggleClass('hilite');
        });
        myobject.mousedown(function() {
            $(this).prev().addClass('dragging');
            $("*").mouseup(function() {
                $(myobject).prev().removeClass('dragging');
            });
        });
    }

    $(".price-house-range").slider({orientation: "horizontal", range: "min", min: 300000, max: 10000000, value: 3000000, animate: 1300});
    $(".ihave-range").slider({orientation: "horizontal", range: "min", min: 450000, max: 3000000, value: 1000000, animate: 1300});
    $(".percent-range").slider({orientation: "horizontal", range: "min", step: 0.01, min: 5, max: 15, value: 9.9, animate: 1300});
    $(".age-range").slider({orientation: "horizontal", range: "min", min: 1, max: 30, value: 5, animate: 1300});

    createHoverState($(".slider-range a.ui-slider-handle"));

});


$( document ).ready(function() {
    var inputDict = {
        "price-house-input": "₽",
        "ihave-input": "₽",
        "percent-input": "%",
        "age-input": "лет"
    };

    $('.slider-range').each(function(index) {
        $(this).slider({
            slide: function( event, ui ) {
                var className = $(this)[0].classList[2].replace("range", "input");
                var val = $(this).slider("option", "value");
                console.log(className);
                changeRange(className, val, inputDict[className])
            }
        });
    });
});


$(".modal-right-block__footer-form-input").inputmask("+7 (999) 999-999");