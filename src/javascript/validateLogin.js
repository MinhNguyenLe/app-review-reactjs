export default function validateLogin(values) {
  let errors = {};
  if (!values.emailLogin) {
    errors.emailLogin = "Email là bắt buộc";
  } else if (!/\S+@\S+\.\S+/.test(values.emailLogin)) {
    errors.emailLogin = "Email không hợp lệ";
  }
  if (!values.passLogin) {
    errors.passLogin = "Mật khẩu là bắt buộc";
  } else if (values.passLogin.length < 6) {
    errors.passLogin = "Mật khẩu phải hơn 6 ký tự";
  }
  return errors;
}
