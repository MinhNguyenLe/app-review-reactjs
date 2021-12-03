import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme from "enzyme";

import { render, screen, cleanup } from "@testing-library/react";
import { shallow } from "enzyme";
import LoginPage from "../views/pages/LoginPage";
import { Link } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

describe("render login page", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store, wrapper;

  it("link to register", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("Hello Worldd!")).toBeNull();
    // const wrapperLogin = shallow(<LoginPage />);
    // const registerLink = (
    //   <Link className="link" to="/register">
    //     Đăng ký tài khoản
    //   </Link>
    // );
    // expect(wrapperLogin.contains(registerLink)).toEqual(true);
  });
});
