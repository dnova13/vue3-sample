<!-- 식당 소개 view -->

<template>
    <div class="sub_content restaurant">
        <div id="slider2" class="slider">
            <div class="slide_wrapper restaurant_slide_inner">
                <div id="slides2" class="restaurant_slide slides">
                    <template v-for="(item, idx) in shopInfo?.shopImage" :key="idx">
                        <img :src="changeImgUrl(item)" alt="" class="restaurant_slide_img" />
                    </template>
                </div>
                <div class="restaurant_slide_pager">
                    <div class="restaurant_slide_controls">
                        <span class="prev">
                            <img src="img/sub_slide_arrow_shadow.png" alt="" />
                        </span>
                        <span class="next">
                            <img src="img/sub_slide_arrow_shadow.png" alt="" />
                        </span>
                    </div>
                    <ul class="restaurant_slide_dots"></ul>
                </div>
            </div>
        </div>
        <div class="inner_container">
            <div class="restaurant_about">
                <h2 class="restaurant_about_title">
                    {{ shopInfo?.companyName }}
                    <span class="text_sm">{{
                        shopInfo?.branchName ? '[' + shopInfo?.branchName + ']' : ''
                    }}</span>
                </h2>
                <p class="restaurant_about_desc" v-html="handleNewLine(shopInfo?.companyStory)"></p>
            </div>
        </div>
    </div>
    <!-- <div class="inner_container">
        <div class="restaurant_slide_pager">
            <div class="restaurant_slide_controls">
                <span class="prev">&lt;</span>
                <span class="next">&gt;</span>
            </div>
            <div class="restaurant_slide_counter">
            </div>
        </div>
        <div class="restaurant_about">
            <h2 class="restaurant_about_title">
                {{menuList.companyInfo.companyName}}
                <span class="text_sm">[{{menuList.companyInfo.companyBranch}}]</span>
            </h2>
            <p class="restaurant_about_desc"
                v-html="handleNewLine(menuList.companyInfo.companyStory)"
            >
            </p>
        </div>
    </div> -->
</template>

