import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userSignInAction } from "../redux/actions/userActions";
import Alerts from "../components/Alerts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState(false);

  //makes new page to always start from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { loading, userLogin, message, error } = useSelector(
    (state) => state.userLogin
  );

  const signupHandler = (e) => {
    e.preventDefault();

    dispatch(userSignInAction(email, password));
    setAlerts(true);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h4 className="text-center text-muted">Welcome Back &#128513;</h4>
      </div>
      <div className="w-75 mx-auto my-4">
        {alerts && (error || userLogin) && (
          <Alerts message={message} type={error ? "danger" : "success"} />
        )}
        <div
          className="alert alert-info"
          style={{ textAlign: "center" }}
          role="alert"
        >
          <p>Don't need to signup to access dashboard.</p>
          <p>
            email : testuser@email.com &amp; password:
            <b> 11111</b>
          </p>
        </div>
        <form onSubmit={signupHandler}>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <p>
            Dont have an account yet? <Link to="/signup">signup</Link>
          </p>
          {loading ? (
            <button className="btn btn-primary" disabled>
              Signing in...
            </button>
          ) : (
            <button className="btn btn-primary">Signin</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
