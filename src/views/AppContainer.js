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
export default withRouter(AppContainer);
