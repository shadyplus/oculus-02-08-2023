'use strict'; // slider

function b_sliders(block, btn) {
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function () {
            for (var y = 0; y < block.length; y++) {
                block[y].classList.remove("b-visible");
                btn[y].classList.remove("b-active");
            }

            block[i].classList.add("b-visible");
            btn[i].classList.add("b-active");
        });
    }
} // в лево


function b_sliderLeft(block, btn) {
    var position = 0;
    var positionNext = 0;

    for (var i = 0; i < btn.length; i++) {
        if (btn[i].className == "b-btn b-active") {
            position = i;
        }
    }

    if (position == 0) {
        positionNext = btn.length - 1;
    } else {
        positionNext = position - 1;
    }

    block[position].classList.remove("b-visible");
    btn[position].classList.remove("b-active");
    block[positionNext].classList.add("b-visible");
    btn[positionNext].classList.add("b-active");
} // в право


function b_sliderRight(block, btn) {
    var position = 0;
    var positionNext = 0;

    for (var i = 0; i < btn.length; i++) {
        if (btn[i].className == "b-btn b-active") {
            position = i;
        }
    }

    if (position == btn.length - 1) {
        positionNext = 0;
    } else {
        positionNext = position + 1;
    }

    block[position].classList.remove("b-visible");
    btn[position].classList.remove("b-active");
    block[positionNext].classList.add("b-visible");
    btn[positionNext].classList.add("b-active");
} // перелистывания пальцем


function b_touchSlider(box, slider, btn) {
    var touchStartX = null; //Точка начала касания

    var touchPositionX = null; //Текущая позиция

    var touchEndX = null; // Конец касания

    var sensitivity = 50; // Чувствительность
    //Перехватываем события

    box.addEventListener("touchstart", function (e) {
        TouchStart(e);
    }); //Начало касания

    box.addEventListener("touchmove", function (e) {
        TouchMove(e);
    }); //Движение пальцем по экрану

    box.addEventListener("touchend", function (e) {
        TouchEnd(e);
    }); //Пользователь отпустил экран

    function TouchStart(e) {
        //Получаем текущую позицию касания
        touchStartX = e.changedTouches[0].pageX;
    }

    function TouchMove(e) {
        //Получаем новую позицию
        touchPositionX = e.changedTouches[0].pageX;
    }

    function TouchEnd(e) {
        if (touchPositionX < touchStartX - sensitivity) {
            b_sliderRight(slider, btn);
        } else if (touchPositionX > touchStartX + sensitivity) {
            b_sliderLeft(slider, btn);
        }
    }
} //


var b_header = document.querySelector('.b-header-sliders');
var b_headerSliderBtn = document.querySelector('.b-btnbox').children;
var b_headerSlidersItem = document.querySelectorAll('.b-header-sid');
b_sliders(b_headerSlidersItem, b_headerSliderBtn);
b_touchSlider(b_header, b_headerSlidersItem, b_headerSliderBtn); // автопрокрутка слайдера

setInterval(function () {
    b_sliderRight(b_headerSlidersItem, b_headerSliderBtn);
}, 3000); // работа ползунка

var b_changesRight = document.querySelector('.b-changes-right');
var b_range = document.querySelector('.b-changes-btnbox__range');
var b_rangeSlider = document.querySelectorAll('.b-changes-slider');
var b_rangeText = document.querySelectorAll('.b-changes-btnbox__text');

function b_rangeEvent() {
    if (b_range.value < 26) {
        var item = 0;
        B_sliderRange(b_rangeSlider, b_rangeText, item);
    } else if (b_range.value > 25 && b_range.value < 51) {
        var item = 1;
        B_sliderRange(b_rangeSlider, b_rangeText, item);
    } else if (b_range.value > 50 && b_range.value < 76) {
        var item = 2;
        B_sliderRange(b_rangeSlider, b_rangeText, item);
    } else if (b_range.value > 75) {
        var item = 3;
        B_sliderRange(b_rangeSlider, b_rangeText, item);
    }
}

function B_sliderRange(slider, text, index) {
    for (var i = 0; i < slider.length; i++) {
        for (var y = 0; y < slider[i].classList.length; y++) {
            if (slider[i].classList[y] == "b-visible") {
                slider[i].classList.remove("b-visible");
                text[i].classList.remove("b-view");
            }
        }
    }

    slider[index].classList.add("b-visible");
    text[index].classList.add("b-view");
} // блок ползунка


var b_rangeBoxslider = document.querySelector('.b-range-boxslider');
var b_rangeValue = b_range.value;
b_rangeBoxslider.style.left = b_rangeValue + '%'; // отлеживания и перемешение блока там где сам ползунок

