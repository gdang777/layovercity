import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./logo.png";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const navItems = [
    {
      it: "Home",
      li: "/",
      icon: "fa-solid fa-house",
    },
    {
      it: "Places",
      li: "/Places",
      icon: "fa-solid fa-globe",
    },
    {
      it: "Stories",
      li: "/Stories",
      icon: "fa-brands fa-blogger",
    },
    {
      it: "About Us",
      li: "/AboutUs",
      icon: "fa-solid fa-people-group",
    },
    {
      it: "Contact Us",
      li: "/ContactUs",
      icon: "fa-solid fa-envelope",
    },
  ];

  useEffect(() => {}, [sessionStorage]);

  const [active, setActive] = useState(1);
  return (
    <>
      <div className="container-fluid  navBar">
        <div className=" d-flex flex-wrap justify-content-between">
          <div className="col-md-2 col-sm-6 d-flex flex-wrap justify-content-center">
            {/* <img className="logo p-3 mt-2" src={logo} alt="" /> */}
            <h6 className="logo-text pt-4">Layover City</h6>
          </div>
          <div className="navItems col-7 pt-2">
            <ul className="d-flex flex-wrap justify-content-center align-items-center">
              {navItems.map((item, index) => {
                return (
                  <>
                    <li
                      key={index}
                      className={
                        active === index + 1 ? "active m-2 p-2 " : "m-2 p-2"
                      }
                      onClick={() => setActive(index + 1)}
                    >
                      <Link to={item.li}>
                        {" "}
                        <i class={`${item.icon}  responsive`}></i>
                        <span>{item.it}</span>
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 pt-1 d-flex flex-wrap justify-content-center align-items-center login-signup">
            <li className="m-2 p-2">
              <Link
                onClick={
                  sessionStorage.getItem("userLoginData") &&
                  JSON.parse(sessionStorage.getItem("userLoginData"))
                    .isLoginSuccess
                    ? () => {
                        sessionStorage.clear();
                        window.location.reload(true);
                      }
                    : () => {
                        history.push("/login");
                      }
                }
              >
                <i class="fa-solid fa-right-to-bracket responsive"></i>{" "}
                <span>
                  {" "}
                  {sessionStorage.getItem("userLoginData") &&
                  JSON.parse(sessionStorage.getItem("userLoginData"))
                    .isLoginSuccess
                    ? "LogOut"
                    : "LogIn/SignUp"}
                </span>
              </Link>
            </li>

            <Link to="/AddPlaces">
              {" "}
              <button>Add Places/Story</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
