import React ,{useState}from "react";

import "./VerifyOTP.css";
function VerifyOTP() {

  const [formData, setFormData] = useState({
    verifyOTP: "",
  });

  const dataChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    e.preventDefault();
    // console.log(formData);
  };
  const submitPlaces = (e) => {

    e.preventDefault()
    const data = {
      placeName: formData.verifyOTP,
    };

    async function postData(url = "", data = {}) {
      console.log(data);
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
      "https://fatoentrepreneur.herokuapp.com/users/otp/verify",
      data
    ).then((res) => {
      console.log("Response Message", res);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center verifyOTP">
      <div className="verify d-flex justify-content-center align-items-center flex-column">
        <h1 className="chgedcolor my-4">Verify OTP</h1>
        <h5 className="my-4">Pleaes enter the One-Time Password to verify your account</h5>
        <p className="my-4">A One-Time Password has been sent to your email.</p>
        <div className="my-2 d-flex justify-content-center align-items-center">
          <form action="/">
          <input type="text" className="mx-2" placeholder="Enter OTP" name="verifyOTP" onChange={dataChangeHandler}/>
          <button className="mx-2">Validate</button></form>
        </div>
          <h6 className="my-4">Resend One-Time password</h6>
      </div>
    </div>
  );
}

export default VerifyOTP;
