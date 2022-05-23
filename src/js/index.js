import '../scss/all.scss';
import SmoothScroll from 'smooth-scroll';
import anime from 'animejs';
import AOS from 'aos'; 
import axios from 'axios'
import VueAxios from 'vue-axios'

// import Vue from 'vue';

Vue.use(AOS)
Vue.use(VueAxios, axios)


Vue.component("start-component", {
    template: `<div class="m-opening" :class="{ complete : isComplete }">
        <div class="m-opening__word">
            <div class="m-opening__word-asa">
                <img src="img/asa.svg" alt="">
            </div>
            <div class="m-opening__word-go" @click="cloudAnimate($event)">
                <img class="m-opening__word-go_go" src="img/go.svg" alt="" >
                <svg width="83px" height="18px" class="m-opening__word-line">
                    <path class="animated" stroke-dashoffset="0" stroke-dasharray="30" stroke="white" stroke-width="1px" d="m0 18L83 18" />
                </svg>
                <img class="m-opening__word-go_cloud" src="img/cloud.svg" alt="">
            </div>
        </div>
    </div>`,
    props: {
        cloudAnimate: {
            type: Function,
            required: true
        },
        isComplete: {
            type: Boolean,
            default: 'complete',
            required: false
        }
    },
})


const app = new Vue({
    el: '#app',
    data() {
        return {
            update: true,
            userName: '',
            userEmail: '',
            userMsg: '',
            emailAlert: '你的信箱',
            isScrollDown: false,
            isError: false,
            unfilled: true,
            isCorrect: false,
            isComplete: false,
            isActive: false,
            currentSlideData: [],
            currentSlide: 0,
            slideOnClick: '',
            back: false,
            slideData: [
                {
                    id:0,
                    src: 'img/pv.jpg'
                },
                {
                    id:1,
                    src: 'img/pv.jpg'
                },
                {
                    id:2,
                    src: 'img/pv.jpg'
                }
            ],
            slideClickData: [
                {
                    index: 1,
                },
                {
                    index: 2,
                },
                {
                    index: 3,
                }
            ],
            timer: null,
            windowWidth: '',
            cloudScale: 35,
            hoverStyle: true,
            clickStyle: false,
            isOpen: false,
            modalTimer: null,
            isDisabled: true,
            
        }
    },
    computed: {
        changeFormData() {
            const { userName, userEmail, userMsg, isError, unfilled } = this
            return {
                userName, 
                userEmail, 
                userMsg,
                isError,
                unfilled
            }
        },
        modalStyle() {
            const vm = this
            return {
                'display': vm.isOpen ? 'flex' : 'none',
                'z-index': vm.isOpen ? '99' : '-5'
            }
        },
        isDisabledFn() {
            const vm = this
            if(vm.isCorrect) {
                return vm.isDisabled = false
            } else {
                return vm.isDisabled = true
            }
        }
    },

    watch: {
        currentSlide() {
            const vm = this
            vm.currentSlideData = vm.slideData[vm.currentSlide]
            vm.slideOnClick =  vm.currentSlideData.id
        },
        changeFormData(val) {
            if (val.isError || val.userMsg == '' || val.unfilled == true) {
                this.isCorrect = false
                return
            } 

            if (val.userName != '' && val.userMsg != '') {
                this.isCorrect = true
            } else {
                this.isCorrect = false
            }
            
        }
    },
    methods: {
        changeSlideImg(index) {
            const vm = this
            vm.slideOnClick =  index
            vm.stopSlide()
            if(index > vm.currentSlide) {
                vm.currentSlide = Math.abs(index)
                vm.back = false
            }else {
                vm.currentSlide = Math.abs(index)
                vm.back = true
            }

            setTimeout(vm.playSlide(), 2000)
        },
        playSlide() {
            const vm = this
            vm.timer = setInterval(function() {
            
                if( vm.currentSlide == 2) {
                    vm.currentSlide = 0
                }else {
                    vm.currentSlide =  vm.currentSlide + 1
                }
            }, 3000);
        },
        stopSlide() {
            const vm = this
            if(vm.timer) {
                clearInterval(vm.timer)
                vm.timer = null
            }

        },
        getScreenSize() {
            const vm = this
            vm.windowWidth = window.innerWidth
        },
        blur() {
            const isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            const vm = this
            if (!isMail.test(this.userEmail)) {
                vm.isError = true
                vm.emailAlert = '你的信箱 *請輸入正確Email格式'
            } else {
                vm.isError = false
                vm.unfilled = false
                vm.emailAlert = '你的信箱'
            }
        },
        toggleHam() {
            const vm = this
            vm.isActive = !vm.isActive
            const menuVh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--menuVh',`${menuVh}px`)
        },
        refreshViewHeight() {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh',`${vh}px`)
            document.documentElement.style.setProperty('--menuVh',`${vh}px`)
        },
        onResize() {
            const vm = this
            // window.addEventListener('resize', function() {
            //     vm.refreshViewHeight()
            // })
            const resizeObserver = new ResizeObserver(entries => {
                for(const entry of entries) {
                    vm.refreshViewHeight()
                }
            })

            resizeObserver.observe(vm.$refs.wrapper)
        },
        wordAnimate() {

            const asa = {
                targets: '.m-opening__word-asa',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1000,
                delay: 500
            }

            const go = {
                targets: '.m-opening__word-go_go',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1000,
            }

            const line = {
                targets: '.m-opening__word-line path',
                opacity: {
                    value: 1,
                    duration: 200,
                    easing: 'easeOutExpo',
                },
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1000,
                offset: '-=800',

            }

            const tl = anime.timeline({
                autoplay: true,
            })

            tl
            .add(asa)
            .add(go)
            .add(line)

            // anime({
            //     targets: '.m-opening__word-asa',
            //     opacity: [0,1],
            //     easing: "easeOutExpo",
            //     duration: 2000,
            //     delay: 500
            // })

            // anime({
            //     targets: '.m-opening__word-go',
            //     opacity: [0,1],
            //     easing: "easeOutExpo",
            //     duration: 2000,
            //     delay: 1500
            // })

            // anime({
            //     targets: '.m-opening__word-line path',
            //     strokeDashoffset: [anime.setDashoffset, 0],
            //     easing: 'easeInOutSine',
            //     duration: 1000,
            //     delay: 1500
            // })

        },
        cloudAnimate() {
            const vm = this

            if(vm.windowWidth <= 428) {
                vm.cloudScale = 20
            }else if(vm.windowWidth <= 1024) {
                vm.cloudScale = 30
            } else {
                vm.cloudScale = 35
            }

            anime({
                targets: '.m-opening__word-asa',
                scale: {
                    value: 0,
                    duration: 1000,
                    easing: 'linear'
                },
                delay: 500
            })

            const showCloudAni = {
                targets: '.m-opening__word-go_cloud',
                opacity: {
                    value: 1,
                    duration: 200,
                    easing: 'easeOutExpo',
                },
                scale: {
                    value: 2,
                    duration: 200,
                    easing: 'linear',
                },
            }

            const cloudScaleAni = {

                targets: '.m-opening__word-go_cloud',
                scale: {
                    value: vm.cloudScale,
                    duration: 2000,
                    easing: 'easeInOutSine'
                  },
                  offset: '-=100' ,
            }

            const openFadeAni = {
                targets: '.m-opening',
                backgroundColor: '#F8F9F8',
                easing: 'linear',
                duration: 10,
                offset: '-=100',
            }

            const cloudFadeAni = {

                targets: '.m-opening__word-go_cloud, .m-opening',
                opacity: {
                    value: 0,
                    duration: 500,
                    easing: 'linear',
                },
                offset: '-=100',
                complete: function() {
                    vm.pvAnimate()
                    vm.isComplete = true
                    const wrapper = vm.$refs.wrapper
                    wrapper.style.position = 'static'
                    document.getElementsByTagName('meta')['theme-color'].setAttribute('content', '#F8F9F8')
                    
                }
            }

            const tl = anime.timeline({
                autoplay: true,
            })

            tl
            .add(showCloudAni)
            .add(cloudScaleAni)
            .add(openFadeAni)
            .add(cloudFadeAni)
        },
        pvAnimate() {
            anime({
                targets: '.l-header, .m-pv__main .img-slider, .m-pv__main-img_squares',
                opacity: [0,1],
                duration: 2000,
            })

            anime({
                targets: '.m-pv__main-img_slogan-main',
                translateX: [-40,0],
                translateZ: 0,
                opacity: [0,1],
                duration: 2000,
                delay: 1000
                
            })

            anime({
                targets: '.m-pv__main-img_slogan-sub',
                translateX: [-40,0],
                translateZ: 0,
                opacity: [0,1],
                duration: 2000,
                delay: 2000
            })

            anime({
                targets: '.m-pv__main-word',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 2000,
                delay: 3000
            })
           
        },
        smoothScrollInit() {
            const vm = this
            const scroll = new SmoothScroll('a[href*="#"]', {easing: 'easeInOutQuad', header: '[data-scroll-header]'})
            document.addEventListener('scrollStart', function() {
                vm.isActive = false
            })
        },
        sendData() {
            const vm = this
            const api = 'https://intersense.ddns.net:9022/api/Message/SaveMessage'
            const qs = require('qs')
            const data = qs.stringify({
                'Email': vm.userEmail,
                'Subject': vm.userName,
                'Description': vm.userMsg,
                'MessageFrom': '3' 
            })
            
            const config = {
                method: 'post',
                url: api,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            }
            

            axios(config).then((res) => {
                if(res.data.Message == 'Success') {

                    vm.toggleModal()

                    vm.modalTimer = setTimeout(() => {

                        vm.isOpen = false
                        const body = document.body
                        const scrollY = body.style.top
                        body.style.position = ''
                        body.style.top = ''
                        window.scrollTo(0, parseInt(scrollY || '0') * -1)
                        vm.userName = ''
                        vm.userEmail = ''
                        vm.userMsg = ''
                        vm.clearModalTimer()
                    }, 3000)
                }
            }).catch(function (error) {
                console.log(error)
            })
            
        },
        clearModalTimer() {
            const vm = this
            clearTimeout(vm.modalTimer)
        },
        addHover() {
            const vm = this
            vm.hoverStyle = false
            vm.clickStyle = true
            
        },
        removeHover() {

            const vm = this
            setTimeout(() => {
                vm.clickStyle = false
            }, 1000)
            

        },
        refresh() {
            const vm = this
            vm.$forceUpdate()
            anime({
                targets: '.l-header, .m-pv__main .img-slider, .m-pv__main-img_squares',
                opacity: [1,0],
                duration: 100,
            })
            anime({
                targets: '.l-header, .m-pv__main .img-slider, .m-pv__main-img_squares',
                opacity: [0,1],
                duration: 2000,
                delay: 500
            })

            anime({
                targets: '.m-pv__main-img_slogan-main',
                translateX: [-40,0],
                translateZ: 0,
                opacity: [0,1],
                duration: 2000,
                delay: 1000
                
            })

            anime({
                targets: '.m-pv__main-img_slogan-sub',
                translateX: [-40,0],
                translateZ: 0,
                opacity: [0,1],
                duration: 2000,
                delay: 2000
            })

            anime({
                targets: '.m-pv__main-word',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 2000,
                delay: 3000
            })

            // vm.pvAnimate()
            vm.userEmail= ''
            vm.userName= ''
            vm.userMsg = ''
        },
        toggleModal() {
            const vm = this

            if(vm.isOpen) {
                vm.isOpen = false
                const body = document.body
                const scrollY = body.style.top
                body.style.position = ''
                body.style.top = ''
                window.scrollTo(0, parseInt(scrollY || '0') * -1)
                vm.userName = ''
                vm.userEmail = ''
                vm.userMsg = ''
                vm.clearModalTimer()
            }else {
                vm.isOpen = true
                const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
                const body = document.body
                body.style.position = 'fixed'
                body.style.top = `-${scrollY}`
            }
            
        }

    },
    mounted() {
        const vm = this
        vm.smoothScrollInit()
        vm.getScreenSize()
        vm.refreshViewHeight()
        vm.wordAnimate()
        AOS.init()
        let lastScrollY = 0
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop         
            var currentScrollY = this.scrollY
            if(scrollTop > 0) {
                vm.isScrollDown = true
            }else {
                vm.isScrollDown = false
                
            }
            if( currentScrollY != lastScrollY ) {
                vm.isActive = false
            }
            lastScrollY = currentScrollY

            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
        })

        
        vm.$nextTick(() => {
            vm.onResize()
            
        })

    },
    created() {
        const vm = this
        vm.currentSlideData = vm.slideData[0]
        vm.slideOnClick =  vm.currentSlideData.id
        vm.playSlide()
    },
})


