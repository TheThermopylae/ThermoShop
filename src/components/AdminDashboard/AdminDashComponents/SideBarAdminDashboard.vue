<template>
    <div class="fixed left-0 top-0 p-5 bg-gray-200 min-h-full overflow-y-auto">
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
<!-- <style>
/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style> -->