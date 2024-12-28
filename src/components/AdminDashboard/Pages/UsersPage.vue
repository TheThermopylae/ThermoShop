<template>
    <div>
        <div class="my-5 flex justify-between items-center">
            <h2 class="text-2xl">Users Manage</h2>
            <input type="search" id="search-input-user"
                class="border-2 border-base-300 w-10/12 rounded-full p-3 transition-all focus:border-primary outline-none"
                placeholder="Search user..." v-model="searchValue">
        </div>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <UserCards v-for="item in searchedUser" :key="item[0]" :data="item"
                    @showBanModal="showBanModalFunc(item)" @showRemoveModal="showRemoveModalFunc(item)">
                </UserCards>
            </div>
        </div>
        <Transition>
            <BanUnBanUserModal v-if="showBanModal" @closeModal="showBanModal = false" :user="targetUser">
            </BanUnBanUserModal>
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
import BanUnBanUserModal from '../AdminDashComponents/BanUnbanUserModal.vue';
import RemoveUserModal from '../AdminDashComponents/RemoveUserModal.vue';
import GetUsers from '../../../hooks/GetUsers';
import GetAdmins from '../../../hooks/GetAdmins';
import SearchedUsersHook from '../../../hooks/SearchedUsersHook';
import BanUser from '../../../hooks/BanUser';
import RemoveUser from '../../../hooks/RemoveUser';

export default {
    components: {
        UserCards,
        BanUnBanUserModal,
        RemoveUserModal
    },
    setup() {
        let users = inject("users")

        let searchValue = ref("")

        let searchedUser = SearchedUsersHook(users, searchValue, "user")

        let targetUser = ref('')

        const [showBanModal, showBanModalFunc] = BanUser(targetUser)

        const [showRemoveModal, showRemoveModalFunc] = RemoveUser(targetUser)

        let [computedAdmins] = GetAdmins(users)
        let [computedUsers] = GetUsers(users)

        return {
            searchedUser,
            searchValue,
            targetUser,
            showBanModal,
            showBanModalFunc,
            showRemoveModal,
            showRemoveModalFunc,
            computedUsers,
            computedAdmins,
        }
    }
}
</script>