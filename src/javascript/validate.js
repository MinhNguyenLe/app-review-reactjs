export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Địa chỉ email là bắt buộc";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Địa chỉ email không tồn tại";
  }
  if (!values.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải nhiều hơn 6 ký tự";
  }
  if (!values.name) {
    errors.name = "Tên là bắt buộc";
  } else if (values.name.length < 6) {
    errors.name = "Tên phải nhiều hơn 6 ký tự";
  }
  if (!values.username) {
    errors.username = "Tên người dùng là bắt buộc";
  }
  return errors;
}
