<!-- /* 
    관련된 메뉴 페이지 view
*/ -->
<template>
    <div id="slider" class="sub_cont related_menu">
        <div class="slide_wrapper">
            <div id="slides" class="related_menu_slide slides">
                <template v-for="(item, idx) in foodList" :key="idx">
                    <food
                        :foodInfo="item"
                        :idx="idx"
                        :lastIdx="foodList.length"
                        @initSlide="initSlide"
                    ></food>
                </template>
            </div>
        </div>
        <ul id="dots" class="dot-slide slide_pagination"></ul>
        <a class="control prev related_menu_control">
            <img src="img/sub_slide_arrow.png" alt="" />
        </a>
        <a class="control next related_menu_control">
            <img src="img/sub_slide_arrow.png" alt="" />
        </a>
    </div>
</template>

<script>
import { _xurl } from '#/localSettings.js'
import food from '@/components/dining/food'

export default {
    components: {
        food,
    },
    props: ['menuList'],
    data() {
        return {
            foodList: [],
            categoryList: [],
            companyInfo: [],
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            clickWork: true,
            mouseMoveCnt: 0,
        }
    },
    created() {
        const queryStrings = this.$route.query //for real server

        this.foodList = this.menuList.filter((menu) => {
            return (
                JSON.stringify(menu.ingredients).includes(queryStrings.productCode) &&
                menu.menuCode != queryStrings.menuCode
            )
        })

        // 메뉴를 통해 관련 메뉴들어 갈시 해당 메뉴는 뒤로 보냄.
        if (queryStrings.menuCode)
            this.foodList.push(...this.menuList.filter((menu) => menu.menuCode == queryStrings.menuCode))
    },
    mounted() {
        this.$emit('setTrigger', '/relatedMenu')
    },
    methods: {
        getData(data, param) {
            this.foodList = data
        },
        err() {
            console.log('err')
        },
        initSlide() {
            /***** 관련메뉴 슬라이드 ******/

            var slider = document.getElementById('slider'),
                sliderItems = document.getElementById('slides'),
                prev = slider.querySelectorAll('.prev'),
                next = slider.querySelectorAll('.next')

            function slide(wrapper, items, prev, next) {
                var posX1 = 0,
                    posX2 = 0,
                    posY1 = 0,
                    posY2 = 0,
                    posInitial,
                    posFinal,
                    threshold = 90,
                    slides = items.getElementsByClassName('slide'),
                    slidesLength = slides.length,
                    slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
                    firstSlide = slides[0],
                    lastSlide = slides[slidesLength - 1],
                    cloneFirst = firstSlide.cloneNode(true),
                    cloneLast = lastSlide.cloneNode(true),
                    index = 0,
                    allowShift = true,
                    dragIdx = 0,
                    isX = true

                const pagination = document.querySelector('.slide_pagination')
                const dot = document.querySelector('#dots')
                const dots = dot.getElementsByClassName('related_menu_dot')
                //const dot_eve = slider.querySelector('#dot');

                /* Create pager dot */
                for (let i = 0; i < slides.length; i++) {
                    // if (slidesLength < 2) break;

                    if (i === 0)
                        pagination.innerHTML += `<li class="active related_menu_dot"><span></span></li>`
                    else pagination.innerHTML += `<li class="related_menu_dot"><span></span></li>`
                }

                // const paginationItems = document.querySelectorAll('.slide_pagination > li');

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
                                slideSize = items.getElementsByClassName('slide')[0].offsetWidth

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
                        slideSize = items.getElementsByClassName('slide')[0].offsetWidth
                        items.style.left = `${-slideSize - index * slideSize}px`
                    }

                    document.onmouseup = null
                    document.onmousemove = null

                    dragIdx = 0
                }

                function shiftSlide(dir, action) {
                    items.classList.add('shifting')

                    if (allowShift) {
                        slideSize = items.getElementsByClassName('slide')[0].offsetWidth

                        if (!action) {
                            posInitial = items.offsetLeft
                        }

                        if (dir == 1) {
                            index++
                            items.style.left = `${-index * slideSize - slideSize}px`
                        } else if (dir == -1) {
                            index--
                            items.style.left = `${-index * slideSize - slideSize}px`
                        }
                    }

                    allowShift = false
                }
                function change_dots(e) {
                    // if (slidesLength < 2) return;

                    for (var i = 0; i < dots.length; i++) {
                        dots[i].classList.remove('active')
                    }
                    var _index = dots.length == index ? 0 : index
                    dots[_index].classList.add('active')
                }

                function checkIndex() {
                    items.classList.remove('shifting')
                    slideSize = items.getElementsByClassName('slide')[0].offsetWidth

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

            slide(slider, sliderItems, prev, next)
        },
    },
}
</script>

<style></style>
