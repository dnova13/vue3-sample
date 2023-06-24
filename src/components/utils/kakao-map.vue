<!-- // kakaoMap 컴포넌트 등록 -->
<template>
    <div class="map-inner">
        <div id="map" class="map-container"></div>
        <!-- 230519 YJ-SEOL 다이닝맵수정
            <div class="custom_gps radius_border">
                <span>
                    @
                </span>
            </div>
            <div class="custom_zoomcontrol radius_border">
                <span @click="zoomIn">
                    <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대">
                </span>
                <span @click="zoomOut">
                    <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소">
                </span>
            </div>
            -->
    </div>
</template>

<script>
export default {
    props: ['shopInfo'],
    data() {
        return {
            map: null,
        }
    },
    mounted() {
        this.$emit('setTrigger', '/diningMap')

        if (window.kakao && window.kakao.maps) {
            // 카카오 객체가 있고, 카카오 맵 그릴 준비가 되어 있다면 맵 실행
            this.loadMap()
        } else {
            // 없다면 카카오 스크립트 추가 후 맵 실행
            this.loadScript()
        }
    },
    create() {},
    methods: {
        loadScript() {
            const script = document.createElement('script')
            // &autoload=false => api를 로드 후 맵 그리는 함수가 실행되도록 구현
            script.src =
                '//dapi.kakao.com/v2/maps/sdk.js?appkey=d7e5699dd69b26ed294be3bf88e1df44&autoload=false'
            // 스크립트 로드가 끝나고 지도를 실행될 준비가 되어있다면 지도 실행
            script.onload = () => window.kakao.maps.load(this.loadMap)

            // html -> head 안에 스크립트 소스 추가
            document.head.appendChild(script)
        },
        loadMap() {
            // 현재위치 위도 경도 구하기
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        /*
                         const lat = position.coords.latitude; //위도
                         const lng = position.coords.longitude; //경도
                        console.log(lat);
                        console.log(lng);
 */
                        let lat = position.coords.latitude
                        let lng = position.coords.longitude

                        switch (this.shopInfo?.biznum) {
                            case '2554400846':
                                // 230518 YJ SEOL 호온시
                                lat = 35.15834997615203
                                lng = 129.11349170996698
                                break
                            case '1013697898':
                                // 230519 YJ SEOL 카이린 대구현대점
                                lat = 35.866626804823924
                                lng = 128.59061226683292
                                console.log('카이린 대구현대')
                                break
                            case '6408501954':
                                // 230519 YJ SEOL 조아수산 만덕직영점
                                lat = 35.212687315737334
                                lng = 129.02491387563998
                                console.log('조아수산')
                                break
                            default:
                                lat //위도
                                lng //경도
                                break
                        }

                        // 지도 담을 DOM 영역
                        const container = document.getElementById('map')
                        const options = {
                            center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
                            level: 3, // 지도의 확대 레벨
                        }

                        // 지도 생성 및 객체 리턴
                        this.map = new window.kakao.maps.Map(container, options)

                        // 마커 표시 위치
                        const markerPosition = new kakao.maps.LatLng(lat, lng)

                        // 마커 기본 이미지 변경
                        const imageSrc = '/img/allCategory/dining_map_icon.svg'
                        const imageSize = new window.kakao.maps.Size(34, 39) // 마커 이미지 크기
                        // const imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지 옵션

                        // 마커 이미지 정보를 가진 마커이미지 생성
                        const markerImage = new window.kakao.maps.MarkerImage(
                            imageSrc,
                            imageSize
                            // imageOption
                        )

                        // 마커생성
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage, // 마커이미지 설정
                        })

                        console.log(marker)

                        // 마커 추가 후
                        marker.setMap(this.map)

                        // 마커의 위치를 중심으로 지도를 이동
                        this.map.setCenter(markerPosition)

                        // 드래그 비활성화
                        this.map.setDraggable(false)

                        // 마우스 휠 지도 확대, 축소 비활성화
                        this.map.setZoomable(false)
                    },
                    (error) => {
                        console.error(error)
                    }
                )
            } else {
                console.error('현재 브라우저에서는 위치정보가 지원되지 않습니다.')
            }
        },
        zoomIn() {
            this.map.setLevel(this.map.getLevel() - 1)
            console.log('축소')
        },
        zoomOut() {
            this.map.setLevel(this.map.getLevel() + 1)
            console.log('확대')
        },
    },
}
</script>

<style></style>
