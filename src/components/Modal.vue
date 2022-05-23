<template>
    <div class="m-modal" :style="modalStyle">
        <div class="m-modal__container">
            <img class="m-modal__container-img" src="img/check.png" alt="">
            <div class="m-modal__container-mainmsg">
                <img  src="img/thank.svg" alt="">
            </div>
            <p class="m-modal__container-submsg">我們已經收到你的訊息，並將儘速與你聯絡。</p>
            <button class="m-modal__container-btn" @click="toggleModal">回到主頁</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data() {
        return {
            isOpen: false,
        }
    },
    computed: {
        modalStyle() {
            const vm = this
            return {
                'display': vm.isOpen ? 'flex' : 'none'
            }
        },
    },
    methods: {
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
                // vm.clearModalTimer()
            }else {
                vm.isOpen = true
                const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
                const body = document.body
                body.style.position = 'fixed'
                body.style.top = `-${scrollY}`
            }
            
        }
    },
    created() {
        const vm = this
        vm.$bus.$on("callModalComp", () => {
            vm.toggleModal()
        })
    },
    beforeDestroy() {
        const vm = this
        vm.$bus.$off("callModalComp")
    }
}
</script>