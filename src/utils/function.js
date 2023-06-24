import { imgUrl } from '#/localSettings.js' // 주 이미지 url

// ajax function
export const callAjax = function (url, param, vueComponent, ajaxDone, ajaxFail, idx) {
    //companyCode 인지 productCode인지 확인하여 req data 분류
    const companyExp = /(\d{10})/gi
    const prodExp = /(PB|GO|MN)/gi

    if (Object.keys(param).includes('companyCode') && param.companyCode) {
        if (param.companyCode == '2687500472') {
            param.companyCode = '2554400846'
        }
    }

    $.ajax({
        url: url,
        method: 'GET',
        data: param,
        crossDomain: true,
        xhrFields: { withCredentials: false },
        dataType: 'json',
        context: vueComponent,
    })
        .done(function (data) {
            ajaxDone(data, param, url, idx)
        })
        .fail(function (xhr, status, errorThrown) {
            respErrorHandler(xhr, url, null, param, vueComponent, ajaxFail)
        })
}

// ajax error handler
function respErrorHandler(xhr, url, code, param, vueComponent, ajaxFail) {
    switch (xhr.status) {
        case 404: // Not Found
            console.log('404', xhr.responseJSON)
            goLink(vueComponent, param, '/404')
            break
        case 500:
            goLink(vueComponent, param, '/error')
            break
        default:
            goLink(vueComponent, param, '/error')
    }
}

// foward url link
function goLink(vueComponent, param, addr) {
    vueComponent.onScreen = true
    vueComponent.$router
        .push({
            path: addr,
            query: param,
        })
        .catch((e) => {
            // console.log(e);
        })
}

// ger url query string
export const getQueryStringObject = () => {
    const queryStrings = window.location.search.substr(1).split('&')
    if (queryStrings == '') return {}
    const obj = {}
    queryStrings.forEach((string, index) => {
        let query = string.split('=')
        if (query.length === 1) obj[query[0]] = ''
        else obj[query[0]] = decodeURIComponent(query[1].replace(/\+/g, ' '))
    })
    return obj
}

// 세로 scrollIntoView event 함수화
export const scrollTo = function (target) {
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        })
    }
}

// 가로 scrollIntoView event 함수화
export const horizonalScrollTo = function (target, _inline) {
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: _inline,
        })
    }
}

// 스크롤 기능 on
export const scrollOn = function () {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    html.classList.remove('not_scroll')
    body.classList.remove('not_scroll')
}

// 스크롤 기능 off
export const scrollOff = function () {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    html.classList.add('not_scroll')
    body.classList.add('not_scroll')

    // TODO : 사파리에서 모달창 뜰시 스크롤 되는 동작 막기
    // window.addEventListener(
    //     'touchmove',
    //     function (e) {
    //         console.log('AAAAAAAA', e.target);
    //         // alert(e.target == modal);

    //         if (e.target === modal) {
    //             // alert(`${e.target.tagName}_${e.target.className}_`);
    //             e.preventDefault();
    //         }
    //     },
    //     { passive: false }
    // );
}

// 일반 문자열 줄바꿈 -> html 줄바꿈 태그로 변경 함수
export const handleNewLine = function (str) {
    return String(str).replace(/(?:\r\n|\r|\n|\\n)/g, '</br>')
}

// 최근 검색어 localstroage 저장 함수
export const saveSearchWord = (searchWord, _key) => {
    // 검색 표시 제한 개수
    const limitLength = 5
    const key = `searchWords_${_key}`

    let searchWords = localStorage.getItem(key) || '[]'
    searchWords = JSON.parse(searchWords)

    // 검색 단어 모든 공백 -> space 1로 필터 처리
    searchWord = searchWord.trim().replace(/\s+/, ' ')

    // 최근에 검색한 단어가 있을 경우, 검색된 단어 배열 제거
    if (searchWords.length > 0 && searchWords.indexOf(searchWord) >= 0) {
        // return searchWords;
        searchWords.splice(searchWords.indexOf(searchWord), 1)
    }

    // 검색 제한 개수 초과시 맨 마지막 검색어 제거
    if (searchWords.length === limitLength) searchWords.pop()

    searchWords.unshift(searchWord)
    localStorage.setItem(key, JSON.stringify(searchWords))

    return searchWords
}

