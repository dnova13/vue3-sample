<!-- // 유저 추가정보 입력 페이지( addUserInfo ) -->
<template>
    <div class="join-page">
        <div class="join-wrap">
            <div class="join-title">
                <h2 class="title">추가정보입력</h2>
            </div>
            <v-form ref="form" v-model="valid">
                <div class="join-content">
                    <v-text-field
                        v-if="!email"
                        v-model="form.email"
                        class="add-form"
                        :label="formObj.email.label"
                        placeholder="이메일을 입력하세요"
                        style="min-width: 290px"
                        variant="outlined"
                        clearable
                        required
                        :rules="formObj.email.rules"
                    ></v-text-field>
                    <v-text-field
                        v-if="!phone"
                        v-model="form.phone"
                        class="add-form"
                        :label="formObj.phone.label"
                        placeholder="'-'를 제외한 숫자만 입력하세요"
                        style="min-width: 290px"
                        variant="outlined"
                        maxlength="14"
                        clearable
                        required
                        :rules="formObj.phone.rules"
                        @input="addHyphenToPhone"
                    ></v-text-field>
                    <!-- type="date" -->
                    <v-text-field
                        v-if="!birthday"
                        v-model="form.birthday"
                        class="add-form"
                        :label="formObj.birthday.label"
                        placeholder="'-'를 제외한 숫자만 입력하세요"
                        style="min-width: 290px"
                        variant="outlined"
                        maxlength="10"
                        clearable
                        required
                        :rules="[...formObj.birthday.rules, checkBirthdayRange, checkValidDate]"
                        @input="addHyphenToBirthday"
                    ></v-text-field>
                    <div v-if="!gender" class="gender-wrap" :class="formObj.gender.error ? 'error' : ''">
                        <div class="gender-radio" style="margin-bottom: 8px">
                            <label for="gender">{{ formObj.gender.label }} : </label>
                            <div>
                                <label>
                                    <input type="radio" v-model="form.gender" value="male" required />
                                    남성
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" v-model="form.gender" value="female" required />
                                    여성
                                </label>
                            </div>
                            <!--
                            <div>
                                <label>
                                    <input type="radio" v-model="form.gender" value="other">
                                    기타
                                </label>
                            </div>
                                -->
                        </div>
                        <div
                            v-if="formObj.gender.error"
                            class="pl-2 v-messages v-messages__message .v-input__details"
                            style="font-weight: 700; letter-spacing: 0.4px"
                        >
                            {{ formObj.gender.warningText }}
                        </div>
                    </div>
                </div>
                <div class="form-group-check">
                    <label for="termsOfService">
                        <input id="termsOfService" v-model="form.agreeToTerms" type="checkbox" required />
                        <span>서비스 이용약관에 동의합니다.</span>
                    </label>
                </div>

                <div class="form-group-check">
                    <label for="privacyPolicy">
                        <input
                            id="privacyPolicy"
                            v-model="form.agreeToPrivacyPolicy"
                            type="checkbox"
                            required
                        />
                        <span>개인정보 처리방침에 동의합니다.</span>
                    </label>
                </div>
            </v-form>
            <button class="join-btn" @click="submitForm">등록</button>
        </div>
    </div>
</template>

<script>
import * as util from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'

