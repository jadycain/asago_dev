<template>
    <div>
        <header data-scroll-header class="l-header" id="gotop" :class="{ scrollDown : isScrollDown }">
            <a @click="refreshComp" class="l-header__logo">
                <img src="img/logo.png" alt="">
            </a>
            <ul class="l-header__menu" :class="{ active : isActive }">
                <li class="l-header__menu-item">
                    <a data-scroll href="#services">Services</a>
                </li>
                <li class="l-header__menu-item">
                    <a data-scroll href="#projects">Works</a>
                </li>
                <li class="l-header__menu-item">
                    <a data-scroll href="#about">About us</a>
                </li>
                <li class="l-header__menu-item">
                    <a data-scroll href="#mail">Contact</a>
                </li>
            </ul>
            <div class="l-header__hamburger" :class="{ active : isActive }" @click="toggleHam()" >
                <span class="l-header__hamburger-hambar"></span>
                <span class="l-header__hamburger-hambar"></span>
                <span class="l-header__hamburger-hambar"></span>
            </div>
        </header>
        <div class="m-pv" >
            <div class="m-pv__main">
                <div class="m-pv__main-img">
                    <transition-group tag="div" class="img-slider" :name="back ? 'slideback' : 'slide'">
                        <div class="img-container" v-for="number in [currentSlide]" v-bind:key="number" >
                            <img :src="currentSlideData.src" alt="">
                            <!-- <img :src="require(`${currentSlideData.src}`)" /> -->
                        </div>
                    </transition-group>
                    <div class="m-pv__main-img_slogan">
                        <div class="m-pv__main-img_slogan-main">
                            <img src="img/slogan_main.svg" alt="">
                        </div>
                        <div class="m-pv__main-img_slogan-sub">
                            <img src="img/slogan_sub.svg" alt="">
                        </div>
                    </div>
                    <ul class="m-pv__main-img_squares" >
                            <li class="m-pv__main-img_squares-square" @click="changeSlideImg(item.index-1)" v-for="item in slideClickData" :key="item.index" :class="[slideOnClick == item.index-1 ? 'm-pv__main-img_squares-square onClick' : '']"></li>
                    </ul>
                </div>
                <div class="m-pv__main-word">
                    <p>以數位為基礎</p>
                    <p>品牌與內容服務為導向</p>
                    <p>為你打造理想的作品</p>
                </div>
            </div>
        </div>
        <div class="m-services" id="services">
            <div class="l-container">
                <h3 class="m-services__title" data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-offset="0" data-aos-duration="500">
                    Services
                </h3>
                <div class="m-services__content" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                    <div class="m-services__content-box">
                        <img src="img/icon_1.png" alt="">
                        <div class="m-services__content-box_word">
                            <p class="en">UI/UX Design</p>
                            <p class="ch">網站及App設計</p>
                        </div>
                    </div>
                    <div class="m-services__content-box">
                        <img src="img/icon_2.png" alt="">
                        <div class="m-services__content-box_word">
                            <p class="en">Brand Design</p>
                            <p class="ch">品牌形象設計</p>
                        </div>
                    </div>
                    <div class="m-services__content-box">
                        <img src="img/icon_3.png" alt="">
                        <div class="m-services__content-box_word">
                            <p class="en">Digital Marketing</p>
                            <p class="ch">數位產品企劃/行銷</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- works -->
        <div class="m-projects" id="projects">
            <div class="l-container"  data-aos="fade-up" data-aos-duration="1500">
                <h3 class="m-projects__title" >
                    Our Projects
                </h3>
                <div class="m-projects__imgs">
                    <div class="m-projects__imgs-one">
                        <img src="img/project_1.jpg" alt="">
                    </div>
                    <div class="m-projects__imgs-two">
                        <img src="img/project_2.jpg" alt="">
                    </div>
                    <div class="m-projects__imgs-bottom">
                        <div class="m-projects__imgs-bottom_three">
                            <img src="img/project_3.jpg" alt="">
                        </div>
                        <div class="m-projects__imgs-bottom_four">
                            <img src="img/project_4.jpg" alt="">
                        </div>
                    </div>
                </div>
                <a href="" class="m-projects__more">
                    Click here to read more
                </a>
            </div>
        </div>
        <!-- about us -->
        <div class="m-about" id="about">
            <div class="l-container" data-aos="fade-up" data-aos-duration="1500">
                <h3 class="m-about__title">
                    Asago
                </h3>
                <div class="m-about__mark">
                    <img src="img/mark.png" alt="">
                </div>
                <div class="m-about__content">
                    <div class="m-about__content-first">
                        <p>阪森以數位為基礎</p>
                        <p>，</p>
                        <p>品牌與內容服務為導向的團隊</p>
                    </div>
                    <div class="m-about__content-first">
                        <p>我們做點專案並以創造為樂</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- contact us -->
        <div class="m-mail" id="mail">
            <div class="l-container" data-aos="fade-up" data-aos-duration="1500">
                <h3 class="m-mail__title">
                    Mail Us
                </h3>
                <p class="m-mail__detail">你有任何想法嗎？留下它，便能開啟我們的談話。</p>
                <ul class="m-mail__form">
                    <li class="m-mail__form-item">
                        <label class="label" for="name">如何稱呼你</label>
                        <input class="m-mail__form-item_name" type="text" placeholder="Your name"  id="name" v-model="userName">
                    </li>
                    <li class="m-mail__form-item">
                        <label class="label" for="email" :class="{ erroLabel : isError }">{{ emailAlert }}</label>
                        <input class="m-mail__form-item_email" type="email" name="" id="email" placeholder="email" v-model="userEmail" @blur="blur" :class="{ erroInput : isError }">
                    </li>
                    <li class="m-mail__form-item">
                        <label class="label" for="message">訊息內容</label>
                        <textarea class="m-mail__form-item_msg" placeholder="Leave your message here" id="message" v-model="userMsg"></textarea>
                    </li>
                    <li class="m-mail__form-item">
                        <button @click="sendData" class="m-mail__form-item_submit" :class="{ formCorrect : isCorrect }">Submit</button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- footer -->
        <footer class="l-footer">
            <div class="l-footer__bg"></div>
            <div class="l-footer__container">
                <div class="l-footer__container-content">
                    <div class="l-footer__container-content_contact">
                        <div class="title">
                            <img src="img/contact.svg" alt="">
                        </div>
                        <div class="content">
                            <p>design@asago.com.tw</p>
                            <a href="tel:+886-2-2678-6980#6009">02 26786980 #6009</a>
                        </div>
                    </div>
                    <div class="l-footer__container-content_follow">
                        <div class="title">
                            <img src="img/follow.svg" alt="">
                        </div>
                        <div  class="content">
                            <img src="img/behance.svg" alt="">
                        </div>
                    </div>
                </div>
                <a data-scroll href="#gotop" class="l-footer__gotop"  :class="{ gotopHover : hoverStyle,  gotopBg : clickStyle}" @touchstart="addHover" @touchend="removeHover">
                    <svg width="21" height="24" viewBox="0 0 21 24" fill="none">
                        <path d="M1 10.5L10.5 1M10.5 1L20 10.5M10.5 1V23.5" stroke="#FFB930"/>
                    </svg>
                </a>
                <div class="l-footer__container-copyright">
                    <p>© 2022 ASAGO. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import anime from 'animejs/lib/anime.es.js';
