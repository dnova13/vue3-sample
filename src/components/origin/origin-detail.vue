<!-- /* 
    원산지 상세 화면 컴포넌트

    - 자식 컴포넌트 
        origin
        origin-modal
        origin-trace
        image-modal
*/ -->
<template>
    <main>
        <div class="main_slide">
            <div
                class="main_img_bg"
                :style="{
                    background: 'url(' + changeImgUrl(shopInfo.companyCover) + ') no-repeat 50% 0 / contain',
                }"
            ></div>
            <div class="main_round_bg">
                <img src="img/main_round_bg.png" alt="" />
            </div>
            <div id="slider3" class="main_slide_bg">
                <div class="slide_wrapper main">
                    <div id="main_slide" class="slides">
                        <template v-for="(originInfo, idx) in originList" :key="idx">
                            <div class="main_slide_cont fade slide">
                                <origin
                                    :originInfo="originInfo"
                                    :idx="idx"
                                    :lastIdx="originList.length"
                                    :menuName="menuName"
                                    @slideEvent="slideEvent"
                                    @modalOn="modalOn"
                                >
                                </origin>
                                <origin-trace
                                    v-if="originInfo.productTrace"
                                    :traceInfo="originInfo.productTrace"
                                    :subCode="originInfo.subCode"
                                    @imgModalOn="imgModalOn"
                                >
                                </origin-trace>
                            </div>
                        </template>
                    </div>
                    <ul class="main_dots"></ul>
                    <a class="control prev main_slide_control control_prev">
                        <img src="img/main_slide_arrow_prev.png" alt="" />
                    </a>
                    <a class="control next main_slide_control control_next">
                        <img src="img/main_slide_arrow_prev.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
        <origin-modal :checkPoint="checkPoint"></origin-modal>
        <image-modal :originImage="originImage" :title="title" :content="content"></image-modal>
    </main>
    <!-- <div div id = 'dots' class= 'dot-slide main_slide_pagination' >
    </div > -->
</template>

<script>
import origin from '@/components/origin/origin'
import originModal from '@/components/origin/origin-modal'
import originTrace from '@/components/origin/origin-trace'
import imageModal from '@/components/modal/image-modal'
import {
    callAjax,
    getQueryStringObject,
    scrollTo,
    changeImgUrl,
    scrollOn,
    scrollOff,
} from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'

// ajax url 설정
let urlOrigin = _xurl.origin

