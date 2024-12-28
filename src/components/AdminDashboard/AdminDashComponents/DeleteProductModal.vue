<template>
    <div class="w-full h-full fixed left-0 top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <h4 class="text-2xl">
                Delete Message
            </h4>
            <p class="my-5">
                Do you want to delete this message?
            </p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white bg-green-500 hover:bg-green-600" @click="deleteAsDb" v-if="!loading">Yes</button>
                <button class=" btn text-white bg-green-500 hover:bg-green-600" v-else>
                    <LazyLoading class="w-7 h-7"></LazyLoading>
                </button>
                <button class="btn text-white bg-red-500 hover:bg-red-600" @click="$emit('closeModal')">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import LazyLoading from '../../MainComponents/LazyLoading.vue';
import DeleteFromDbHook from '../../../hooks/DeleteFromDbHook';
import { inject } from 'vue';
export default {
    components: {
        LazyLoading
    },
    props: ["product"],
    setup(props, { emit }) {
        let getProducts = inject("getProducts")

        const [loading, deleteAsDb] = DeleteFromDbHook(`https://authproject-ecce2-default-rtdb.firebaseio.com/products/${props.product[0]}.json`, getProducts, emit)

        return {
            loading, deleteAsDb
        }
    }
}
</script>