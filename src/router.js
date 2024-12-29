import { createRouter, createWebHistory } from 'vue-router'

// Home Pages
import HomePage from './components/MainPages/HomePage.vue'
import TargetProduct from './components/MainPages/TargetProduct.vue'

import SignInPage from './components/SignUp-InPage/SignInPage.vue'
import SignUpPage from './components/SignUp-InPage/SignUpPage.vue'

// dashboard admin
import DashboardAdminPages from './components/AdminDashboard/Pages/DashboardAdminPages.vue'
import MainAdminPage from './components/AdminDashboard/Pages/MainAdminPage.vue'
import UsersPage from './components/AdminDashboard/Pages/UsersPage.vue'
import TargetUser from './components/AdminDashboard/Pages/TargetUser.vue'
import AdminsPage from './components/AdminDashboard/Pages/AdminsPage.vue'
import SendMessagePage from './components/AdminDashboard/Pages/SendMessagePage.vue'
import Allmessages from './components/AdminDashboard/Pages/Allmessages.vue'
import AddProduct from './components/AdminDashboard/Pages/AddProduct.vue'
import AllProducts from './components/AdminDashboard/Pages/AllProducts.vue'

import AccountInfo from './components/UserDashboard/pages/AccountInfo.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/TargetProduct/:id', component: TargetProduct },
    { path: '/SignIn', meta: { hideHeader: true }, component: SignInPage },
    { path: '/SignUp', meta: { hideHeader: true }, component: SignUpPage },
    {
      path: '/AdminDashboard',
      meta: { hideHeader: true },
      component: DashboardAdminPages,
      children: [
        { path: '', component: MainAdminPage },
        { path: 'MainAdminPage', component: MainAdminPage },
        { path: 'UsersPage', component: UsersPage },
        { path: 'AccountInfo', component: AccountInfo },
        { path: 'TargetUser/:id', component: TargetUser },
        { path: 'AdminsPage', component: AdminsPage },
        { path: 'SendMessagePage', component: SendMessagePage },
        { path: 'Allmessages', component: Allmessages },
        { path: 'AddProduct', component: AddProduct },
        { path: 'AllProducts', component: AllProducts }
      ]
    }
  ]
})

export default router
