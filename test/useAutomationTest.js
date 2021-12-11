/**
 * field: 
 * login ->
 * review -> 
 */

const mock = {
  loginSuccess: {
    email: "leminhdeptrai000@gmail.com", password: "000000"
  },
  loginFailCallApi: {
    email: "leminhdeptrai000@gmail.com", password: "1234567"
  },
  loginFailValidate: {
    email: "leminhdeptrai000@gmail.com", password: "0"
  }
}

const useAutomationTest = (type) => {
  if (type === "login-fail-call-api") return mock.loginFailCallApi
  if (type === "login-fail-validate") return mock.loginFailValidate
  if (type === "login-success") return mock.loginSuccess
}

export default useAutomationTest