function B_rangeBoxShift() {
    var b_shiftPlus = 0;
    var b_shiftMinus = 0;

    if (b_range.value < b_rangeValue) {
        b_shiftPlus = 0 + b_range.value;
        b_rangeBoxslider.style.right = b_shiftPlus + '%';
        b_rangeValue = b_range.value;
    }

    if (b_range.value > b_rangeValue) {
        b_shiftMinus = 0 + b_range.value;
        b_rangeBoxslider.style.right = b_shiftMinus + '%';
        b_rangeValue = b_range.value;
    }
} // нажатие на картику проверке зрения
// сдив ползунка


function B_rangeShift(index) {
    switch (index) {
        case 0:
            b_range.value = 0;
            B_rangeBoxShift();
            break;

        case 1:
            b_range.value = 33;
            B_rangeBoxShift();
            break;

        case 2:
            b_range.value = 66;
            B_rangeBoxShift();
            break;

        case 3:
            b_range.value = 100;
            B_rangeBoxShift();
            break;
    }
} //
// нажатие на текст


for (var z = 0; z < b_rangeText.length; z++) {
    b_rangeText[z].addEventListener('click', function () {
        for (var y = 0; y < b_rangeText.length; y++) {
            b_rangeSlider[y].classList.remove("b-visible");
            b_rangeText[y].classList.remove("b-view");
            b_rangeSlider[z].classList.add("b-visible");
            b_rangeText[z].classList.add("b-view");
        }

        B_rangeShift(z);
    });
} // нажатие на изображение


for (var z = 0; z < b_rangeSlider.length; z++) {
    b_rangeSlider[z].addEventListener('click', function () {
        B_rangeleft();
    });
} // переключение в право


function B_rangeRight() {
    var position = 0;
    var positionNext = 0;

    for (var i = 0; i < b_rangeSlider.length; i++) {
        if (b_rangeText[i].className == "b-p b-changes-btnbox__text b-view") {
            position = i;
        }
    }

    if (position == 0) {
        positionNext = b_rangeText.length - 1;
    } else {
        positionNext = position - 1;
    }

    b_rangeSlider[position].classList.remove("b-visible");
    b_rangeText[position].classList.remove("b-view");
    b_rangeSlider[positionNext].classList.add("b-visible");
    b_rangeText[positionNext].classList.add("b-view");
    B_rangeShift(positionNext);
} // переключение в лево


function B_rangeleft() {
    var position = 0;
    var positionNext = 0;

    for (var i = 0; i < b_rangeSlider.length; i++) {
        if (b_rangeText[i].className == "b-p b-changes-btnbox__text b-view") {
            position = i;
        }
    }

    if (position == b_rangeText.length - 1) {
        positionNext = 0;
    } else {
        positionNext = position + 1;
    }

    b_rangeSlider[position].classList.remove("b-visible");
    b_rangeText[position].classList.remove("b-view");
    b_rangeSlider[positionNext].classList.add("b-visible");
    b_rangeText[positionNext].classList.add("b-view");
    B_rangeShift(positionNext);
} // перелистывания пальцем


function b_touchRage(box) {
    var touchStartX = null; //Точка начала касания

    var touchPositionX = null; //Текущая позиция

    var sensitivity = 50; // Чувствительность
    //Перехватываем события

    box.addEventListener("touchstart", function (e) {
        TouchStart(e);
    }); //Начало касания

    box.addEventListener("touchmove", function (e) {
        TouchMove(e);
    }); //Движение пальцем по экрану

    box.addEventListener("touchend", function (e) {
        TouchEnd(e);
    }); //Пользователь отпустил экран

    function TouchStart(e) {
        touchPositionX = null; //Получаем текущую позицию касания

        touchStartX = e.changedTouches[0].pageX;
    }

    function TouchMove(e) {
        //Получаем новую позицию
        touchPositionX = e.changedTouches[0].pageX;
    }

    function TouchEnd(e) {
        if (touchPositionX < touchStartX - sensitivity && touchPositionX != null) {
            B_rangeleft();
        } else if (touchPositionX > touchStartX + sensitivity && touchPositionX != null) {
            B_rangeRight();
        }
    }
} //
// вызов переключения пальцем


b_touchRage(b_changesRight); // автопрокрутка слайдера

setInterval(function () {
    B_rangeleft();
}, 2000); // плавная прокрутка

$(document).ready(function () {
    $('a[href*="#b-buy"]').click(function (evt) {
        evt.preventDefault();
        $("html, body").animate({
            scrollTop: $('#b-buy').offset().top
        }, 2000);
        return false;
    });
    $('a[href*="#b-reviews"]').click(function (evt) {
        evt.preventDefault();
        $("html, body").animate({
            scrollTop: $('#b-reviews').offset().top
        }, 2000);
        return false;
    });
    $('a[href*="#b-composition"]').click(function (evt) {
        evt.preventDefault();
        $("html, body").animate({
            scrollTop: $('#b-composition').offset().top
        }, 2000);
        return false;
    });
    $('a[href*="#b-effect"]').click(function (evt) {
        evt.preventDefault();
        $("html, body").animate({
            scrollTop: $('#b-effect').offset().top
        }, 2000);
        return false;
    });
}); // прокрутка до changes и его анимация

