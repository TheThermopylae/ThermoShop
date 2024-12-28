<template>
    <div class="flex h-screen justify-center items-center page-form">
        <Teleport to="title"> | Sign Up </Teleport>
        <form action="" class="p-3 rounded-md w-1/4" @submit.prevent>
            <router-link to="/" class="font-bold text-center text-2xl block">Thermo<span
                    class="text-primary">Shop</span></router-link to="/">
            <h1 class="mb-5 text-3xl text-center">Sign Up Form</h1>
            <label for="username" class="block text-xl">Username:</label>
            <input type="text" id="username"
                class="w-full rounded-full px-3 py-2 outline-none my-3 border-2 transition-all focus:border-primary"
                placeholder="Username..." v-model="data.username">
            <label for="telephone-number" class="block text-xl">Telephone number:</label>
            <input type="number" id="telephone-number"
                class="w-full rounded-full px-3 py-2 outline-none my-3 border-2 transition-all focus:border-primary"
                placeholder="Telephone number..." v-model="data.telephoneNum">
            <div class="relative">
                <label for="password" class="block text-xl">Password:</label>
                <input :type="passwortType[0] ? 'password' : 'text'" id="password"
                    class="w-full rounded-full px-3 py-2 outline-none my-3 border-2 transition-all focus:border-primary"
                    @focus="showIcon[0] = true" @blur="showIcon[0] = false" placeholder="********"
                    v-model="data.password" @paste.prevent>
                <i class="fa-solid absolute right-3 top-1/2 translate-y-1/2 cursor-pointer transition-all"
                    :class="{ 'fa-eye': passwortType[0], 'fa-eye-slash': !passwortType[0], 'opacity-100': showIcon[0], 'opacity-0': !showIcon[0] }"
                    @click="passwortType[0] = !passwortType[0]"></i>
            </div>
            <div class="relative">
                <label for="repeat-password" class="block text-xl">Repeat password:</label>
                <input :type="passwortType[1] ? 'password' : 'text'" id="repeat-password"
                    class="w-full rounded-full px-3 py-2 outline-none my-3 border-2 transition-all focus:border-primary"
                    @focus="showIcon[1] = true" @blur="showIcon[1] = false" placeholder="********"
                    v-model="data.repeatPassword" @paste.prevent>
                <i class="fa-solid absolute right-3 top-1/2 translate-y-1/2 cursor-pointer transition-all"
                    :class="{ 'fa-eye': passwortType[1], 'fa-eye-slash': !passwortType[1], 'opacity-100': showIcon[1], 'opacity-0': !showIcon[1] }"
                    @click="passwortType[1] = !passwortType[1]"></i>
            </div>
            <router-link to="/SignIn" class="block mt-3 mb-5">You have a account? Sign in</router-link>
            <button class="btn btn-primary block rounded-full w-full" @click="createAccount" v-if="!loading">Sign
                Up</button>
            <button class="btn btn-primary block rounded-full w-full" v-else>
                <LazyLoading class="w-7 h-7"></LazyLoading>
            </button>
        </form>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, reactive, ref } from 'vue';
import LazyLoading from "../MainComponents/LazyLoading.vue"
import AlertBox from "../MainComponents/AlertBox.vue"
import AlertHook from "../../hooks/AlertHook.js"
import DateValidate from '../../hooks/DataValidate.js';

export default {
    components: {
        LazyLoading,
        AlertBox
    },
    setup() {
        let getUsers = inject("getUsers")
        let users = inject('users')

        let data = reactive({
            username: "",
            telephoneNum: "",
            password: "",
            repeatPassword: "",
            rule: "user",
            profile: ""
        })

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let loading = ref(false)
        let passwortType = ref([true, true])
        let showIcon = ref([false, false])

        let someUser = ref('')

        const [checkFill, usernameValidate, phoneNumberValidate, passwordValidate, passwordIsEqual, isHaveUser] = DateValidate(data, someUser)

        function createAccount() {
            someUser.value = users.value.find(user => user[1].username == data.username || user[1].telephoneNum == data.telephoneNum)

            if (!checkFill(data.username, data.telephoneNum, data.password, data.repeatPassword)) {
                showAlertFunc("Fill all inputs!", "bg-red-500")
            } else if (!usernameValidate()) {
                showAlertFunc("Username is not valid!", "bg-red-500")
            } else if (!phoneNumberValidate()) {
                showAlertFunc("Telehpne number is not valid!", "bg-red-500")
            } else if (!passwordValidate()) {
                showAlertFunc("Password is not valid!", "bg-red-500")
            } else if (!passwordIsEqual()) {
                showAlertFunc("Password is not equal to repeat password!", "bg-red-500")
            } else if (isHaveUser()) {
                showAlertFunc("There is such a user!", "bg-red-500")
            } else {
                loading.value = true
                fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/users.json`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        showAlertFunc("Your account is created!", "bg-green-500")
                        getUsers()
                    })
                    .catch(err => showAlertFunc("The connection with the server could not be established", "bg-red-500"))
                    .finally(() => loading.value = false)
            }
        }

        return {
            data,
            loading,
            showAlert,
            alertText,
            alertBackground,
            createAccount,
            passwortType,
            showIcon,
        }
    }
}
</script>

<style>
form {
    backdrop-filter: blur(5px) saturate(180%);
    background-color: rgba(224, 224, 224, 0.25);
}

.page-form {
    background: url("/img/derakht.jpg") center/cover;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    appearance: textfield;
}
</style>