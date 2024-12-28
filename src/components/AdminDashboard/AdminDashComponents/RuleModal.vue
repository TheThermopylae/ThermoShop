<template>
    <div class="w-full h-full fixed left-0 top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <div class="text-2xl">
                <p v-text="data[1].rule == 'user' ? 'Promote to admin' : 'decrease to user'"></p>
            </div>
            <p class="my-5"
                v-text="data[1].rule == 'admin' ? 'Do you want to downgrade this user?' : 'Do you want to promote this user to admin?'">
            </p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white bg-green-500 hover:bg-green-600" v-if="!loading"
                    @click="chagneRule">Yes</button>
                <button v-else class=" btn text-white bg-green-500 hover:bg-green-600">
                    <LazyLoading class="w-7 h-7"></LazyLoading>
                </button>
                <button class="btn text-white bg-red-500 hover:bg-red-600" @click="$emit('closeModal')">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import LazyLoading from "../../MainComponents/LazyLoading.vue"
import { inject, ref } from 'vue';
export default {
    components: {
        LazyLoading
    },
    props: ["data"],
    setup(props, { emit }) {
        let getUsers = inject("getUsers")

        let loading = ref(false)
        let rule = ref(props.data[1].rule)

        function chagneRule() {
            loading.value = true
            rule.value == 'admin' ? rule.value = 'user' : rule.value = "admin"

            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/users/${props.data[0]}.json`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ rule: rule.value })
            })
                .then(() => {
                    getUsers()
                    loading.value = false
                    emit("closeModal")
                })
        }

        return {
            loading, chagneRule
        }
    }
}
</script>