var b_changes = document.querySelector('.b-changes');
var b_changesScroll = b_changes.getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.9;
var b_changesScroll_b = b_changes.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top - innerHeight * 0.1;

function B_changesAnim() {
    if (window.screen.width < 631) {
        b_changes.classList.add("fade-in2");
    } else {
        if (window.pageYOffset > b_changesScroll) {
            b_changes.classList.add("fade-in2");
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_changesScroll) {
                    setTimeout(function () {
                        b_changes.classList.add("fade-in2");
                    }, 0);
                }
            });
        }
    }
}

B_changesAnim(); // прокрутка до effect и его анимация

function B_effectAnim() {
    var b_effect = document.querySelector('.b-effect');
    var b_effectBg1 = document.querySelector('.b-effect-background1');
    var b_effectBg2 = document.querySelector('.b-effect-background2');
    var b_effectItem = document.querySelectorAll('.b-effect-item'); //

    var b_effectScroll_bg1 = b_effectBg1.getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.5;
    var b_effectScroll_bg2 = b_effectBg2.getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.4; //

    var b_effectScroll_0 = b_effectItem[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.6;
    var b_effectScroll_1 = b_effectItem[1].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.6;
    var b_effectScroll_2 = b_effectItem[2].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.6;

    if (window.screen.width < 631) {
        b_effectBg1.classList.add("slide-in-fwd-center0");
        b_effectBg2.classList.add("slide-in-fwd-center0");
        b_effectItem[0].classList.add("fade-in-03");
        b_effectItem[2].classList.add("fade-in-09");
        b_effectItem[1].classList.add("fade-in-06");
    } else {
        if (window.pageYOffset > b_effectScroll_bg1) {
            setTimeout(function () {
                b_effectBg1.classList.add("slide-in-fwd-center0");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_effectScroll_bg1) {
                    setTimeout(function () {
                        b_effectBg1.classList.add("slide-in-fwd-center0");
                    }, 0);
                }
            });
        } //


        if (window.pageYOffset > b_effectScroll_bg2) {
            setTimeout(function () {
                b_effectBg2.classList.add("slide-in-fwd-center0");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_effectScroll_bg2) {
                    setTimeout(function () {
                        b_effectBg2.classList.add("slide-in-fwd-center0");
                    }, 0);
                }
            });
        } //


        if (window.pageYOffset > b_effectScroll_0) {
            setTimeout(function () {
                b_effectItem[0].classList.add("fade-in-03");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_effectScroll_0) {
                    setTimeout(function () {
                        b_effectItem[0].classList.add("fade-in-03");
                    }, 0);
                }
            });
        } //


        if (window.pageYOffset > b_effectScroll_1) {
            setTimeout(function () {
                b_effectItem[1].classList.add("fade-in-06");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_effectScroll_1) {
                    setTimeout(function () {
                        b_effectItem[1].classList.add("fade-in-06");
                    }, 0);
                }
            });
        } //


        if (window.pageYOffset > b_effectScroll_2) {
            setTimeout(function () {
                b_effectItem[2].classList.add("fade-in-09");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_effectScroll_2) {
                    setTimeout(function () {
                        b_effectItem[2].classList.add("fade-in-09");
                    }, 0);
                }
            });
        }
    }
}

B_effectAnim(); // прокрутка до composition и его анимация

function B_compositionAnim() {
    var b_compositionImg = document.querySelectorAll('.b-composition-img');
    var b_compositionScroll_0 = b_compositionImg[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.6;
    var b_compositionScroll_1 = b_compositionImg[1].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.6;
    var b_compositionScroll_2 = b_compositionImg[2].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.6;

    if (window.screen.width < 631) {
        b_compositionImg[0].classList.add("swing-in-top-bck");
        b_compositionImg[2].classList.add("swing-in-bottom-fwd");
        b_compositionImg[1].classList.add("swing-in-right-fwd");
    } else {
        if (window.pageYOffset > b_compositionScroll_0) {
            setTimeout(function () {
                b_compositionImg[0].classList.add("swing-in-top-bck");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_compositionScroll_0) {
                    setTimeout(function () {
                        b_compositionImg[0].classList.add("swing-in-top-bck");
                    }, 0);
                }
            });
        }

        if (window.pageYOffset > b_compositionScroll_1) {
            setTimeout(function () {
                b_compositionImg[1].classList.add("swing-in-right-fwd");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_compositionScroll_1) {
                    setTimeout(function () {
                        b_compositionImg[1].classList.add("swing-in-right-fwd");
                    }, 0);
                }
            });
        }

        if (window.pageYOffset > b_compositionScroll_2) {
            setTimeout(function () {
                b_compositionImg[2].classList.add("swing-in-bottom-fwd");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_compositionScroll_2) {
                    setTimeout(function () {
                        b_compositionImg[2].classList.add("swing-in-bottom-fwd");
                    }, 0);
                }
            });
        }
    }
}

