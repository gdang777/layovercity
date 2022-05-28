import React from "react";
import "./Contact.css";
import Footer from "../assets/Components/Footer/Footer";
import contactimg from "../assets/images/Contact.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Contact() {
  const contactInfo = [
    {
      title: "Phone number",
      content: "000-0000-000",
      icon:"fa-solid fa-phone"
    },
    {
      title: "Email",
      content: "support@gmail.com",
      icon:"fa-solid fa-envelope"
    },
    {
      title: "Location",
      content: "Pune maharastra 410115, India",
      icon:"fa-solid fa-location-dot"
    },
  ];
  return (
    <div>
      <div className="container-fluid">
        <div className="contact px-5 align-items-center pt-2 ">
          <div className="contact-header row d-flex justify-content-center flex-wrap align-items-center">
            <div className="col-lg-8 col-md-7 col-sm-12 px-5 contact-text">
              <h2>
                Contact <span className="us">Us</span>{" "}
              </h2>
              <p className="py-4 px-2 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
                recusandae officiis quam voluptatem praesentium, dolor
                consectetur saepe omnis, totam eos perspiciatis soluta nisi aut
                iure ipsa laborum numquam in nam!
              </p>
              <FontAwesomeIcon icon="check-square" />
            </div>
            <div className="col-lg-4 col-md-5 col-sm-12 d-flex justify-content-center flex-wrap align-items-center">
              <img
                className="contactImg align-items-center"
                src={contactimg}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="contactInfo px-5">
          <div className="row px-4">
            <div className="col-lg-6 col-md-6 col-sm-12 p-4 contactInfo-cards ">
              {contactInfo.map((contact, index) => {
                return (
                  <div className="details row mt-4">
                    <div className="icon col-4 m-2  align-items-center d-flex  flex-wrap justify-content-center">
                    <i class={contact.icon}></i>
                    </div>
                    <div className="content col align-items-start d-flex flex-column flex-wrap justify-content-center flex-column pt-2">
                      <h1 className="content-title ">{contact.title}</h1>
                      <p className="content-content">{contact.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <div className="contact-form my-5 mx-2">
                <div className="contact-form-text px-4 pt-2 ">
                  <h1 className="my-3 highlight contactHeading">
                    {" "}
                    <span className="us">Get</span> In Touch
                  </h1>
                  <p className="ml-2 contact-page-content ">
                    <span className="highlightred">Not literally though.</span>
                    <span role="img" aria-label="Emoji">
                      😷
                    </span>
                  </p>
                  <p className="ml-2 contact-page-content ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis molestiae consequatur maiores voluptatibus ratione
                    ab error!
                  </p>
                </div>
                <form className="form-horizontal p-4">
                  <div className="form-group my-2">
                    <textarea
                      className="form-control"
                      rows="6"
                      id="queries"
                      placeholder="Write your queries here."
                      required
                    />
                  </div>
                  <div className="form-group my-2">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-12 d-flex p-0 flex-row justify-content-between">
                    <div className="form-group my-2">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="align-items-center contact-form-button btn-danger"
                    >
                      Send <i className="far fa-paper-plane" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
