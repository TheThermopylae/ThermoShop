import { ref } from "vue"

export default function RemoveUser (targetUser) {
  let showRemoveModal = ref(false)

  function showRemoveModalFunc (item) {
    showRemoveModal.value = true
    targetUser.value = item
  }

  return [showRemoveModal, showRemoveModalFunc]
}
