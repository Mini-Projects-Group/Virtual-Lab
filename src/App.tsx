import { Spin } from "antd";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import { getUser } from "./redux/action";
import PrivateRoute from "./reusables/routes/PrivateRoute";
import PublicRoute from "./reusables/routes/PublicRoute";

function App() {
  const token = localStorage.getItem("vl-token");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) {
        const decoded: any = jwt_decode(token);

        const { _id, userType } = decoded;

        setLoading(true);
        await dispatch(getUser(_id));
        setLoading(false);
      }
    })();
  }, [dispatch, token]);

  if (loading)
    return (
      <div className='App'>
        <Spin />
      </div>
    );

  return (
    <Router>
      <div className='App'>
        <Switch>
          <PublicRoute exact path='/' component={Landing} />
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute
            exact
            path='/reset-password'
            component={ForgotPassword}
          />
          <PrivateRoute exact path='/auth' component={() => <h1>Auth</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
