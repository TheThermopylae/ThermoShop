<template>
    <div class="w-full h-full fixed left-0 top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <div class="text-2xl">
                <p>Delete Product As Basket</p>
            </div>
            <p class="my-5 text-lg">Do you want to remove this product from the shopping cart?</p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white bg-green-500 hover:bg-green-600" @click="deleteAsBasket"
                    v-if="!loading">Yes</button>
                <button class=" btn text-white bg-green-500 hover:bg-green-600" v-else>
                    <LazyLoading class="w-7 h-7"></LazyLoading>
                </button>
                <button class="btn text-white bg-red-500 hover:bg-red-600" @click="$emit('closeModal')">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import LazyLoading from '../LazyLoading.vue';
export default {
    components: {
        LazyLoading
    },
    props: ["product"],
    setup(props, { emit }) {
        let loading = ref(false)
        let getBaskets = inject("getBaskets")

        function deleteAsBasket() {
            loading.value = true

            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/basket/${props.product[0]}.json`, {
                method: "DELETE"
            })
                .then(() => {
                    emit("success")
                    getBaskets()
                    emit("closeModal")
                })
                .then(() => emit("error"))
                .finally(() => loading.value = false)
        }
        return {
            loading,
            deleteAsBasket
        }
    }
}
</script>