class dragSlide {

    constructor(obj = { target: "", interval: 5000, autoplay: true }) {  // Constructor
        this.slider = document.getElementById(obj.target);
        if (this.slider == null || obj.target == "") {
            console.log("No slider with that targeted ID");
            return false;
        }
        this.sliderItems = this.slider.querySelector('#slides');
        this.prev = this.slider.querySelector('#prev');
        this.next = this.slider.querySelector('#next');
        this.dot = this.slider.querySelector('#dots');
        this.dot_eve = this.slider.querySelector('#dot');

        this.posX1 = 0;
        this.posX2 = 0;
        this.posInitial = 0;
        this.interval = obj.interval;
        this.autoplay = obj.autoplay;
        this.threshold = 100;
        this.index = 0;
        this.allowShift = true;

        this.stopautoplay = false;
        this.slides = this.sliderItems.getElementsByClassName('slide'),
            this.dots = this.dot.getElementsByClassName('dot'),
            this.slidesLength = this.slides.length,
            this.slideSize = this.sliderItems.getElementsByClassName('slide')[0].offsetWidth,
            this.firstSlide = this.slides[0],
            this.lastSlide = this.slides[this.slidesLength - 1],
            this.cloneFirst = this.firstSlide.cloneNode(true),
            this.cloneLast = this.lastSlide.cloneNode(true),
            this.index = 0,
            this.allowShift = true;

        // Clone first and last slide
        this.sliderItems.appendChild(this.cloneFirst);
        this.sliderItems.insertBefore(this.cloneLast, this.firstSlide);
        this.sliderItems.classList.add('loaded');
        // Mouse events
        this.sliderItems.onmousedown = this.dragStart.bind(this);
        this.sliderItems.onmouseover = this.pauseAutoSlideOnMove.bind(this);
        this.slider.onmouseover = this.pauseAutoSlideOnMove.bind(this);
        this.slider.addEventListener("mouseenter", this.pauseAutoSlideOnMove.bind(this));
        this.slider.addEventListener("mouseleave", this.startAutoSlideOnOut.bind(this));

        // Touch events
        this.sliderItems.addEventListener('touchstart', function (evet) { this.dragStart(evet); }.bind(this), {
            capture: false,
            once: false,
            passive: false
        });
        this.sliderItems.addEventListener('touchend', function (evet) { this.dragEnd(evet); }.bind(this), false);
        this.sliderItems.addEventListener('touchmove', function (evet) { this.dragAction(evet); }.bind(this), {
            capture: false,
            once: false,
            passive: false
        });

        // Click events
        this.prev.addEventListener('click', function (evet) { this.shiftSlide(-1, ""); }.bind(this), false);
        this.next.addEventListener('click', function (evet) { this.shiftSlide(1, ""); }.bind(this), false);

        //dot 생성
        for (let i = 0; i < this.slidesLength; i++) {
            if (i === 0) this.dot.innerHTML += `<div class="active dot"></div>`;
            else this.dot.innerHTML += `<div class="dot"></div>`;
        }

        for (let d = 0; d < this.dots.length; d++) {

            this.dots[d].setAttribute("data-index", d + 1);
            this.dots[d].addEventListener('click', function (_eve) { this.shiftSlideByDot(_eve.target.getAttribute("data-index")); }.bind(this), false);
        }
        console.log(this.dots.length);
        // Transition events
        this.sliderItems.addEventListener('transitionend', this.checkIndex.bind(this), false);
        //slide(slider, sliderItems, prev, next,dot);

        this.setAutoPlay(this);

        //const pagination = document.querySelector(".slide_pagination");


        window.addEventListener("resize", () => {
            this.slides = this.sliderItems.clientWidth;
            this.index = 0;
        });

    }


