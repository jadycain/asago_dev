<template>
    <div class="m-opening" :class="{ complete : isComplete }">
        <div class="m-opening__word">
            <div class="m-opening__word-asa">
                <img src="img/asa.svg" alt="">
            </div>
            <div class="m-opening__word-go" @click="cloudAnimate">
                <img src="img/go.svg" alt="">
                <svg width="83px" height="18px" class="m-opening__word-line">
                    <path class="animated" stroke-dashoffset="0" stroke-dasharray="30" stroke="white" stroke-width="1px" d="m0 18L83 18" />
                </svg>
                <img class="m-opening__word-go_cloud" src="img/cloud.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import anime from 'animejs/lib/anime.es.js';

export default {
    name: 'Start',
    data() {
        return {
            isComplete: false,
        }
    },
    methods: {
       callMainComp() {
        this.$bus.$emit("callMainComp");
      },
      openAnimate() {

            anime({
                targets: '.m-opening__word-asa',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 2000,
                delay: 500
            })

            anime({
                targets: '.m-opening__word-go',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 2000,
                delay: 1500
            })

            anime({
                targets: '.m-opening__word-line path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1000,
                delay: 1500
            })

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
                                
                    // vm.callMainComp()
                    vm.$emit('renderMainComp')
                    vm.isComplete = true
                    
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
    },
    mounted() {
      const vm = this
      vm.openAnimate()
      
    }
};
</script>

<style lang="scss">
  @import '@/scss/all.scss';
</style>