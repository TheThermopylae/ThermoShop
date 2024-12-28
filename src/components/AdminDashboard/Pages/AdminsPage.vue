<template>
    <div>
        <div class="my-5 flex justify-between items-center">
            <h2 class="text-2xl">Admin List:</h2>
            <input type="search" name="" id="search-admin"
                class="border-2 border-base-300  focus:border-primary w-10/12 rounded-full p-3 outline-none transition-all"
                placeholder="Search Admin..." v-model="searchValue">
        </div>
        <div class="grid grid-cols-4 gap-5">
            <UserCards v-for="item in searchedUser" :key="item[0]" :data="item" @showBanModal="showBanModalFunc(item)"
                @showRemoveModal="showRemoveModalFunc(item)">
            </UserCards>
        </div>
        <Transition>
            <BanUnbanUserModal v-if="showBanModal" @closeModal="showBanModal = false" :user="targetUser">
            </BanUnbanUserModal>
        </Transition>
        <Transition>
            <RemoveUserModal v-if="showRemoveModal" @closeModal="showRemoveModal = false" :user="targetUser">
            </RemoveUserModal>
        </Transition>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import UserCards from '../AdminDashComponents/UserCards.vue';
import SearchedUsersHook from '../../../hooks/SearchedUsersHook';
import BanUnbanUserModal from '../AdminDashComponents/BanUnbanUserModal.vue';
import RemoveUserModal from '../AdminDashComponents/RemoveUserModal.vue';
import BanUser from '../../../hooks/BanUser';
import RemoveUser from '../../../hooks/RemoveUser';

export default {
    components: {
        UserCards, BanUnbanUserModal,RemoveUserModal
    },
    setup() {
        let users = inject("users")

        let searchValue = ref("")

        let targetUser = ref('')

        let searchedUser = SearchedUsersHook(users, searchValue, "admin")

        const [showBanModal, showBanModalFunc] = BanUser(targetUser)
        const [showRemoveModal, showRemoveModalFunc] = RemoveUser(targetUser)
        return {
            searchedUser,
            searchValue,
            targetUser,
            showBanModal,
            showBanModalFunc,
            showRemoveModal,
             showRemoveModalFunc
        }
    }
}
</script>