<template>
    <div class="fixed left-0 top-0 p-5 bg-gray-200 h-screen overflow-y-scroll">
        <UserData></UserData>
        <AdminLinks></AdminLinks>
    </div>
</template>

<script>
import { inject } from 'vue';
import UserData from "../../UserDashboard/UserData.vue"
import AdminLinks from './AdminLinks.vue';
export default {
    components: {
        UserData,
        AdminLinks
    },
    setup() {
        let userData = inject("userData")

        return {
            userData,
        }
    }
}
</script>