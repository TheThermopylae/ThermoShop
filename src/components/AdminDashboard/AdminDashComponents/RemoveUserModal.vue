<template>
    <div class="w-full h-full fixed left-0 top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <h4 class="text-2xl">Remove User</h4>
            <p class="my-5">Do you want to remove this user?</p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white bg-green-500 hover:bg-green-600" v-if="!loading"
                    @click="removeUser">Yes</button>
                <button class="btn text-white bg-green-500 hover:bg-green-600" v-else>
                    <LazyLoading class="w-7 h-7"></LazyLoading>
                </button>
                <button class="btn text-white bg-red-500 hover:bg-red-600" @click="$emit('closeModal')">No</button>
            </div>
        </div>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import LazyLoading from '../../MainComponents/LazyLoading.vue';
import AlertBox from '../../MainComponents/AlertBox.vue';
import AlertHook from '../../../hooks/AlertHook';

export default {
    props: ["user"],
    components: {
        LazyLoading,
        AlertBox
    },

    setup(props, { emit }) {
        let getUsers = inject("getUsers")
        let loading = ref(false)

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        function removeUser() {
            loading.value = true
            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/users/${props.user[0]}.json`, {
                method: "DELETE"
            })
                .then(() => {
                    getUsers()
                    emit("closeModal")
                })
                .catch(() => showAlertFunc("Cannot connecting to server :(", "bg-red-500"))
                .finally(() => loading.value = false)
        }

        return {
            loading,
            showAlert,
            alertText,
            alertBackground,
            showAlertFunc,
            removeUser
        }
    }
}
</script>