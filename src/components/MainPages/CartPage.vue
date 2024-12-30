<template>
    <div class="px-20" v-if="baskets">
        <h2 class="mb-5 text-3xl">Your Basket :</h2>
        <div class="w-2/3">
            <ProductCardBasket @deleteProductAsBasket="showDeleteModalFunc(item)" v-for="item in filterProduct"
                :key="item[0]" :product="item">
            </ProductCardBasket>
        </div>
        <Transition>
            <DeleteProductBasketModal @error="showAlertFunc('Cannot remove product as basket', 'bg-red-500')"
                @success="showAlertFunc('Product removed as basket', 'bg-green-500')" :product="targetProduct"
                @closeModal="showDeleteModal = false" v-if="showDeleteModal">
            </DeleteProductBasketModal>
        </Transition>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import ProductCardBasket from '../MainComponents/CartPageComps/ProductCardBasket.vue';
import DeleteProductBasketModal from '../MainComponents/CartPageComps/DeleteProductBasketModal.vue';
import AlertBox from '../MainComponents/AlertBox.vue';
import AlertHook from '../../hooks/AlertHook';

export default {
    components: {
        ProductCardBasket,
        DeleteProductBasketModal,
        AlertBox
    },
    setup() {
        let baskets = inject("baskets")
        let userData = inject("userData")

        let filterProduct = computed(() => baskets.value.filter(basket => basket[1].for == userData.value[0]))

        let showDeleteModal = ref(false)

        let targetProduct = ref("")

        function showDeleteModalFunc(item) {
            showDeleteModal.value = true
            targetProduct.value = item
        }

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        return {
            filterProduct,
            baskets,
            showDeleteModal,
            showDeleteModalFunc,
            targetProduct,
            showAlert, alertText, alertBackground,
            showAlertFunc
        }
    }
}
</script>