/**
 * field: 
 * login ->
 * review -> 
 */

const mock = {
  login: {
    loginSuccess: {
      email: "leminhdeptrai000@gmail.com", password: "000000"
    },
    loginFailCallApi: {
      email: "leminhdeptrai000@gmail.com", password: "1234567"
    },
    loginFailValidate: {
      email: "leminhdeptrai000@gmail.com", password: "0"
    },
  },
  register: {
    registerSuccess: {
      name: "abcd1234", username: "abcd1234", email: "abcd1234@gmail.com", password: "1234567"
    },
    registerFailValidatePass: {
      name: "abcd1234", username: "abcd1234", email: "abcd1234@gmail.com", password: "0"
    },
    registerFailCallApiWithEmail: {
      name: "abcd1234", username: "abcd1234", email: "leminhdeptrai000@gmail.com", password: "1234567"
    },
    registerFailCallApiWithUserName: {
      name: "abcd1234", username: "leminh", email: "abcd1234@gmail.com", password: "1234567"
    }
  },
}

const useAutomationTest = (type) => {
  if (type === "login-fail-call-api") return mock.login.loginFailCallApi
  if (type === "login-fail-validate") return mock.login.loginFailValidate
  if (type === "login-success") return mock.login.loginSuccess

  if (type === "register-success") return mock.register.registerSuccess
  if (type === "register-fail-validate-password") return mock.register.registerFailValidatePass
  if (type === "register-fail-call-api-email") return mock.register.registerFailCallApiWithEmail
  if (type === "register-fail-call-api-username") return mock.register.registerFailCallApiWithUserName

}

export default useAutomationTest