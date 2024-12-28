import { computed } from 'vue'

export default function GetAdmins (users) {
  let computedAdmins = computed(() => {
    let result
    result = users.value.filter(
      user => user[1].rule == 'admin' && user[1].username != 'AmirBrzgr'
    )

    return result.sort((a, b) => {
      const usernameA = a[1].username.toLowerCase()
      const usernameB = b[1].username.toLowerCase()
      return usernameA.localeCompare(usernameB)
    })
  })

  return [computedAdmins]
}
