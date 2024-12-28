<template>
    <div class="w-full h-full fixed left-0 top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <div class="text-2xl">
                <p>{{ title }}</p>
            </div>
            <p class="my-5">{{ des }}</p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white bg-green-500 hover:bg-green-600" v-if="!loading"
                    @click="banUser">Yes</button>
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
        AlertBox,
    },
    setup(props, { emit }) {
        let isBanned = ref(props.user[1].isBanned)
        let getUsers = inject("getUsers")

        let loading = ref(false)

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        function banUser() {
            isBanned.value = !isBanned.value
            loading.value = true
            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/users/${props.user[0]}.json`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ isBanned: isBanned.value })
            })
                .then(res => {
                    getUsers()
                    emit("closeModal")
                })
                .catch(() => showAlertFunc("Cannot connecting to server", "bg-red-500"))
        }

        let title = ref(!props.user[1].isBanned ? "BAN User" : "UnBAN User")
        let des = ref(!props.user[1].isBanned ? 'Do you want to ban this user?' : "Do you want to unban this user?")


        return {
            isBanned,
            banUser,
            loading,
            showAlert,
            alertText,
            alertBackground,
            showAlertFunc,
            title,
            des
        }
    }
}
</script>

<style>
.blur {
    background-color: rgba(5, 5, 5, 0.2)
}
</style>