<template>
    <div class="flex items-center gap-5">
        <router-link to="/" class="font-bold text-4xl border-r border-gray-300 pr-5 gradient-text">Thermo<span
                class="">Shop</span></router-link>
        <p class="text-xl">Welcome to the admin panel, <b>{{ userData[1].username }}</b></p>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    setup() {
        let userData = inject("userData")
        return {
            userData
        }
    }
}
</script>

<style>
.gradient-text {
    background: linear-gradient(to right, rgb(0.49 0.3 275), #ff4040);
    /* گرادینت از آبی به بنفش */
    -webkit-background-clip: text;
    /* برای سازگاری با کروم */
    color: transparent;
    /* متن از شفاف به رنگ گرادینت تبدیل می‌شود */
}
</style>