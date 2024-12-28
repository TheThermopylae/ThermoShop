import { ref } from 'vue'

export default function BanUser (targetUser) {
  let showBanModal = ref(false)

  function showBanModalFunc (item) {
    showBanModal.value = true
    targetUser.value = item
  }

  return [showBanModal, showBanModalFunc]
}
