<template>
    <div>
        <h2 class="my-5 text-2xl">Send Message</h2>
        <div>
            <textarea id="text-message" v-model="message.text"
                class="border-2 focus:border-primary transition-all outline-none p-3 w-full rounded-xl"
                placeholder="Write your message..."></textarea>
            <div class="mt-3">
                <h3 class="text-xl">for : {{ message.for }}</h3>
                <div class="mt-2 flex items-center">
                    <button @click="sendForAll" class="btn btn-primary w-24" v-if="!loadingAll">All Users</button>
                    <button class="btn btn-primary w-24" v-else>
                        <LazyLoading class="w-7 h-7"></LazyLoading>
                    </button>
                    <span class="px-5">|</span>
                    <div class="flex gap-5">
                        <input type="text" id="user-message"
                            class="border rounded-full focus:border-primary transition-all outline-none p-3"
                            placeholder="username..." v-model="inputValue">
                        <button class="btn btn-primary w-36" @click="sendForTargetUser" v-if="!loadingTarget">Send
                            Message</button>
                        <button class="btn btn-primary w-36 text-white" v-else>
                            <LazyLoading class="w-7 h-7"></LazyLoading>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { computed, inject, reactive, ref } from 'vue';
import AlertBox from '../../MainComponents/AlertBox.vue';
import AlertHook from '../../../hooks/AlertHook';
import LazyLoading from '../../MainComponents/LazyLoading.vue';
import DateHook from '../../../hooks/DateHook';

export default {
    components: {
        AlertBox,
        LazyLoading
    },

    setup() {
        let userData = inject("userData")
        let getMessages = inject("getMessages")

        let today = DateHook()

        let users = inject("users")
        let message = reactive({
            text: "",
            for: "",
            from: userData.value[1].username,
            date: today
        })

        const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

        let inputValue = ref("")

        let findUser = computed(() => {
            return users.value.find(user => user[1].username == inputValue.value && user[1].rule != "metaAdmin")
        })

        let loadingTarget = ref(false)

        function sendMessage(loading) {
            loading.value = true

            fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/messages.json`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(message)
            })
                .then(() => {
                    showAlertFunc("Message sended!", "bg-green-500")
                    getMessages()
                })
                .catch(() => showAlertFunc("Cannot connecting to server :(", "bg-red-500"))
                .finally(() => {
                    loading.value = false
                    message.text = ""
                })
        }

        function sendForTargetUser() {
            if (!inputValue.value || !message.text) {
                showAlertFunc("Fields is empty!", "bg-yellow-500")
            } else {
                if (findUser.value) {
                    loadingTarget.value = true

                    message.for = findUser.value[1].username
                    sendMessage(loadingTarget)
                } else {
                    showAlertFunc("This user does not exist!", "bg-red-500")
                }
            }
        }

        let loadingAll = ref(false)

        function sendForAll() {
            if (!message.text) {
                showAlertFunc("Text message is empty!", "bg-red-500")
            } else {
                message.for = "all"
                sendMessage(loadingAll)
            }
        }

        return {
            message,
            inputValue,
            sendForTargetUser,
            showAlert,
            alertText,
            alertBackground,
            loadingTarget,
            sendForAll,
            loadingAll
        }
    }
}
</script>