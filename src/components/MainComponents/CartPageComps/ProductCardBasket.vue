<template>
    <div class="flex items-center mb-5 border-b pb-2 last:border-0 relative" v-if="targetProduct">
        <img class="w-32 mr-5" :src="targetProduct[1].img" :alt="targetProduct[1].name + 'image'">
        <div class="text-xl flex justify-between w-full items-center">
            <div>
                <h4>{{ targetProduct[1].name }}</h4>
                <i @click="$emit('deleteProductAsBasket', targetProduct)"
                    class="fa-solid fa-trash hover:text-red-500 transition-all cursor-pointer absolute bottom-7"></i>
            </div>
            <div>
                <span class="text-green-500 my-2 block">{{ targetProduct[1].price.toLocaleString() }}$</span>
            </div>
            <span>Count : {{ targetProduct[1].count }} </span>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue';

export default {
    props: ["product"],
    setup(props) {
        let products = inject("products")

        let targetProduct = computed(() => products.value.find(product => product[0] == props.product[1].productId))

        return {
            targetProduct,
        }
    }
}
</script>