import { computed } from 'vue'

export default function SearchedUsersHook (users,searchValue,rule) {
  let searchedUser = computed(() => {
    let filteredUsers

    if (searchValue.value) {
      filteredUsers = users.value.filter(
        user =>
          user[1].username.includes(searchValue.value.trim()) &&
          user[1].rule == rule
      )
    } else {
      filteredUsers = users.value.filter(user => user[1].rule == rule)
    }

    return filteredUsers.sort((a, b) => {
      const usernameA = a[1].username.toLowerCase()
      const usernameB = b[1].username.toLowerCase()
      return usernameA.localeCompare(usernameB)
    })
  })

  return searchedUser
}
