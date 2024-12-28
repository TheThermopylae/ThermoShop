import { ref } from 'vue'

export default function DeleteFromDbHook (adress, getMethod, emit) {
  let loading = ref(false)

  function deleteAsDb () {
    loading.value = true
    fetch(adress, {
      method: 'DELETE'
    })
      .then(() => {
        emit('success')
        getMethod()
      })
      .catch(() => emit('error'))
      .finally(() => {
        loading.value = false
        emit('closeModal')
      })
  }

  return [loading, deleteAsDb]
}