<script>
import { handleNewLine, changeImgUrl } from '@/utils/function.js'
export default {
    props: ['menuList', 'shopInfo'],
    created() {
        // console.log(this.shopInfo, this.shopInfo.shopImage);
    },
    mounted() {
        this.$emit('setTrigger', '/restaruant')

        var restaurantSlider = document.getElementById('slider2'),
            restaurantSliderItems = document.getElementById('slides2'),
            prev = restaurantSlider.querySelectorAll('.prev'),
            next = restaurantSlider.querySelectorAll('.next')

        function slide2(wrapper, items, prev, next) {
            var posX1 = 0,
                posX2 = 0,
                posY1 = 0,
                posY2 = 0,
                posInitial,
                posFinal,
                threshold = 100,
                slides2 = items.getElementsByClassName('restaurant_slide_img'),
                slidesLength = slides2.length,
                slideSize = items.getElementsByClassName('restaurant_slide_img')[0].offsetWidth,
                firstSlide = slides2[0],
                lastSlide = slides2[slidesLength - 1],
                cloneFirst = firstSlide.cloneNode(true),
                cloneLast = lastSlide.cloneNode(true),
                index = 0,
                allowShift = true,
                dragIdx = 0,
                isX = true

            const pagination = document.querySelector('.restaurant_slide_dots')
            const dots = document.getElementsByClassName('restaurant_slide_dot')

            /* Create pager dot */
            for (let i = 0; i < slides2.length; i++) {
                // if (slidesLength < 2) break;

                if (i === 0)
                    pagination.innerHTML += `<li class="active restaurant_slide_dot"><span></span></li>`
                else pagination.innerHTML += `<li class="restaurant_slide_dot"><span></span></li>`
            }

            /* Clone first and last slide */
            items.appendChild(cloneFirst)
            items.insertBefore(cloneLast, firstSlide)
            wrapper.classList.add('loaded')

            /*  Main move events */
            if (slidesLength > 1) {
                // Mouse events
                items.onmousedown = dragStart

                // Touch events
                items.addEventListener('touchstart', dragStart)
                items.addEventListener('touchend', dragEnd)
                items.addEventListener('touchmove', dragAction)

                // Click events
                for (let a = 0; a < prev.length; a++) {
                    prev[a].addEventListener('click', function () {
                        shiftSlide(-1)
                    })
                }

                for (let a = 0; a < next.length; a++) {
                    next[a].addEventListener('click', function () {
                        shiftSlide(1)
                    })
                }
            } else {
                prev[0].style.display = 'none'
                next[0].style.display = 'none'
            }

            /* Transition events */
            items.addEventListener('transitionend', checkIndex)

            /* Pager dot clike event */
            for (let d = 0; d < dots.length; d++) {
                ;(function (dotIndex) {
                    dots[d].onclick = function () {
                        if (dotIndex !== index) {
                            slideSize = items.getElementsByClassName('restaurant_slide_img')[0].offsetWidth

                            items.classList.add('shifting')
                            items.style.left = '-' + slideSize * (dotIndex + 1) + 'px'
                            index = dotIndex
                        }
                    }
                })(d)
            }

            /* slide event functions */
            function dragStart(e) {
                e = e || window.event
                posInitial = items.offsetLeft

                if (e.type == 'touchstart') {
                    posX1 = e.changedTouches[0].clientX
                    posY1 = e.changedTouches[0].clientY
                } else {
                    posX1 = e.clientX
                    document.onmouseup = dragEnd
                    document.onmousemove = dragAction
                }
            }

            function dragAction(e) {
                e = e || window.event

                if (e.type == 'touchmove') {
                    dragIdx++
                    e.preventDefault() // 스크롤 동작 막기

                    // 확대 동작시 슬라이드 동작 막기
                    if (e.touches.length > 1) {
                        // e.preventDefault(); // 스크롤 동작 막기
                        return
                    }

                    posX2 = posX1 - e.changedTouches[0].clientX
                    posY2 = posY1 - e.changedTouches[0].clientY

                    // 첫 동작이 x축 y축 이동인지 결정.
                    if (dragIdx === 1) {
                        isX = Math.abs(posY2) >= Math.abs(posX2) ? false : true
                    }

                    // 첫 동작이 x,y축 이동에 따라서 이벤트 동작 막음.
                    if (isX) {
                        e.preventDefault()
                    } else {
                        return
                    }

                    posX1 = e.changedTouches[0].clientX
                    posY1 = e.changedTouches[0].clientY
                } else {
                    posX2 = posX1 - e.clientX
                    posX1 = e.clientX
                }

                items.style.left = items.offsetLeft - posX2 + 'px'
            }

            function dragEnd(e) {
                posFinal = items.offsetLeft
                if (posFinal - posInitial < -threshold) {
                    shiftSlide(1, 'drag')
                } else if (posFinal - posInitial > threshold) {
                    shiftSlide(-1, 'drag')
                } else {
                    slideSize = items.getElementsByClassName('restaurant_slide_img')[0].offsetWidth
                    items.style.left = `${-slideSize - index * slideSize}px`
                }

                document.onmouseup = null
                document.onmousemove = null

                dragIdx = 0
            }

            function shiftSlide(dir, action) {
                items.classList.add('shifting')

                if (allowShift) {
                    if (!action) {
                        posInitial = items.offsetLeft
                    }

                    if (dir == 1) {
                        items.style.left = posInitial - slideSize + 'px'
                        index++
                    } else if (dir == -1) {
                        items.style.left = posInitial + slideSize + 'px'
                        index--
                    }
                }

                allowShift = false
            }

            function change_dots(e) {
                for (var i = 0; i < dots.length; i++) {
                    dots[i].classList.remove('active')
                }
                var _index = dots.length == index ? 0 : index
                dots[_index].classList.add('active')
            }

            function checkIndex() {
                items.classList.remove('shifting')
                slideSize = items.getElementsByClassName('restaurant_slide_img')[0].offsetWidth

                // 첫번째 -> 마지막으로 갈경우
                if (index == -1) {
                    console.log('last?')
                    items.style.left = -(slidesLength * slideSize) + 'px'
                    index = slidesLength - 1
                }

                // 마지막 -> 첫번째
                if (index == slidesLength) {
                    items.style.left = -(1 * slideSize) + 'px'
                    index = 0
                }

                allowShift = true
                change_dots()
            }
        }

        slide2(restaurantSlider, restaurantSliderItems, prev, next)
    },
    methods: {
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        handleNewLine(str) {
            return handleNewLine(str)
        },
    },
}
</script>

<style></style>
