<template>
    <div class="px-20 py-5" v-if="targetProduct">
        <h2 class="text-2xl text-center">{{ targetProduct[1].name }}</h2>
        <div class="mt-5 flex justify-between items-center">
            <img class="w-1/3" :src="targetProduct[1].img" :alt="targetProduct[1].name + ' image'">
            <AddToBasket :product="targetProduct"></AddToBasket>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import AddToBasket from '../MainComponents/TargetProductcomps/AddToBasket.vue';

export default {
    components: {
        AddToBasket
    },
    setup() {
        let route = useRoute()

        let products = inject("products")
        let targetProduct = computed(() => products.value.find(product => product[0] == route.params.id))

        return {
            route,
            targetProduct,
        }
    }
}
</script>