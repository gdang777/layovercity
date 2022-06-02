import React, { useRef, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import "./Login.css";

function LoginPage({ setUserLoginData }) {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container1 = document.getElementById("container1");

  const history = useHistory();
  const ref = useRef(null);
  function signUpBtn() {
    const container2 = ref.current;
    container2.classList.add("right-panel-active");
  }
  function signInBtn() {
    const container2 = ref.current;
    container2.classList.remove("right-panel-active");
  }

  const [signUpData, setSignUpData] = useState({
    airline: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const dataChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    e.preventDefault();
    // console.log(signUpData);
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    const data = {
      airline: signUpData.airline,
      firstName: signUpData.firstName,
      lastName: "1",
      password: signUpData.password,
      email: signUpData.email,
    };

    async function postData(url = "", data = {}) {
      // console.log(data);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData(
      "https://fatoentrepreneur.herokuapp.com/users/register",
      data
    ).then((res) => {
      // console.log("Response Message", res);
      alert("Response msg", res);
    });
  };

  const [signInData, setSignInData] = useState({
    logPassword: "",
    logEmail: "",
  });

  const LoginDataChangeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setSignInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    e.preventDefault();
  };
  // console.log(signInData);

  const submitSignIn = () => {
    // console.log(signInData);
    const data = {
      password: signInData.logPassword,
      email: signInData.logEmail,
    };

    async function postData(url = "", data = {}) {
      // console.log(data);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    // console.log("Submit Clicked!")

    postData("https://fatoentrepreneur.herokuapp.com/users/login", data).then(
      (res) => {
        // console.log("Login Response aa gya!",res,res.isLoginSuccess)
        setUserLoginData(res);
        if (res.isLoginSuccess) {
          // console.log("yahaan bhi aa raha hai");
          history.push("/dashBoard");
          window.location.reload(true);
        }
      }
    );
  };

  return (
    <div className="body">
      <div className="container1" id="container1" ref={ref}>
        <div className="form-container1 sign-up-container1">
          <form action="/verification">
            <h1 className="loginheading">Create Account</h1>
            <div className="social-container1">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              className="loginInput"
              type="text"
              placeholder="Name"
              onChange={dataChangeHandler}
              name="firstName"
              required
            />
            <input
              className="loginInput"
              type="text"
              placeholder="AirLines"
              onChange={dataChangeHandler}
              name="airline"
              required
            />
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              onChange={dataChangeHandler}
              name="email"
              required
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              onChange={dataChangeHandler}
              name="password"
              required
            />
            <button className="button" onClick={submitSignUp}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container1 sign-in-container1">
          <div className="loginForm">
            <h1>Sign in</h1>
            <div className="social-container1">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              required
              name="logEmail"
              onChange={LoginDataChangeHandler}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              name="logPassword"
              onChange={LoginDataChangeHandler}
              required
            />
            <a href="#">Forgot your password?</a>
            <button className="button" onClick={submitSignIn}>
              Sign In
            </button>
          </div>
        </div>
        <div className="overlay-container1">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost button" id="signIn" onClick={signInBtn}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost button" id="signUp" onClick={signUpBtn}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
