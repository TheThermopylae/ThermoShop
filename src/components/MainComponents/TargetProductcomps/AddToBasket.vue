<template>
    <div class="shadow-xl p-2 rounded-xl">
        <h3 class="text-2xl">Add Product To Basket</h3>
        <div class="text-xl flex justify-between my-4">
            <div>
                <h5 class="float-left mr-1">Price : </h5>
                <span class="text-green-500">{{ product[1].price.toLocaleString() }}$</span>
            </div>
            <div>
                <h5 class="float-left mr-1">Count : </h5>
                <span>{{ product[1].count }}</span>
            </div>
        </div>
        <div v-if="!isInYourBasket">
            <button class="btn btn-primary w-full" @click="addToBasketFunc" v-if="!loading">Add To Basket</button>
            <button class="btn btn-primary w-full" v-else>
                <LazyLoading class="w-7 h-7"></LazyLoading>
            </button>
        </div>
        <div v-else>
            <button class="btn btn-primary w-full" @click="removeAsBasketFunc" v-if="!loading">Remove As Basket</button>
            <button class="btn btn-primary w-full" v-else>
                <LazyLoading class="w-7 h-7"></LazyLoading>
            </button>
        </div>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import LazyLoading from '../LazyLoading.vue';
import AlertBox from '../AlertBox.vue';
import AlertHook from '../../../hooks/AlertHook';

export default {
    props: ["product"],
    components: {
        LazyLoading,
        AlertBox
    },
    setup(props) {
        let userData = inject('userData')
        let baskets = inject("baskets")
        let getBaskets = inject("getBaskets")

        let loading = ref(false)

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let isInYourBasket = computed(() => baskets.value.find(basket => basket[1].for == userData.value[0] && basket[1].productId == props.product[0]))

        function changeLoading() {
            setTimeout(() => {
                loading.value = false
            }, 300)
        }

        function addToBasketFunc() {
            loading.value = true
            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/basket.json`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    for: userData.value[0],
                    productId: props.product[0],
                    isPurchased: false
                })
            })
                .then(() => {
                    showAlertFunc("Product added to your basket :)", 'bg-green-500')
                    setTimeout(() => { })
                    getBaskets()
                })
                .catch(() => showAlertFunc("Cannot add product to basket :(", 'bg-red-500'))
                .finally(() => changeLoading())
        }

        const removeAsBasketFunc = () => {
            loading.value = true
            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/basket/${isInYourBasket.value[0]}.json`, {
                method: "DELETE"
            })
                .then(() => {
                    showAlertFunc("Remove product as basket", "bg-green-500")
                    getBaskets()
                })
                .catch(() => showAlertFunc("Cannot remove product as basket", "bg-red-500"))
                .finally(() => changeLoading())
        }

        return {
            addToBasketFunc,
            loading,
            showAlert,
            alertText,
            alertBackground,
            isInYourBasket,
            removeAsBasketFunc
        }
    }
}
</script>