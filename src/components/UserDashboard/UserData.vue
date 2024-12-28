<template>
    <div class="w-52 h-48 bg-primary text-white flex justify-center items-center flex-col relative rounded-md">
        <h1 class="text-2xl mb-2 font-semibold break-words max-w-full text-center">{{ userData[1].username }}</h1>
        <p class="text-xl">Date : {{ today }}</p>
        <img class="w-24 h-24 rounded-full absolute top-1/2 translate-y-1/2"
            src="/public/img/profile.png" alt="profile"
            v-if="userData[1].profile == ''">
        <img class="w-24 h-24 rounded-full absolute top-1/2 translate-y-1/2"
            :src="userData[1].profile" :alt="userData[1].username + ' profile'" v-else>
    </div>
</template>

<script>
import { inject } from 'vue';
import DateHook from '../../hooks/DateHook';
export default {
    setup() {
        let userData = inject("userData")        

        let today = DateHook()

        return {
            userData,
            today
        }
    }
}
</script>