import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";

import PrivateRoute from "./reusables/routes/PrivateRoute";
import PublicRoute from "./reusables/routes/PublicRoute";

import jwt_decode from "jwt-decode";
import { getUser } from "./redux/action";
import { AppState } from "./redux/reducer";

function App() {
  const token = localStorage.getItem("vl-token");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const data = useSelector((state: AppState) => state.userReducer);

  // console.log(data);

  useEffect(() => {
    (async () => {
      if (token) {
        const decoded: any = jwt_decode(token);

        const { _id, userType } = decoded;

        await dispatch(getUser(_id));

        setLoading(true);
        dispatch(getUser());
        setLoading(false);
      }
    })();
  }, [dispatch, token]);

  if (loading) return <div>Loading....</div>;

  return (
    <Router>
      <div className='App'>
        <Switch>
          <PublicRoute exact path='/' component={Landing} />
          <PublicRoute exact path='/login' component={Login} />
          <PrivateRoute exact path='/auth' component={() => <h1>Auth</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
