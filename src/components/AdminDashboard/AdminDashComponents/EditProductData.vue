<template>
    <div class="w-full h-full fixed left-0 top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <div class="flex justify-between items-center">
                <h4 class="text-2xl">Edit {{ product[1].name }} data</h4>
                <i class="fa-solid fa-x cursor-pointer" @click="$emit('closeModal')"></i>
            </div>
            <div class="grid grid-cols-2 gap-5 my-3">
                <div>
                    <label for="product-name-edit" class="block mb-1">Product name : </label>
                    <input type="text" class="bg-gray-50 border w-full focus:border-primary transition-all outline-none rounded-full p-3" placeholder="Product name..."
                        id="product-name-edit" v-model="productData.name">
                </div>
                <div>
                    <label for="product-price-edit" class="block mb-1">Product price : </label>
                    <input type="number" class="bg-gray-50 border w-full focus:border-primary transition-all outline-none rounded-full p-3"
                        placeholder="Product price..." id="product-price-edit" v-model="productData.price">
                </div>
                <div>
                    <label for="product-count-edit" class="block mb-1">Product count : </label>
                    <input type="number" class="bg-gray-50 border w-full focus:border-primary transition-all outline-none rounded-full p-3"
                        placeholder="Product count..." id="product-count-edit" v-model="productData.count">
                </div>
                <div>
                    <label for="product-img-edit" class="block mb-1">Product img : </label>
                    <input type="text" class="bg-gray-50 border w-full focus:border-primary transition-all outline-none rounded-full p-3" placeholder="Product img..."
                        id="product-img-edit" v-model="productData.img">
                </div>
            </div>
            <button class="btn btn-primary w-full text-white" v-if="!loading" @click="editProductFunc">Edit
                Data</button>
            <button class=" btn btn-primary w-full text-white" v-else>
                <LazyLoading class="w-7 h-7"></LazyLoading>
            </button>
        </div>
    </div>
</template>

<script>
import LazyLoading from '../../MainComponents/LazyLoading.vue';
import { inject, reactive, ref } from 'vue';
export default {
    components: {
        LazyLoading
    },
    props: ["product"],
    setup(props, { emit }) {
        let loading = ref(false)
        let getProducts = inject("getProducts")

        let productData = reactive({
            name: props.product[1].name,
            price: props.product[1].price,
            count: props.product[1].count,
            img: props.product[1].img,
            category:props.product[1].category
        })

        function editProductFunc() {
            loading.value = true
            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/products/${props.product[0]}.json`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
                .then(() => {
                    getProducts()
                    emit("success")
                })
                .catch(() => emit("error"))
                .finally(() => {
                    loading.value = false
                    emit("closeModal")
                })
        }
        return {
            loading,
            productData,
            editProductFunc
        }
    }
}
</script>