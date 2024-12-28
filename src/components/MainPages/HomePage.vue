<template>
    <div class="px-20 py-5 z-20">
        <Teleport to="title"> | Home Page</Teleport>
        <HeroSlider></HeroSlider>
    </div>
</template>

<script>
import HeroSlider from '../MainComponents/HeroSlider.vue';
export default {
    components:{
        HeroSlider
    },
    setup() {
        return {

        }
    }
}
</script>