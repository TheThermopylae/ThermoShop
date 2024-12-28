<template>
    <div>
        <div class="flex justify-between text-2xl my-5">
            <h2>Edit Account Detail</h2>
            <h2>Phone number : {{ userData[1].telephoneNum }}</h2>
        </div>
        <div>
            <label for="username" class="block mb-2 text-xl">Username:</label>
            <input type="text" id="username" placeholder="username..."
                class="border-2 border-base-300 w-full rounded-full p-3 outline-none transition-all focus:border-primary"
                v-model="data.username">
        </div>
        <div class="grid grid-cols-2 gap-5 mt-5">
            <div>
                <label for="Profile" class="block mb-2 text-xl">Profile:</label>
                <input type="file"
                    class="file-input file-input-bordered file-input-primary rounded-full w-full outline-none"
                    @change="chageProfile($event)" accept="image/*">
            </div>
            <div>
                <label for="Profile" class="block mb-2 text-xl">Remove Profile:</label>
                <button class="btn btn-primary w-full text-xl" @click="removeProfile">Remove <i
                        class="fa-solid fa-remove"></i></button>
            </div>
            <div>
                <label for="password" class="block mb-2 text-xl">Password:</label>
                <div class="relative">
                    <input :type="passwortType[0] ? 'password' : 'text'" id="password" placeholder="********"
                        class="border-2 border-base-300 w-full rounded-full p-3 outline-none transition-all focus:border-primary"
                        v-model="data.password" @paste.prevent>
                    <i :class="{ 'fa-eye': passwortType[0], 'fa-eye-slash': !passwortType[0] }"
                        class="fa-solid absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                        @click="passwortType[0] = !passwortType[0]"></i>
                </div>
            </div>
            <div>
                <label for="password-repeat" class="block mb-2 text-xl">Password Repeat:</label>
                <div class="relative">
                    <input :type="passwortType[1] ? 'password' : 'text'" id="password-repeat" placeholder="********"
                        class="border-2 border-base-300 w-full rounded-full p-3 outline-none transition-all focus:border-primary"
                        v-model="data.repeatPassword" @paste.prevent>
                    <i :class="{ 'fa-eye': passwortType[1], 'fa-eye-slash': !passwortType[1] }"
                        class="fa-solid absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                        @click="passwortType[1] = !passwortType[1]"></i>
                </div>
            </div>
        </div>
        <button class="btn btn-primary w-full mt-5 text-xl" @click="editAccount" v-if="!loading">Edit Account
            Data</button>
        <button class="btn btn-primary w-full mt-5 text-xl" v-else>
            <LazyLoading class="w-7 h-7"></LazyLoading>
        </button>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { inject, reactive, ref } from 'vue';
import LazyLoading from '../../MainComponents/LazyLoading.vue';
import AlertBox from '../../MainComponents/AlertBox.vue';
import AlertHook from '../../../hooks/AlertHook';
import DateValidate from '../../../hooks/DataValidate';

export default {
    components: {
        AlertBox,
        LazyLoading
    },
    setup() {
        let userData = inject("userData")
        let users = inject("users")
        let getUsers = inject("getUsers")

        let data = reactive({
            username: userData.value[1].username,
            password: userData.value[1].password,
            repeatPassword: userData.value[1].password,
            profile: userData.value[1].profile,
            rule: userData.value[1].rule,
            telephoneNum: userData.value[1].telephoneNum,
            isBanned: userData.value[1].isBanned
        })

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let someUser = ref("")

        let loading = ref(false)

        const [checkFill, usernameValidate, passwordValidate, passwordIsEqual, isHaveUser] = DateValidate(data, someUser)

        function editAccount() {
            someUser.value = users.value.some(user => user[1].username == data.username)

            if (!checkFill(data.username, data.password, data.repeatPassword)) {
                showAlertFunc("Fill in the inputs! (except profile)", "bg-red-500")
            } else if (!usernameValidate()) {
                showAlertFunc("Username is not valid!", "bg-red-500")
            } else if (!passwordValidate()) {
                showAlertFunc("Password is not valid!", "bg-red-500")
            } else if (!passwordIsEqual()) {
                showAlertFunc("The password is inconsistent!", "bg-red-500")
            } else if (!isHaveUser() && data.username != userData.value[1].username) {
                showAlertFunc("There is such a user!", "bg-red-500")
            } else {
                loading.value = true
                fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/users/${userData.value[0]}.json`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {

                        let userArray = [
                            userData.value[0],
                            data
                        ]

                        localStorage.setItem("userData", JSON.stringify(userArray))
                        userData.value = userArray

                        showAlertFunc("Account detail edited!", "bg-green-500")

                        getUsers()
                    })
                    .catch(err => showAlertFunc("Cannot connecting to server :(", "bg-red-500"))
                    .finally(() => loading.value = false)
            }
        }

        let passwortType = ref([true, true])

        function chageProfile(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = e => {
                    data.profile = e.target.result;
                    userData.value[1].profile = e.target.result
                    showAlertFunc("To return the profile, refresh the page", "bg-yellow-500")
                };

                reader.readAsDataURL(file);
            }
        }

        function removeProfile() {
            if (userData.value[1].profile) {
                userData.value[1].profile = ""
                data.profile = ""
                showAlertFunc("If you regret your decision, refresh the page", "bg-yellow-500")
            } else {
                showAlertFunc("No profile to remove!", "bg-yellow-500");
            }
        }

        return {
            data,
            editAccount,
            alertText,
            showAlert,
            alertBackground,
            loading,
            userData,
            passwortType,
            chageProfile,
            removeProfile
        }
    }
}
</script>