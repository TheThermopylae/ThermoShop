<template>
    <div class="navbar px-20 justify-between mt-2">
        <div class="flex-none">
            <div class="dropdown">
                <div tabindex="0" role="button" class=" text-primary text-3xl"><i class="fa-solid fa-bars"></i></div>
                <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
            <router-link to="/" class="ml-3 text-3xl font-bold gradient-text">Thermo<span>Shop</span></router-link>
        </div>
        <div class="flex gap-5">
            <div class="relative">
                <input type="search"
                    class="bg-blue-50 border border-primary rounded-md w-96 ml-4 p-2 outline-none focus:bg-blue-100 transition-all"
                    placeholder="Search Products..." id="search-input">
                <i
                    class="fa-solid fa-search absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xl cursor-pointer"></i>
            </div>
            <router-link to="/">
                <div class="flex items-center gap-2 text-xl">
                    <i class="fa-solid fa-cart-shopping text-primary"></i>
                    <h4>Cart</h4>
                </div>
            </router-link>
            <span class="text-gray-400">|</span>
            <router-link to="/SignIn" v-if="!userData">
                <div class="flex items-center gap-2 text-xl">
                    <i class="fa-solid fa-user text-primary"></i>
                    Sign In / Up
                </div>
            </router-link>
            <div class="dropdown dropdown-bottom dropdown-end"
                v-else-if="userData[1].rule == 'admin' || userData[1].rule == 'metaAdmin'">
                <div tabindex="0" role="button" class="m-1">
                    <img v-if="!userData[1].profile" src="/public/img/profile.png" alt="profile"
                        class="w-14 h-14 rounded-full">
                    <img v-else :src="userData[1].profile" alt="profile" class="w-14 h-14 rounded-full">
                </div>
                <div tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-2 shadow-2xl">
                    <div class="flex items-center gap-3">
                        <img v-if="!userData[1].profile" src="/public/img/profile.png" alt="profile"
                            class="w-20 h-20 rounded-full">
                        <img v-else :src="userData[1].profile" alt="profile" class="w-20 h-20 rounded-full">
                        <div>
                            <h4 class="text-2xl">{{ userData[1].username }}</h4>
                            <h5 class="text-xl">{{ userData[1].rule }}</h5>
                        </div>
                    </div>
                    <ul class="mt-2.5">
                        <li class="mb-1"><router-link to="/AdminDashboard/MainAdminPage">Go To Admin Dashboard <i
                                    class="fa-solid fa-chart-column"></i></router-link></li>
                        <li class="rounded-lg text-white bg-red-500 hover:bg-red-600" @click="signOut">
                            <div>
                                <h4>Sign Out</h4>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dropdown dropdown-bottom dropdown-end" v-else-if="userData[1].rule == 'user'">
                <div tabindex="0" role="button" class="m-1">
                    <img v-if="!userData[1].profile" src="/public/img/profile.png" alt="profile"
                        class="w-14 h-14 rounded-full">
                    <img v-else :src="userData[1].profile" alt="profile" class="w-14 h-14 rounded-full">
                </div>
                <div tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-2 shadow-2xl">
                    <div class="flex items-center gap-3">
                        <img v-if="!userData[1].profile" src="/public/img/profile.png" alt="profile"
                            class="w-20 h-20 rounded-full">
                        <img v-else :src="userData[1].profile" alt="profile" class="w-20 h-20 rounded-full">
                        <div>
                            <h4 class="text-2xl">{{ userData[1].username }}</h4>
                            <h5 class="text-xl">{{ userData[1].rule }}</h5>
                        </div>
                    </div>
                    <ul class="mt-2.5">
                        <li class="mb-1"><router-link to="/">Go To User Dashboard <i
                                    class="fa-solid fa-chart-column"></i></router-link></li>
                        <li class="rounded-lg text-white bg-red-500 hover:bg-red-600" @click="signOut">
                            <div>
                                <h4>Sign Out</h4>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
export default {
    setup() {
        let userData = inject("userData")

        function signOut() {
            sessionStorage.clear()
            localStorage.clear()
            location.reload()
        }
        return {
            userData,
            signOut
        }
    }
}
</script>