B_compositionAnim(); // прокрутка до doctor и его анимация

function B_doctorAnim() {
    var b_doctor = document.querySelector('.b-doctor');
    var b_doctorTextbox = document.querySelector('.b-doctor-textbox');
    var b_doctorImg = document.querySelector('.b-doctor-img');
    var b_doctorScroll = b_doctor.getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.7;

    if (window.screen.width < 631) {
        b_doctorImg.classList.add("fade-in-03");
        b_doctorTextbox.classList.add("fade-in-06");
    } else {
        if (window.pageYOffset > b_doctorScroll) {
            setTimeout(function () {
                b_doctorImg.classList.add("fade-in-03");
                b_doctorTextbox.classList.add("fade-in-06");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_doctorScroll) {
                    setTimeout(function () {
                        b_doctorImg.classList.add("fade-in-03");
                        b_doctorTextbox.classList.add("fade-in-06");
                    }, 0);
                }
            });
        }
    }
}

B_doctorAnim(); // прокрутка до reviews и его анимация

function B_reviewsAnim() {
    var b_reviewsItem = document.querySelectorAll('.b-reviews-item');
    var b_reviewsScroll_0 = b_reviewsItem[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.7;
    var b_reviewsScroll_1 = b_reviewsItem[1].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.7;
    var b_reviewsScroll_2 = b_reviewsItem[2].getBoundingClientRect().top - document.body.getBoundingClientRect().top - innerHeight * 0.7;

    if (window.screen.width < 631) {
        b_reviewsItem[0].classList.add("fade-in-03");
        b_reviewsItem[1].classList.add("fade-in-06");
        b_reviewsItem[2].classList.add("fade-in-09");
    } else {
        if (window.pageYOffset > b_reviewsScroll_0) {
            setTimeout(function () {
                b_reviewsItem[0].classList.add("fade-in-03");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_reviewsScroll_0) {
                    setTimeout(function () {
                        b_reviewsItem[0].classList.add("fade-in-03");
                    }, 0);
                }
            });
        }

        if (window.pageYOffset > b_reviewsScroll_1) {
            setTimeout(function () {
                b_reviewsItem[1].classList.add("fade-in-06");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_reviewsScroll_1) {
                    setTimeout(function () {
                        b_reviewsItem[1].classList.add("fade-in-06");
                    }, 0);
                }
            });
        }

        if (window.pageYOffset > b_reviewsScroll_2) {
            setTimeout(function () {
                b_reviewsItem[2].classList.add("fade-in-09");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_reviewsScroll_2) {
                    setTimeout(function () {
                        b_reviewsItem[2].classList.add("fade-in-09");
                    }, 0);
                }
            });
        }
    }
}

B_reviewsAnim(); // прокрутка до buy и его анимация

function B_buyAnim() {
    var b_buy = document.querySelector('.b-buy');
    var b_buyBerry = document.querySelector('.b-buy-berry');
    var b_buyBoxform = document.querySelector('.b-buy-boxform');
    var b_buyFormBg1 = document.querySelector('.b-buy-boxform__bg1');
    var b_buyFormListbox = document.querySelector('.b-buy-listbox');
    var b_buyScroll = b_buy.getBoundingClientRect().top - document.body.getBoundingClientRect().top;

    if (window.screen.width < 631) {
        b_buyBerry.classList.add("slide-in-fwd-center0");
        b_buyBoxform.classList.add("swing-in-right-fwd");
        b_buyFormBg1.classList.add("puff-in-center");
        b_buyFormListbox.classList.add("slide-in-fwd-center08");
    } else {
        if (window.pageYOffset > b_buyScroll) {
            setTimeout(function () {
                b_buyBerry.classList.add("slide-in-fwd-center0");
                b_buyBoxform.classList.add("swing-in-right-fwd");
                b_buyFormBg1.classList.add("puff-in-center");
                b_buyFormListbox.classList.add("slide-in-fwd-center08");
            }, 0);
        } else {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > b_buyScroll) {
                    setTimeout(function () {
                        b_buyBerry.classList.add("slide-in-fwd-center0");
                        b_buyBoxform.classList.add("swing-in-right-fwd");
                        b_buyFormBg1.classList.add("puff-in-center");
                        b_buyFormListbox.classList.add("slide-in-fwd-center08");
                    }, 0);
                }
            });
        }
    }
}

B_buyAnim();