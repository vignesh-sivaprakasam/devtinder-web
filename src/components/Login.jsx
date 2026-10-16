import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(userActions.addUser(response.data.data));
      navigate("/");
    } catch (err) {
      console.log("ERROR ", err.response);
      setError(err?.response?.data?.message || "");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("res.data", res.data);
      dispatch(userActions.addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.log("Error : ", err);
      setError(err?.response?.data?.message || "");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(ev) => setEmailId(ev.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <a
            href="#"
            className="mx-auto"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "New user signup here" : "Existing user login here"}
          </a>
        </div>
      </div>
    </div>
  );
};
