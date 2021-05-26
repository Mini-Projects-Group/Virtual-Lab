import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";

import PrivateRoute from "./reusables/routes/PrivateRoute";
import PublicRoute from "./reusables/routes/PublicRoute";

function App() {
  const token = localStorage.getItem("vl-token");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     setLoading(true);
  //     dispatch(getUser());
  //     setLoading(false);
  //   }
  // }, [dispatch, token]);

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
