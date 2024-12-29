<template>
    <div class="px-20 py-5 z-20">
        <Teleport to="title"> | Home Page</Teleport>
        <HeroSlider></HeroSlider>
        <ProductCardSlider :products="mobiles">
            <div class="flex justify-between text-2xl">
                <p>Mobiles</p>
                <router-link class="flex items-center gap-2 text-primary" to="/">More <i
                        class="fa-solid fa-arrow-right"></i></router-link>
            </div>
        </ProductCardSlider>
        <ProductCardSlider :products="laptops">
            <div class="flex justify-between text-2xl">
                <p>Laptops</p>
                <router-link class="flex items-center gap-2 text-primary" to="/">More <i
                        class="fa-solid fa-arrow-right"></i></router-link>
            </div>
        </ProductCardSlider>
    </div>
</template>

<script>
import { computed, inject, ref } from "vue";
import HeroSlider from "../MainComponents/HomePageComps/HeroSlider.vue"
import ProductCardSlider from "../MainComponents/HomePageComps/ProductCardSlider.vue"
export default {
    components: {
        HeroSlider,
        ProductCardSlider
    },
    setup() {
        let products = inject("products")
        let mobiles = computed(() => products.value.filter(product => product[1].category == "mobile"))
        let laptops = computed(() => products.value.filter(product => product[1].category == "laptop"))

        return {
            mobiles,
            laptops
        }
    }
}
</script>