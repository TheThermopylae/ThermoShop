import { computed } from 'vue'

export default function DateHook () {
  let today = computed(() => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${day} / ${month} / ${year}`
  })

  return today
}