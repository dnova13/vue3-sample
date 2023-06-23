# vue-exam

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### typescript lint parser

: type script lint 로 에러 표시날 경우 인식을 못해서 생기는 경우므로 아래 설치

```
npm i @typescript-eslint/parser -D
```

### dotenv setting

```
.env.development > .env > .env.production


.env.production : 배포용 셋팅
.env.development : 개발용(localhost)
.env : 위의 개발모드와 프로덕션모드가 없을때 공통으로 들어갈 변수

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
