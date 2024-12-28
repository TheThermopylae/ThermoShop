<template>
    <div class="flex h-screen justify-center items-center page-form">
        <Teleport to="title"> | Sign In </Teleport>
        <form action="" class="p-3 rounded-md w-1/4" @submit.prevent>
            <router-link to="/" class="font-bold text-center text-2xl block">Thermo<span
                    class="text-primary">Shop</span></router-link to="/">
            <h2 class="mb-5 text-3xl text-center">Sign in form</h2>
            <label for="username" class="block text-xl">Username:</label>
            <input type="text" id="username"
                class="w-full rounded-full px-3 py-2 outline-none my-3 border-2 transition-all focus:border-primary"
                placeholder="Username..." v-model="username">
            <label for="password" class="block text-xl">Password:</label>
            <div class="relative">
                <input :type="passwortType ? 'password' : 'text'" id="password"
                    class="w-full rounded-full px-3 py-2 outline-none mt-3 border-2 transition-all focus:border-primary"
                    placeholder="********" v-model="password" @focus="showIcon = true" @blur="showIcon = false">
                <i class="fa-solid absolute right-3 top-1/2 cursor-pointer transition-all"
                    :class="{ 'fa-eye': passwortType, 'fa-eye-slash': !passwortType, 'opacity-100': showIcon, 'opacity-0': !showIcon }"
                    @click="passwortType = !passwortType"></i>
            </div>
            <div class="form-control w-1/2 my-3">
                <label class="label cursor-pointer">
                    <span class="label-text text-xl">Remember me!</span>
                    <input type="checkbox" checked="checked" class="checkbox checkbox-primary" v-model="remmberMe">
                </label>
            </div>
            <router-link to="/SignUp">Don't have an account? Make one!</router-link>
            <button class="btn btn-primary block rounded-full w-full mt-3" @click="signIn" v-if="!loading">Sign In</button>
            <button class="btn btn-primary block rounded-full w-full mt-3" v-else>
                <LazyLoading class="w-7 h-7"></LazyLoading>
            </button>
        </form>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import AlertBox from "../MainComponents/AlertBox.vue";
import AlertHook from "../../hooks/AlertHook.js";
import LazyLoading from '../MainComponents/LazyLoading.vue';
import { useRouter } from 'vue-router';
export default {
    components: {
        AlertBox,
        LazyLoading
    },
    setup() {
        let userData = inject("userData")

        const router = useRouter()

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let users = inject("users")

        let username = ref("")
        let password = ref("")
        let remmberMe = ref(false)

        let targetUser = ref('')

        let passwortType = ref(true)
        let showIcon = ref(false)

        

        function signIn() {
            targetUser.value = users.value.find(user => user[1].username == username.value)

            if (!username.value || !password.value) {
                showAlertFunc("Fill all the fields!", "bg-red-500")
            } else if (!targetUser.value) {
                showAlertFunc("There is no such account!", "bg-red-500")
            } else if (targetUser.value && targetUser.value[1].isBanned) {
                showAlertFunc("You Are Banned!", "bg-red-500")
            } else if (targetUser.value != undefined && password.value != targetUser.value[1].password) {
                showAlertFunc("ٌWrong Password!", "bg-red-500")
            } else {
                loading.value = true
                if (remmberMe.value) {
                    localStorage.setItem("userData", JSON.stringify(targetUser.value))
                    userData.value = targetUser.value
                } else {
                    sessionStorage.setItem("userData", JSON.stringify(targetUser.value))
                    userData.value = targetUser.value
                }

                showAlertFunc("Welcome! Moving to the main page!", "bg-green-500")
                setTimeout(() => {
                    router.push("/")
                    loading.value = false
                }, 3000)
            }
        }

        let loading = ref(false)

        return {
            showAlert,
            alertText,
            alertBackground,
            showAlertFunc,
            username,
            password,
            remmberMe,
            passwortType,
            showIcon,
            signIn,
            loading
        }
    }
}
</script>