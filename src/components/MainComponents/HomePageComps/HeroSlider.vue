<template>
    <swiper :navigation="true" :space-between="30" class="mySwiper z-0">
        <swiper-slide>
            <HeroSlides></HeroSlides>
        </swiper-slide>
        <swiper-slide>
            <HeroSlides></HeroSlides>
        </swiper-slide>
        <swiper-slide>
            <HeroSlides></HeroSlides>
        </swiper-slide>
        <swiper-slide>
            <HeroSlides></HeroSlides>
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import HeroSlides from './HeroSlides.vue';

export default {
    components: {
        Swiper,
        SwiperSlide,
        HeroSlides
    },
    setup() {
    },
};
</script>