export default {
    props: {
        uid: {
            type: String,
            default: '',
        },
        rtype: {
            type: String,
            default: '',
        },
        uname: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },
        birthday: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            valid: false,
            minDate: '1920-01-01',
            maxDate: util.getMaxDate(1),
            form: {
                email: '',
                phone: '',
                birthday: '',
                gender: '',
                agreeToTerms: true,
                agreeToPrivacyPolicy: true,
                // rawBirthday: "",
            },
            formObj: {
                email: {
                    label: 'Email',
                    rules: [
                        (v) => !!v?.trim() || '이메일을 입력하세요.',
                        (v) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            return emailRegex.test(v) ? true : '올바른 이메일 주소를 입력하세요.'
                        },
                    ],
                },
                phone: {
                    label: 'Phone',
                    rules: [
                        (v) => !!v?.trim() || '휴대폰 번호를 입력하세요.',
                        (v) => {
                            const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
                            return phoneRegex.test(v) ? true : '올바른 휴대폰 번호를 입력하세요.'
                        },
                    ],
                },
                birthday: {
                    label: 'Birthday',
                    rules: [(v) => !!v?.trim() || '올바른 생년 월일을 입력하세요.'],
                },
                gender: {
                    label: '성별',
                    rules: [],
                    error: false,
                    warningText: '성별을 선택해주세요.',
                },
            },
        }
    },
    computed: {
        checkBirthdayRange() {
            return this.form.birthday < this.minDate || this.form.birthday > this.maxDate
                ? `${this.minDate} ~ ${this.maxDate}의 날짜를 입력하세요.`
                : true
        },
        checkValidDate() {
            if (this.form?.birthday?.length === 10) {
                // console.log('sdfgdfsgdf')

                const [year, month, day] = this.form.birthday.split('-')
                const date = new Date(year, month - 1, day)

                const inputYear = date.getFullYear()
                const inputMonth = date.getMonth() + 1
                const inputDay = date.getDate()

                if (
                    parseInt(year) === inputYear &&
                    parseInt(month) === inputMonth &&
                    parseInt(day) === inputDay
                ) {
                    return true
                }

                return '올바른 날짜를 입력하세요.'
            }

            return true
        },
    },
    created() {
        this.form.email = this.email
        this.form.phone = this.phone
        this.form.birthday = this.birthday
        this.form.gender = this.gender

        // console.log(this.email, this.phone, this.birthday, this.gender)
        // console.log(this.form)
    },
    mounted() {
        this.$emit('setTrigger', '/join')
    },
    methods: {
        submitForm() {
            // console.log('AAAAAAAAAAAAAA')

            this.$refs.form.validate()

            if (this.form.gender) {
                this.formObj.gender.error = false
            } else {
                this.formObj.gender.error = true
            }

            this.valid =
                this.valid && this.form.gender && this.form.agreeToTerms && this.form.agreeToPrivacyPolicy

            // console.log('this.valid', this.valid)

            // ajax 출력
            if (this.valid) {
                let data = {
                    ID: this.uid,
                    rtype: this.rtype,
                    mail: this.form.email,
                    phone: this.form.phone,
                    birth: this.form.birthday,
                    // phone: this.form.phone.replaceAll('-', ''),
                    // birth: this.form.birthday.replaceAll('-', ''),
                    gender: this.form.gender,
                    username: this.uname,
                }

                util.ajaxFetchJson(_xurl.signup, 'POST', data).then(async (res) => {
                    if (res.ok) {
                        let result = await res.json()

                        if (result.rows.exist) {
                            alert('이미 가입한 사용자 입니다.')
                            this.goLogin()
                            return
                        }

                        localStorage.setItem('token', result.profile.token)
                        this.goHome()
                        // util.setCookie('token', result.profile.token)
                    } else {
                        alert('server error')
                    }
                })
            } else {
                alert('올바르게 입력해주세요.')
            }
        },
        inputOnlyNumber(v) {},
        addHyphenToPhone() {
            // this.form.phone = this.form.phone.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            this.form.phone = this.form.phone.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')

            let phone = this.form.phone
            this.form.phone = this.form.phone.trim()

            if (phone.length < 4) {
                this.form.phone = phone
            } else if (phone.length < 7) {
                this.form.phone = phone.slice(0, 3) + '-' + phone.slice(3)
            } else if (phone.length <= 10) {
                this.form.phone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6)
            } else if (phone.length < 12) {
                this.form.phone = phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7)
            } else if (phone.length < 14) {
                this.form.phone = phone.slice(0, 4) + '-' + phone.slice(4, 8) + '-' + phone.slice(8, 12)
            }
        },
        addHyphenToBirthday() {
            let birthday = this.form.birthday.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')

            if (birthday.length <= 4) {
                this.form.birthday = birthday
            } else if (birthday.length <= 7) {
                this.form.birthday = birthday.slice(0, 4) + '-' + birthday.slice(4)
            } else if (birthday.length <= 10) {
                this.form.birthday =
                    birthday.slice(0, 4) + '-' + birthday.slice(4, 6) + '-' + birthday.slice(6)
            }
        },
        goHome(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
        goLogin(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/login' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>
<style scoped>
.add-form {
    margin-bottom: 14px;
}

/* 추가정보 입력 */
.gender-wrap {
    margin-bottom: 5px;
}

.gender-wrap.error {
    /* color: #b00020; */
    color: #830018;
}

.gender-radio {
    display: flex;
    align-items: center;
    /* margin-bottom: 40px; */
}

.gender-radio label {
    margin-right: 10px;
}

/* v-text-field 에러 메세지 컬러 */
/* .v-input__slot::after {
    border-color: rgba(255, 0, 0, 0.7) !important;
}

.v-input__slot::before {
    border-color: rgba(255, 0, 0, 0.7) !important;
}
.error--text {
    color: rgba(255, 0, 0, 0.7) !important;
} */
</style>
