import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
const AppContainer = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    history.listen((location, action) => {
      console.log("on route change");
    });
  });
  return <div>{children}</div>;
};
// class AppContainer extends Component {
//   componentWillMount() {
//     this.unlisten = this.props.history.listen((location, action) => {
//       console.log("on route change");
//     });
//   }
//   componentWillUnmount() {
//     this.unlisten();
//   }
//   render() {
//     return <div>{this.props.children}</div>;
//   }
// }
export default withRouter(AppContainer);
