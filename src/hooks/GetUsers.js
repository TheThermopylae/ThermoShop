import { computed } from 'vue'

export default function GetUsers (users) {
  let computedUsers = computed(() => {
    let result
    result = users.value.filter(user => user[1].rule == 'user')

    return result.sort((a, b) => {
      const usernameA = a[1].username.toLowerCase()
      const usernameB = b[1].username.toLowerCase()
      return usernameA.localeCompare(usernameB)
    })
  })

  return [computedUsers]
}
