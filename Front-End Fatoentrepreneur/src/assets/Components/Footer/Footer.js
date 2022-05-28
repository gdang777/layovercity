import React from 'react'
import "./Footer.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
  return (
    <footer className="footer-section">
    <div className="container">
        <div className="footer-content pt-5 pb-5">
            <div className="row">
                <div className="col-xl-4 col-lg-4 mb-50">
                    <div className="footer-widget">
                        <div className="footer-logo">
                            <a href="index.html"><img src="https://i.ibb.co/QDy827D/ak-logo.png" className="img-fluid" alt="logo"/></a>
                        </div>
                        <div className="footer-text">
                            <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                            elit,Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="footer-social-icon">
                            <span>Follow us</span>
                            <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                            <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                    <div className="footer-widget">
                        <div className="footer-widget-heading">
                            <h3>Useful Links</h3>
                        </div>
                        <ul className='' >
                            {/* <div> */}
                            <li><a href="#">Amsterdam</a></li>
                            <li><a href="#">Bangkok</a></li>
                            <li><a href="#">Barcelona</a></li>
                            <li><a href="#">London</a></li>
                            <li><a href="#">Stories</a></li>
                            {/* </div> */}
                            {/* <div> */}
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Terms of use</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Privicy Policy</a></li>
                            {/* </div> */}
                        </ul>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                    <div className="footer-widget">
                        <div className="footer-widget-heading">
                            <h3>Subscribe Our NewsLetter</h3>
                        </div>
                        <div className="footer-text mb-25">
                            <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                        </div>
                        <div className="subscribe-form">
                            <form action="#">
                                <input type="text" placeholder="Email Address"/>
                                <button><i class="fa-solid fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="copyright-area">
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                    <div className="copyright-text">
                        <p> &copy; 2020 layover City. All rights reserved  </p>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                    <div className="footer-menu">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Terms</a></li>
                            <li><a href="">Privacy</a></li>
                            <li><a href="">Policy</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer;