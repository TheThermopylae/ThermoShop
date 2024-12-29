<template>
    <div class="my-10">
        <slot></slot>
        <swiper :slidesPerView="4" :spaceBetween="30" :pagination="{
            clickable: true
        }" class="mySwiper mt-2">
            <swiper-slide v-for="item in products" :key="item[0]">
                <ProductCardMain :product="item"></ProductCardMain>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductCardMain from './ProductCardMain.vue';
import { inject } from 'vue';

export default {
    components: {
        Swiper,
        SwiperSlide,
        ProductCardMain,
    },
    props: ["products"],
    setup() {
        // let products = inject("products")
        return {
            // products
        };
    },
};
</script>
