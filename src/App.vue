<template>
  <Teleport to="title">ThermoShop </Teleport>
  <router-view v-slot="{ Component }">
    <transition name="header-fade" mode="out-in">
      <TheHeader v-if="!hideHeader" />
    </transition>
    <transition name="fade" mode="out-in">
      <component :is="Component" class="page" />
    </transition>
  </router-view>
  <AlertBox :class="[{ 'left-3': showAlert, '-left-1/3': !showAlert }, alertBackground]">{{ alertText }}
  </AlertBox>
</template>

<script>
import { onMounted, provide, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import TheHeader from './components/MainComponents/TheHeader.vue';
import AlertBox from './components/MainComponents/AlertBox.vue';
import AlertHook from './hooks/AlertHook';

export default {
  components: {
    TheHeader,
    AlertBox
  },
  setup() {
    let users = ref([])
    let userData = ref("")

    let messages = ref([])

    let products = ref([])

    let baskets = ref([])

    let route = useRoute();
    const hideHeader = computed(() => route.meta.hideHeader);

    const [showAlert, alertText, alertBackground, showAlertFunc] = AlertHook()

    function getUsers() {
      fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/users.json`)
        .then(res => res.json())
        .then(data => users.value = Object.entries(data))
        .catch(() => showAlertFunc("Cannot get uesrs as database :(", "bg-red-500"))
    }

    function getMessages() {
      fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/messages.json`)
        .then(res => res.json())
        .then(data => {
          let filterMessages = Object.entries(data).filter(message => message[0] != "default")
          messages.value = filterMessages
        })
        .catch(() => showAlertFunc("Cannot get messages as database :(", "bg-red-500"))
    }

    function getProducts() {
      fetch(`https://authproject-ecce2-default-rtdb.firebaseio.com/products.json`)
        .then(res => res.json())
        .then(data => {
          let filterBaskets = Object.entries(data).filter(basket => basket[0] != "default")
          products.value = filterBaskets
        })
    }

    function getBaskets() {
      fetch("https://authproject-ecce2-default-rtdb.firebaseio.com/basket.json")
        .then(res => res.json())
        .then(data => baskets.value = Object.entries(data))
    }

    function checkLogin() {
      if (JSON.parse(localStorage.getItem("userData"))) {
        userData.value = JSON.parse(localStorage.getItem("userData"))
      } else if (JSON.parse(sessionStorage.getItem("userData"))) {
        userData.value = JSON.parse(sessionStorage.getItem("userData"))
      } else {
        useRoute.value = null
      }
    }

    onMounted(() => {
      getUsers()
      checkLogin()
      getMessages()
      getProducts()
      getBaskets()
    })

    provide("users", users)
    provide("getUsers", getUsers)
    provide("userData", userData)
    provide("messages", messages)
    provide("getMessages", getMessages)
    provide("products", products)
    provide("getProducts", getProducts)
    provide("baskets", baskets)
    provide("getBaskets", getBaskets)
    return { hideHeader, showAlert, alertText, alertBackground, showAlertFunc }
  }
}
</script>

<style>
.header-fade-enter-active,
.header-fade-leave-active {
  transition: opacity 0.5s ease;
}

.header-fade-enter-from,
.header-fade-leave-to {
  opacity: 0;
}

.header-fade-enter-to,
.header-fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.gradient-text {
  background: linear-gradient(to right, rgb(0.49 0.3 275), #ff4040);
  background-clip: text;
  color: transparent;
}
</style>