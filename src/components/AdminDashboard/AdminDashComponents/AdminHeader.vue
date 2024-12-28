<template>
    <div class="flex items-center gap-5">
        <router-link to="/" class="font-bold text-4xl border-r border-gray-300 pr-5">Thermo<span class="text-primary">Shop</span></router-link>
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