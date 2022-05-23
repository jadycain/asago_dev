<template>
  <div id="app">
    <div class="wrapper" ref="wrapper">
        <Start @renderMainComp="callRefreshComp"/>
        <Main @callRefreshComp="callRefreshComp" @callMainComp="callRefreshComp" :key="componentKey" v-on:wrapperStyle="wrapperStyle"/>
        <Modal/>
    </div>
  </div>
</template>

<script>

import Start from '@/components/Start.vue'
import Main from '@/components/Main.vue'
import Modal from '@/components/Modal.vue'
import AOS from 'aos'

export default {
    name: 'App',
        components: {
        Start,
        Main,
        Modal
    },
    data() {
        return {
            componentKey: 0,
        }
    },
    methods: {
        callRefreshComp() {
            this.componentKey += 1
        
        },
        wrapperStyle() {
            const vm = this
            const wrapper = vm.$refs.wrapper
            wrapper.style.position = 'static'
        },
        onResize() {
            const vm = this
            // window.addEventListener('resize', function() {
            //     vm.refreshViewHeight()
            // })
            const resizeObserver = new ResizeObserver(entries => {
                for(const entry of entries) {
                    vm.refreshViewHeight()
                    console.log('resize')
                }
            })

            resizeObserver.observe(vm.$refs.wrapper)
        },
        refreshViewHeight() {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh',`${vh}px`)
      },
    },
    mounted() {
        AOS.init()
        this.refreshViewHeight()
        this.$nextTick(() => {
            this.onResize()
            
        })
    }

}
</script>
