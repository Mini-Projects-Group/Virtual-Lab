import { Spin } from "antd";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import LabCard from "./components/LabCard/LabCard";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import { getUser } from "./redux/action";
import PrivateRoute from "./reusables/routes/PrivateRoute";
import PublicRoute from "./reusables/routes/PublicRoute";
import Lab from "./components/Lab/Lab";

function App() {
  const token = localStorage.getItem("vl-token");
  const type = localStorage.getItem("vl-type");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) {
        const decoded: any = jwt_decode(token);

        const { _id, userType } = decoded;

        setLoading(true);
        await dispatch(getUser(_id, userType));
        setLoading(false);
      }
    })();
  }, [dispatch, token]);

  if (loading)
    return (
      <div className="App">
        <Spin />
      </div>
    );

  return (
    <Router>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute
            exact
            path="/reset-password"
            component={ForgotPassword}
          />
          <PrivateRoute exact path="/auth" component={Dashboard} />
          <PrivateRoute exact path="/fdashboard" component={TeacherDashboard} />
          <PrivateRoute exact path="/sdashboard" component={StudentDashboard} />
          <PrivateRoute exact path="/lab/:labId" component={Lab} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
