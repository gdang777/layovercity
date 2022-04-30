import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";

import BgImage from "../../assets/img/illustrations/signin.svg";
import { BASE_URL } from "../../utils/env";
import axios from "axios";
import { useHistory } from "react-router-dom";

import UserAction from "../../Actions/user";
import { useDispatch } from "react-redux";

export default () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("call");
    if (data.email && data.password) {
      axios
        .post(`${BASE_URL}/admin/login`, data)
        .then((res) => {
          console.log("res login", res);
          UserAction.set(res.data.user, res.data.accessToken, dispatch);
          setError("");
          //history.push("/");
        })
        .catch((err) => setError(err.response?.data?.error_msg));
    } else {
      setError("All fileds are required");
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        style={{ paddingLeft: "15px" }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          style={{ paddingLeft: "15px" }}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                      {/* <Card.Link
                        as={Link}
                        to={Routes.ForgotPassword.path}
                        className="small text-end"
                      >
                        Lost password?
                      </Card.Link> */}
                    </div>
                  </Form.Group>
                  {error && (
                    <div className="pb-3 text-danger font">{error}</div>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