import SmoothScroll from 'smooth-scroll';
// import AOS from 'aos'; 

// Vue.use(VueAxios, axios)

export default {
    name: 'Main',
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
            scroll: null
            
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
        refreshComp() {
            this.$emit('callRefreshComp')
        },
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
            //     console.log(123)
            //     vm.refreshViewHeight()
            // })
            const resizeObserver = new ResizeObserver(entries => {
                for(const entry of entries) {
                    console.log(vm.$refs.wrapper)
                }
            })

            resizeObserver.observe(vm.$refs.wrapper)
        },
        smoothScrollInit() {
            const vm = this
            vm.scroll = new SmoothScroll('a[href*="#"]', {easing: 'easeInOutQuad', header: '[data-scroll-header]'})
            this.scrollEvent = () => {
                vm.isActive = false
                console.log('start')
            }
            document.addEventListener('scrollStart', this.scrollEvent)
        },
        sendData() {
            const vm = this
            const api = 'https://intersense.ddns.net:9022/api/Message/SaveMessage'
            const qs = require('qs');
            const data = qs.stringify({
                'Email': vm.userEmail,
                'Subject': 'test',
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

            vm.callModalComp()

            // if(!vm.isCorrect) {
            //     alert('表單尚未填寫完成')
            //     return
            // }else {
            //     axios(config).then((res) => {
            //         console.log(res)
            //     }).catch(function (error) {
            //         console.log(error);
            //       });
            // }
            
        },
        addHover() {
            const vm = this
            vm.hoverStyle = false
            vm.clickStyle = true
            console.log(456)
            
        },
        removeHover() {

            const vm = this
            setTimeout(() => {
                vm.clickStyle = false
            }, 1000)
            

        },
        pvAnimate() {
            const vm = this
            vm.$emit('wrapperStyle')
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
        callModalComp() {
            this.$bus.$emit("callModalComp")
        },
        
    },
    mounted() {
        const vm = this
        vm.smoothScrollInit()
        vm.getScreenSize()
        vm.refreshViewHeight()
        // AOS.init()
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

        
        // vm.$nextTick(() => {
        //     vm.onResize()
            
        // })

        // if(vm.$parent.componentKey > 0) {
        //     vm.pvAnimate()
        // }

        vm.pvAnimate()

        
    },
    created() {
            const vm = this
            vm.currentSlideData = vm.slideData[0]
            vm.slideOnClick =  vm.currentSlideData.id
            vm.playSlide()
            // vm.$bus.$on("callMainComp", () => {
            //     vm.pvAnimate()
            // })
    },
    beforeDestroy: function() { 
        const vm = this
        // vm.$bus.$off("callMainComp")
        document.removeEventListener('scrollStart', this.scrollEvent)
        vm.scroll.destroy()
    }
};
</script>

<style lang="scss">
  @import '../scss/all.scss';
</style>