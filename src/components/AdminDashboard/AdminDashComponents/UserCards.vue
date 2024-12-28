<template>
    <div class="border border-primary rounded-xl p-3">
        <div class="flex justify-between items-center gap-3">
            <router-link :to='`TargetUser/${data[0]}`'>
                <h4>{{ data[1].username }}</h4>
            </router-link>
            <h5>{{ data[1].rule }}</h5>
        </div>
        <div class="mt-2 flex justify-between">
            <div v-if="userData[1].rule == 'metaAdmin'">
                <div class="tooltip" data-tip="Remove user">
                    <i class="fa-solid fa-trash cursor-pointer hover:text-red-500 transition-all"
                        @click="$emit('showRemoveModal')"></i>
                </div>
                <div class="tooltip" data-tip="BAN" v-if="!data[1].isBanned">
                    <i class="fa-solid fa-ban ml-2 cursor-pointer hover:text-red-500 transition-all"
                        @click="$emit('showBanModal')"></i>
                </div>
                <div class="tooltip" data-tip="UNBAN" v-else>
                    <i class="fa-solid fa-ban ml-2 cursor-pointer hover:text-green-500 transition-all"
                        @click="$emit('showBanModal')"></i>
                </div>
            </div>
            <div v-if="userData[1].rule == 'admin' && data[1].rule == 'user'">
                <div class="tooltip" data-tip="Remove user">
                    <i class="fa-solid fa-trash cursor-pointer hover:text-red-500 transition-all"
                        @click="$emit('showRemoveModal')"></i>
                </div>
                <div class="tooltip" data-tip="BAN" v-if="!data[1].isBanned">
                    <i class="fa-solid fa-ban ml-2 cursor-pointer hover:text-red-500 transition-all"
                        @click="$emit('showBanModal')"></i>
                </div>
                <div class="tooltip" data-tip="UNBAN" v-else>
                    <i class="fa-solid fa-ban ml-2 cursor-pointer hover:text-green-500 transition-all"
                        @click="$emit('showBanModal')"></i>
                </div>
            </div>
            <span class="text-red-500" v-if="data[1].isBanned">BANNED</span>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    props: ["data"],
    setup() {
        let userData = inject("userData")

        return {
            userData
        }
    }
}
</script>