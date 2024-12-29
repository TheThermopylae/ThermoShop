<template>
    <div>
        <h2 class="text-2xl my-5">Add Product</h2>
        <div class="grid grid-cols-2 gap-5">
            <div>
                <label for="product-name" class="mb-1 ml-2 inline-block">Product name :</label>
                <input type="text" id="product-name"
                    class="outline-none w-full border-2 rounded-full transition-all p-3 focus:border-primary"
                    placeholder="product name..." v-model="productData.name">
            </div>
            <div>
                <label for="product-price" class="mb-1 ml-2 inline-block">Product price :</label>
                <input type="number" id="product-price"
                    class="outline-none w-full border-2 rounded-full transition-all p-3 focus:border-primary"
                    placeholder="product name..." v-model="productData.price">
            </div>
            <div>
                <label for="product-count" class="mb-1 ml-2 inline-block">Product count :</label>
                <input type="number" id="product-count"
                    class="outline-none w-full border-2 rounded-full transition-all p-3 focus:border-primary"
                    placeholder="product count..." v-model="productData.count">
            </div>
            <div>
                <label for="product-img" class="mb-1 ml-2 inline-block">Product img :</label>
                <input type="text" id="product-img"
                    class="outline-none w-full border-2 rounded-full transition-all p-3 focus:border-primary"
                    placeholder="product img..." v-model="productData.img">
            </div>
        </div>
        <div class="flex items-end gap-5">
            <select class="select select-primary select-bordered w-2/12 rounded-full max-w-xs" v-model="selectCategory">
                <option disabled selected>Select Category</option>
                <option :value="item" v-for="item in Categories">{{ item }}</option>
            </select>
            <button class="btn btn-primary mt-5 w-10/12 text-lg" v-if="!loading" @click="addProductFunc">Add product <i
                    class="fa-solid fa-plus"></i></button>
            <button class="btn btn-primary mt-5 w-10/12 text-lg" v-else>
                <LazyLoading class="w-7 h-7"></LazyLoading>
            </button>
        </div>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue';
import AlertBox from '../../MainComponents/AlertBox.vue';
import AlertHook from '../../../hooks/AlertHook';
import LazyLoading from '../../MainComponents/LazyLoading.vue';

export default {
    components: {
        AlertBox,
        LazyLoading
    },
    setup() {
        let Categories = ["mobile", "watch", "laptop", "console"]
        let selectCategory = ref("Select Category")

        let productData = reactive({
            name: "",
            price: "",
            count: "",
            img: "",
            category: selectCategory
        })

        let getProducts = inject("getProducts")

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let loading = ref(false)

        function addProductFunc() {
            if (!productData.name || productData.price === "" || productData.count === "" || !productData.img) {
                showAlertFunc("Fills is empty!", "bg-yellow-500")
            } else if (productData.price <= 0) {
                showAlertFunc("Product price must be greater than $0!", "bg-yellow-500")
            } else if (productData.count <= 0) {
                showAlertFunc("Product count must be greater than 0!", "bg-yellow-500")
            } else if (selectCategory.value == "Select Category") {
                showAlertFunc("Please select a category", "bg-yellow-500")
            } else {
                loading.value = true

                fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/products.json`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify(productData)
                })
                    .then(() => {
                        showAlertFunc("Product Added!", "bg-green-500")
                        for (let key in productData) {
                            productData[key] = ""
                        }
                        getProducts()
                    })
                    .catch(() => showAlertFunc("Cannot add product :(", "bg-red-500"))
                    .finally(() => loading.value = false)
            }
        }

        watch(selectCategory, () => {
            console.log(selectCategory.value);
        })

        return {
            productData,
            addProductFunc,
            showAlert,
            alertText,
            alertBackground,
            loading,
            Categories,
            selectCategory
        }
    }
}
</script>