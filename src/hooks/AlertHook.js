import { ref } from 'vue'

export default function AlertHook () {
  let showAlert = ref(false)
  let alertText = ref('حساب شما ساخته شد!')
  let alertBackground = ref('')

  function showAlertFunc (text, bg) {
    showAlert.value = true
    alertText.value = text
    alertBackground.value = bg
    setTimeout(() => {
      showAlert.value = false
      alertBackground.value = ''
    }, 3000)
  }

  return [showAlert, alertText, alertBackground, showAlertFunc]
}