// 최근 검색어 localstroage 삭제 함수
export const removeSearchWord = (idx, _key) => {
    const key = `searchWords_${_key}`
    let searchWords = localStorage.getItem(key)

    searchWords = JSON.parse(searchWords)
    searchWords.splice(idx, 1)

    localStorage.setItem(key, JSON.stringify(searchWords))

    return searchWords
}

// 이미지 url 변경 함수
export const changeImgUrl = (_img) => {
    let imgbbUrl = 'https://i.ibb.co'

    if (!_img) return _img

    if (!_img.includes('http')) {
        _img = imgUrl + _img
    } else if (_img.includes(imgbbUrl)) {
        _img = imgUrl + _img.replace(imgbbUrl, '/web-img/imgbb')
    }

    return _img
}

// jsonString 구별 함수
export function isJsonString(str) {
    try {
        JSON.parse(str)
        return true
    } catch (e) {
        return false
    }
}

export function ajaxFetchGet(url, params, _hearders) {
    let urlObj = new URL(url)
    urlObj.search = new URLSearchParams(params).toString()

    return fetch(urlObj, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            ..._hearders,
        },
        // body: params ? params : null,
    })
}

export function ajaxFetchQuery(url, method, params, _hearders) {
    let urlObj = new URL(url)
    urlObj.search = new URLSearchParams(params).toString()

    return fetch(urlObj, {
        method: method,
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            ..._hearders,
        },
        // body: params ? params : null,
    })
}

export function ajaxFetchJson(url, method, data, _hearders) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ..._hearders,
        },
        body: data ? JSON.stringify(data) : null,
    })
}

export function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace('_', '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

// 쿠키 설정하기
export function setCookie(name, value, hours) {
    const date = new Date()
    let cookieValue = encodeURIComponent(value) + '; '

    // console.log('cookieValue', cookieValue)

    if (hours) {
        date.setTime(date.getTime() + hours * 60 * 60 * 1000)
        // date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString()
        cookieValue = cookieValue + expires
    }

    document.cookie = name + '=' + cookieValue
}

// 쿠키 가져오기
export function getCookie(name) {
    const cookieString = document.cookie
    const cookies = cookieString.split('; ')

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=')
        const cookieName = decodeURIComponent(cookie[0])

        if (cookieName === name) {
            const cookieValue = decodeURIComponent(cookie[1])
            return cookieValue
        }
    }

    return null
}

// 쿠키 삭제하기
export function deleteCookie(name) {
    console.log('del', name)

    document.cookie = name + '=; Max-Age=-99999999;'
}

// YYYY-mm-dd 형식으로 가져옴
export function getToday() {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()

    // 월과 일이 한 자리 수인 경우 앞에 0을 추가하여 두 자리 수로 만듭니다.
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day

    return `${year}-${month}-${day}`
}

export function getMaxDate(_year) {
    const today = new Date()
    const year = today.getFullYear() - _year

    let month = 12
    let day = 31

    if (!_year) {
        today.getMonth() + 1
        today.getDate()

        // 월과 일이 한 자리 수인 경우 앞에 0을 추가하여 두 자리 수로 만듭니다.
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
    }

    return `${year}-${month}-${day}`
}

export function kebabToCamel(kebabCase) {
    let words = kebabCase

    try {
        let wordArr = kebabCase.split('-') // 하이픈을 기준으로 단어를 분리합니다
        let camelCase =
            wordArr[0] +
            wordArr
                .slice(1)
                .map(function (v) {
                    return v.charAt(0).toUpperCase() + v.slice(1)
                })
                .join('')

        words = camelCase
    } catch (error) {}

    return words
}

// ext : 가져올 확장자
export function importFilesInFolder(ext, files) {
    // 폴더 내 파일을 가져오기 위해 require.context를 사용
    // require.context : 정적 사용이라서 정규식에서는 변수 패턴 사용이 안됨.
    // const files = require.context('./', true, /\.(js|jsx|ts|tsx|vue)$/)

    let modules = {}

    files.keys().forEach((key) => {
        let pattern = new RegExp(`\\.${ext}$`)

        if (pattern.test(key)) {
            pattern = new RegExp(`(\\.\\/|\\.${ext})`, 'g')

            // 파일 이름에서 './'과 '.vue'를 제거하여 모듈 이름을 추출합니다.
            let moduleName = key.replace(pattern, '')
            moduleName = kebabToCamel(moduleName)

            // 파일을 해당 모듈 이름으로 가져옵니다.
            modules[moduleName] = files(key).default
        }
    })

    return modules
}