    dragStart(e) {
        this.stopAutoSlide(this);
        e = e || window.event;
        //e.preventDefault();
        this.posInitial = this.sliderItems.offsetLeft;

        if (e.type == 'touchstart') {
            this.posX1 = e.touches[0].clientX;
        } else {
            this.posX1 = e.clientX;
            document.onmouseup = this.dragEnd.bind(this);
            document.onmousemove = this.dragAction.bind(this);
        }
    }
    shiftSlideByDot(dotIndex, autoSlide = false) {
        if (!autoSlide) {
            this.stopAutoSlide(this);
        }
        this.sliderItems.classList.add('shifting');

        this.sliderItems.style.left = "-" + (this.slideSize * (dotIndex)) + "px";
        this.index = dotIndex - 1;
    }
    stopAutoSlide(e) {
        e.slider.classList.add("stopAutoPlay");
    }
    pauseAutoSlideOnMove() {
        this.slider.classList.add("pauseAutoPlay");
    }
    startAutoSlideOnOut() {
        this.slider.classList.remove("pauseAutoPlay");
    }
    change_dots(e) {
        for (var i = 0; i < this.dots.length; i++) {
            this.dots[i].classList.remove("active");
        }
        var _index = this.dots.length == this.index ? 0 : this.index;
        this.dots[_index].classList.add("active");
    }
    dragAction(e) {
        this.stopAutoSlide(this);
        e = e || window.event;

        if (e.type == 'touchmove') {
            this.posX2 = this.posX1 - e.touches[0].clientX;
            this.posX1 = e.touches[0].clientX;
        } else {
            this.posX2 = this.posX1 - e.clientX;
            this.posX1 = e.clientX;
        }
        this.sliderItems.style.left = (this.sliderItems.offsetLeft - this.posX2) + "px";
    }

    dragEnd(e) {
        this.posFinal = this.sliderItems.offsetLeft;
        if (this.posFinal - this.posInitial < -this.threshold) {
            this.shiftSlide(1, 'drag');
        } else if (this.posFinal - this.posInitial > this.threshold) {
            this.shiftSlide(-1, 'drag');
        } else {
            this.sliderItems.style.left = (this.posInitial) + "px";
        }
        this.checkIndex()
        document.onmouseup = null;
        document.onmousemove = null;
    }

    shiftSlide(dir, action) {
        this.stopAutoSlide(this);
        this.sliderItems.classList.add('shifting');

        if (this.allowShift) {
            if (!action) { this.posInitial = this.sliderItems.offsetLeft; }

            if (dir == 1) {
                this.sliderItems.style.left = (this.posInitial - this.slideSize) + "px";
                this.index++;
            } else if (dir == -1) {
                this.sliderItems.style.left = (this.posInitial + this.slideSize) + "px";
                this.index--;
            }
        };

        this.allowShift = false;
    }
    setAutoPlay() {
        if (this.autoplay) {
            this.autoplay = setInterval(function (parent_obj) {
                if (parent_obj.slider.getAttribute("class").indexOf("stopAutoPlay") < 0 && parent_obj.slider.getAttribute("class").indexOf("pauseAutoPlay") < 0) {
                    var loopIndex = parent_obj.dot.querySelector(".dot.active").getAttribute("data-index");
                    loopIndex = loopIndex == parent_obj.dot.length ? 1 : (loopIndex * 1) + 1;
                    if (parent_obj.allowShift == true) {
                        //CusSlider.index = loopIndex;
                        parent_obj.shiftSlideByDot(loopIndex, true);
                    }
                }
            }, this.interval, this);
        }
    }
    checkIndex() {
        this.sliderItems.classList.remove('shifting');

        if (this.index == -1) {
            this.sliderItems.style.left = -(this.slidesLength * this.slideSize) + "px";
            this.index = this.slidesLength - 1;
        }

        if ((this.index) == this.slidesLength) {
            this.sliderItems.style.left = -(1 * this.slideSize) + "px";
            this.index = 0;
        }
        this.allowShift = true;
        this.change_dots();
    }
}