export default {
    components: {
        origin,
        originModal,
        originTrace,
        imageModal,
    },
    props: [
        'menuInfo',
        'mainOriginList',
        'shopInfo',
        // 'mainOriginDetailList'
    ],
    data() {
        return {
            originList: [],
            tempList: [],
            menuName: '',
            menuCode: '',
            originCnt: 0,
            originLength: 0,
            companyCode: null,
            checkPoint: null,
            originImage: null,
            title: null,
            content: null,
        }
    },
    created() {
        this.companyCode = this.shopInfo.biznum
        const queryStrings = this.$route.query //for real server
        let productCodeArr = []

        // 메뉴를 통해 원산지 코드 필터
        if (queryStrings.menuCode) {
            let menu = this.menuInfo[queryStrings.menuCode]
            this.menuName = menu.menuName
            this.menuCode = menu.menuCode

            productCodeArr = menu.ingredients.reduce((arr, obj) => {
                if (obj.mainProduct == 1) {
                    arr.push(obj.productCode)
                }

                return arr
            }, [])

            // productCodeArr.forEach((item, idx) => {
            //     let productObj = { productCode: item };
            //     callAjax(urlOrigin, productObj, this, this.getData, this.isError, idx);

            //     this.originIdx = idx;
            // });
        }
        // 주 원재료 페이지에서의 원산지 코드 필터
        else {
            this.menuName = '주 원재료'
            this.menuCode = 'main'

            if (this.mainOriginList) {
                productCodeArr = this.mainOriginList.map((obj) => obj.productCode)
            }

            // console.log(this.mainOriginDetailList);

            // if (this.mainOriginDetailList && Array.isArray(this.mainOriginDetailList)) {
            //     this.originList = this.mainOriginDetailList;
            //     return;
            // }
        }

        this.originLength = productCodeArr.length
        let cachedOriginList = this.getCacheOriginData(this.companyCode, this.menuCode)

        if (cachedOriginList) {
            this.originList = cachedOriginList
            return
        }

        productCodeArr.forEach((item, idx) => {
            let productObj = { productCode: item }
            callAjax(urlOrigin, productObj, this, this.getData, this.isError, idx)

            this.originIdx = idx
        })
    },
    mounted() {
        this.setActiveDot()

        const queryStrings = this.$route.query
        const productCode = queryStrings.productCode

        const index = this.originList.findIndex((origin) => origin.productCode === productCode)

        if (index !== -1) {
            const dots = document.querySelectorAll('.main_slide_dot button')
            dots[index].click()
        }

        // console.log("originList=", this.originList);
        // console.log(this.$route.query.productCode);

        // let prCode = this.$route.query.productCode;

        // console.log("index = ", this.originList.indexOf({ productCode: prCode }));
    },
    methods: {
        // 원산지 데이터 세션스토리지 통한 캐시 셋팅
        setCacheOriginData(companyCode, menuCode, _data) {
            sessionStorage.setItem(companyCode + menuCode, JSON.stringify(_data))
        },
        // 세션스토리지에서 캐시 데이터 가져옴.
        getCacheOriginData(companyCode, menuCode) {
            let cachedOriginList = sessionStorage.getItem(companyCode + menuCode)

            try {
                cachedOriginList = JSON.parse(cachedOriginList)
            } catch (error) {
                cachedOriginList = null
            }

            return cachedOriginList
        },
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // ajax 에서의 데이터 가져옴
        getData(data, param, url, idx) {
            this.tempList[idx] = data
            this.originCnt++

            if (this.originCnt === this.originLength) {
                this.originList = [...this.tempList]
                this.setCacheOriginData(this.companyCode, this.menuCode, this.originList)

                // this.checkPoint = this.originList[0].summaries;
            }
            // console.log('this.originList', this.originList);
        },
        isError() {
            return false
        },
        // 체크아웃에 대한 모달 on
        modalOn(item) {
            this.checkPoint = item

            const modal = document.getElementById('modal')
            modal.style.display = 'flex'

            scrollOff()
        },
        // 이미지 확대를 위한 모달페이지 on
        /* YJ SEOL 230510 주석처리
        imgModalOn(item) {
            this.originImage = item;

            const modal = document.getElementById('img-modal');
            modal.style.display = 'flex';

            scrollOff();
        },
         */
        // YJ SEOL 230510 수정
        imgModalOn(item) {
            if (typeof item === 'string') {
                this.originImage = item
                this.title = null
                this.content = null
                this.$emit('imgModalOn', item)
            } else if (typeof item === 'object') {
                const { title, image, content } = item
                this.title = title
                this.content = content
                this.originImage = image
                this.$emit('imgModalOn', { title, image, content })
            }

            const modal = document.getElementById('img-modal')
            modal.style.display = 'flex'

            scrollOff()
        },
        // 원산지 페이지 dot pagination 위치 셋팅
        setDotPositon() {
            const pagination = document.querySelector('.main_dots')
            // YJ SEOL 230517 pagination 에러로 코드 추가
            if (!pagination) {
                // console.error("pagination element is not vailed");
                return
            }
            let tapVal = window.getComputedStyle(pagination).getPropertyValue('top')
            /* YJ SEOL 230504 topVal 에러로 주석처리 후 if문 추가
            let topVal = window.getComputedStyle(pagination).getPropertyValue('top');

            // 메인 슬라이드 화면안에 보이는 실제 위치 구함
            const mainSlideDiv = document.querySelector('#main_slide');
            const rectMainSlide = mainSlideDiv.getBoundingClientRect();
            // console.log('.#main_slide', 'top', rectMainSlide.top);

            // 메인 슬라이드 안에서 화면 안에 보이는 이미지 실제 위치 구함.
            const imgDiv = document.querySelector('.inner_wide_container');
            const rectImg = imgDiv.getBoundingClientRect();

            // console.log('그림 마지막 ', rectImg.bottom);
            // console.log('dot 위치', rectImg.bottom - rectMainSlide.top);

            let dotTop = rectImg.bottom - rectMainSlide.top + 10;

            // console.log('dot 위치', dotTop);
            document.querySelector('.main_dots').style.top = dotTop + 'px';
            */

            if (pagination instanceof Element) {
                let topVal = window.getComputedStyle(pagination).getPropertyValue('top')

                // 메인 슬라이드 화면안에 보이는 실제 위치 구함
                const mainSlideDiv = document.querySelector('#main_slide')
                const rectMainSlide = mainSlideDiv.getBoundingClientRect()
                // console.log('.#main_slide', 'top', rectMainSlide.top);

                // 메인 슬라이드 안에서 화면 안에 보이는 이미지 실제 위치 구함.
                const imgDiv = document.querySelector('.inner_wide_container')
                const rectImg = imgDiv.getBoundingClientRect()

                // console.log('그림 마지막 ', rectImg.bottom);
                // console.log('dot 위치', rectImg.bottom - rectMainSlide.top);

                let dotTop = rectImg.bottom - rectMainSlide.top + 10

                // console.log('dot 위치', dotTop);
                document.querySelector('.main_dots').style.top = dotTop + 'px'
            } else {
                // console.error('pagination element is not valid');
            }
        },
        // 원산지 페이지 슬라이드 메소드
        slide(wrapper, items, prev, next) {
            let posX1 = 0,
                posX2 = 0,
                posY1 = 0,
                posY2 = 0,
                posInitial,
                posFinal,
                threshold = 50,
                slides3 = items.getElementsByClassName('main_slide_cont'),
                slidesLength = slides3.length,
                slideSize = items.getElementsByClassName('main_slide_cont')[0].offsetWidth,
                firstSlide = slides3[0],
                lastSlide = slides3[slidesLength - 1],
                cloneFirst = firstSlide.cloneNode(true),
                cloneLast = lastSlide.cloneNode(true),
                index = 0,
                allowShift = true,
                dragIdx = 0,
                isX = true

            const pagination = document.querySelector('.main_dots')
            const dots = document.getElementsByClassName('main_slide_dot')

            /* Create pager dot */
            for (let i = 0; i < slides3.length; i++) {
                // if (slidesLength < 2) break;

                if (i === 0)
                    pagination.innerHTML += `<li class="active main_slide_dot"><button></button></li>`
                else pagination.innerHTML += `<li class="main_slide_dot"><button></button></li>`
            }

            /* dot 위치 조절 */
            this.setDotPositon()
            setTimeout(this.setDotPositon, 2000)

            /* Clone first and last slide */
            items.appendChild(cloneFirst)
            items.insertBefore(cloneLast, firstSlide)

            wrapper.classList.add('loaded')

            /* Children swiper-slide init */
            this.swiperSlideInit(items, slidesLength, dragStart, dragEnd, dragAction)

            /*  Main move events */
            if (slidesLength > 1) {
                // Mouse events
                items.onmousedown = dragStart

                // Touch events
                items.addEventListener('touchstart', dragStart)
                items.addEventListener('touchend', dragEnd)
                items.addEventListener('touchmove', dragAction)

                // Click events
                //for(let a = 0; a < prev.length; a++){
                prev.addEventListener('click', function () {
                    shiftSlide(-1)
                })
                //}

                //for(let a = 0; a < next.length; a++){
                next.addEventListener('click', function () {
                    shiftSlide(1)
                })
            } else {
                prev.style.display = 'none'
                next.style.display = 'none'
            }

            /* Transition events */
            items.addEventListener('transitionend', checkIndex)

            /* Pager dot clike event */
            for (let d = 0; d < dots.length; d++) {
                ;(function (dotIndex) {
                    dots[d].onclick = function () {
                        if (dotIndex !== index) {
                            slideSize = items.getElementsByClassName('main_slide_cont')[0].offsetWidth

                            items.classList.add('shifting')
                            items.style.left = '-' + slideSize * (dotIndex + 1) + 'px'
                            index = dotIndex

                            clearTraceDoc()
                        }
                    }
                })(d)
            }

            /* slide event functions */
            function dragStart(e) {
                e = e || window.event
                posInitial = items.offsetLeft

                // 유통이력 부분 슬라이드 이벤트 막음.
                if (e.target.closest('.ingredient_detail')) return

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
                $('.process_wrap').addClass('disable_click')

                // 유통이력 부분 슬라이드 이벤트 막음.
                if (e.target.closest('.ingredient_detail')) return

                if (e.type == 'touchmove') {
                    dragIdx++

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

                // if (Math.abs(posX2) <= 1) return;
                items.style.left = items.offsetLeft - posX2 + 'px'
            }

            function dragEnd(e) {
                posFinal = items.offsetLeft

                $('.process_wrap').removeClass('disable_click')
                e.stopPropagation()

                // 유통이력 부분 슬라이드 이벤트 막음.
                if (e.target.closest('.ingredient_detail')) return

                // if (posFinal - posInitial < -threshold) {
                //     shiftSlide(1, 'drag');
                // } else if (posFinal - posInitial > threshold) {
                //     shiftSlide(-1, 'drag');

                if (posFinal - posInitial < -threshold) {
                    shiftSlide(1, 'drag')
                } else if (posFinal - posInitial > threshold) {
                    shiftSlide(-1, 'drag')
                } else {
                    slideSize = items.getElementsByClassName('main_slide_cont')[0].offsetWidth
                    items.style.left = `${-slideSize - index * slideSize}px`
                }

                document.onmouseup = null
                document.onmousemove = null

                dragIdx = 0
            }

            function shiftSlide(dir, action) {
                items.classList.add('shifting')

                if (allowShift) {
                    slideSize = items.getElementsByClassName('main_slide_cont')[0].offsetWidth

                    if (!action) {
                        posInitial = items.offsetLeft
                    }

                    if (dir == 1) {
                        // items.style.left = posInitial - slideSize + 'px';
                        index++
                        items.style.left = `${-index * slideSize - slideSize}px`
                    } else if (dir == -1) {
                        // items.style.left = posInitial + slideSize + 'px';
                        index--
                        items.style.left = `${-slideSize - index * slideSize}px`
                    }

                    clearTraceDoc()
                }

                allowShift = false
            }

            function change_dots(e) {
                if (slidesLength < 2) return

                for (var i = 0; i < dots.length; i++) {
                    dots[i].classList.remove('active')
                }
                let _index = dots.length == index ? 0 : index
                dots[_index].classList.add('active')
            }

            function checkIndex() {
                items.classList.remove('shifting')
                slideSize = items.getElementsByClassName('main_slide_cont')[0].offsetWidth

                // 첫번째 -> 마지막으로 갈경우
                if (index == -1) {
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

            function clearTraceDoc() {
                let docBtnList = document.querySelectorAll('.document_btn')

                docBtnList.forEach((docBtn) => {
                    if (docBtn.classList.contains('active')) docBtn.click()
                })
            }
        },
        // 스위퍼 슬라이드 init 함수
        swiperSlideInit(items, parentSlideLength, dragStart, dragEnd, dragAction) {
            // console.log(items.getElementsByClassName('main_slide_cont'));
            // console.log(items.getElementsByClassName('main_slide_cont').length);
            // 증빙서류 슬라이드 Swiper init
            let mySwiper = new Swiper('.swiper-container', {
                touchStartPreventDefault: true, // 터치 이벤트의 기본 동작을 막음
                touchMoveStopPropagation: true, // 상하 스크롤 이벤트를 막음
                slidesPerView: 1,
                slidesPerGroup: 1,
                observer: true,
                observeParents: false,
                touchRatio: 1,
                spaceBetween: 24,
                nested: false,
                loop: true,

                resistanceRatio: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    touchStart: function (e) {
                        items.removeEventListener('touchstart', dragStart)
                        items.removeEventListener('touchend', dragEnd)
                        items.removeEventListener('touchmove', dragAction)
                    },

                    touchEnd: function (e) {
                        if (parentSlideLength < 2) return

                        items.addEventListener('touchstart', dragStart)
                        items.addEventListener('touchend', dragEnd)
                        items.addEventListener('touchmove', dragAction)
                    },
                },
            })
        },
        // 슬라이드 evet call
        slideEvent() {
            /*메인 슬라이드*/
            let mainSlider = document.getElementById('slider3'),
                mainSliderItems = document.getElementById('main_slide'),
                prev = mainSlider.querySelector('.control_prev'),
                next = mainSlider.querySelector('.control_next')

            // TODO: 이부분 나중에 리펙토링
            this.slide(mainSlider, mainSliderItems, prev, next)

            /*증빙서류 아코디언*/
            const processBtn = document.getElementsByClassName('process_wrap')

            for (let i = 0; i < processBtn.length; i++) {
                // console.log(processBtn[i].lastElementChild);
                processBtn[i].addEventListener('click', function (e) {
                    if (!this.lastElementChild.classList.contains('document_btn')) return

                    this.nextElementSibling.classList.toggle('active')
                    this.lastElementChild.classList.toggle('active')

                    if (this.nextElementSibling.classList.contains('active')) {
                        setTimeout(() => {
                            this.nextElementSibling.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                                inline: 'nearest',
                            })
                        }, 170)
                    }
                })
            }
        },
        setActiveDot() {
            const dots = document.querySelectorAll('.main_slide_dot button')
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.setActiveDotClass(index)
                })
            })
        },
        setActiveDotClass(index) {
            const dots = document.querySelectorAll('.main_slide_dot')
            dots.forEach((dot) => {
                dot.classList.remove('active')
            })
            dots[index].classList.add('active')
        },
    },
}
</script>

<style></style>
