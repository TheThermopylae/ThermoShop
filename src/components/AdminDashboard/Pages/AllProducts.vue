<template>
    <div>
        <h2 class="text-2xl my-5">All products</h2>
        <div class="grid grid-cols-4 gap-5">
            <ProductCard @showDeleteModal="showModalFunc(item)" v-for="item in products" :key="item[0]" :product="item">
            </ProductCard>
        </div>
        <Transition>
            <DeleteProductModal @error="showAlertFunc('Cannot delete product :(', 'bg-red-500')"
                @success="showAlertFunc('Product deleted!', 'bg-green-500')" @closeModal="showModal = false"
                :product="targetProduct" v-if="showModal">
            </DeleteProductModal>
        </Transition>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import ProductCard from '../AdminDashComponents/ProductCard.vue';
import DeleteProductModal from '../AdminDashComponents/DeleteProductModal.vue';
import AlertBox from '../../MainComponents/AlertBox.vue';
import AlertHook from '../../../hooks/AlertHook';
export default {
    components: {
        ProductCard,
        DeleteProductModal,
        AlertBox,
    },
    setup() {
        let products = inject("products")

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let targetProduct = ref("")

        let showModal = ref(false)

        function showModalFunc(item) {
            showModal.value = true
            targetProduct.value = item
        }

        return {
            products,
            showAlert,
            alertText,
            alertBackground,
            showAlertFunc,
            targetProduct,
            showModal,
            showModalFunc
        }
    }
}
</script>