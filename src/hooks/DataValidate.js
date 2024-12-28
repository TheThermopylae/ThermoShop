export default function DateValidate (data, someUser) {
  const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/
  const phoneRegex = /^9[0-9]{9}$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/

  const checkFill = (...args) => {
    for (let item of args) {
      if (!item) return false
    }
    return true
  }

  function usernameValidate () {
    if (!usernameRegex.test(data.username)) return false
    else return true
  }

  function phoneNumberValidate () {
    if (!phoneRegex.test(data.telephoneNum)) return false
    else return true
  }

  function passwordValidate () {
    if (!passwordRegex.test(data.password)) return false
    else return true
  }

  function passwordIsEqual () {
    if (data.password != data.repeatPassword) return false
    else return true
  }

  function isHaveUser () {
    if (someUser.value) return true
    else return false
  }

  return [
    checkFill,
    usernameValidate,
    phoneNumberValidate,
    passwordValidate,
    passwordIsEqual,
    isHaveUser
  ]
}
