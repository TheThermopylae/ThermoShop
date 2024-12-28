<template>
    <div v-if="targetUser">
        <h2 class="text-2xl my-5">User : <b>{{ targetUser[1].username }}</b></h2>
        <UserDashData :data="targetUser"></UserDashData>
        <button v-if="userData[1].rule == 'metaAdmin'" class="btn btn-primary mt-5 text-xl"
            @click="showRuleModal = true">{{ targetUser[1].rule ==
                'user' ?
                'Promot to admin' : 'Decrease to user' }} <i class="fa-solid"
                :class="{ 'fa-arrow-up': targetUser[1].rule == 'user', 'fa-arrow-down': targetUser[1].rule == 'admin' }"></i></button>
        <Transition>
            <RuleModal v-if="showRuleModal" @closeModal="showRuleModal = false" :data="targetUser"></RuleModal>
        </Transition>
    </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { ref, inject, computed } from 'vue';
import UserDashData from '../AdminDashComponents/UserDashData.vue';
import RuleModal from '../AdminDashComponents/RuleModal.vue';
export default {
    components: {
        UserDashData,
        RuleModal
    },
    setup() {
        let userData = inject("userData")
        let users = inject("users")
        let route = useRoute()

        let targetUser = computed(() => {
            return users.value.find(user => user[0] == route.params.id)
        })

        let showRuleModal = ref(false)

        return {
            route,
            targetUser,
            showRuleModal,
            userData,
        }
    }
}
</script>