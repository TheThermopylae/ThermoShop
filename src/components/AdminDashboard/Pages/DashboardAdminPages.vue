<template>
    <div class="p-5 absolute right-0 w-4/5">
        <AdminHeader></AdminHeader>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
        <SideBarAdminDashboard></SideBarAdminDashboard>
    </div>
</template>

<script>
import AdminHeader from '../AdminDashComponents/AdminHeader.vue';
import SideBarAdminDashboard from '../AdminDashComponents/SideBarAdminDashboard.vue';

export default {
    components: {
        AdminHeader,
        SideBarAdminDashboard
    }
}
</script>