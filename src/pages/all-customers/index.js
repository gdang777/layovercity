import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Table,
  Dropdown,
  Modal,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";

import useApi from "../../Hooks/useApi";
import { useHistory } from "react-router-dom";

const Banners = () => {
  let history = useHistory();

  const [pages, setPages] = useState({
    currPage: 1,
    totalPages: 0,
    totalDatas: 0,
    pageArr: [],
  });
  const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    password: "12345678",
  };

  const defaultRewardsData = {
    description: "",
    rewardsCount: "",
  };
  const [userDatas, setUserDatas] = useState([]);
  const api = useApi();
  const [userModalShow, setUserModalShow] = useState(false);
  const [rewardsModalShow, setRewardsModalShow] = useState(false);
  const [userData, setUserData] = useState({});

  const toggleModalUser = () => setUserModalShow(!userModalShow);
  const toggleModalRewards = () => setRewardsModalShow(!rewardsModalShow);

  const handlePageChange = (val) => {
    setPages({ ...pages, currPage: val });
  };

  const handleUpdate = (id, status) => {
    const formData = {
      restaurantId: id,
      status: status,
    };
    console.log("formData", formData);
    api
      .post("/admin/restaurant/status", formData)
      .then((res) => {
        console.log("res", res);
        getDatas();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getDatas = () => {
    api
      .get(`/users/all-users`)
      .then((res) => {
        setUserDatas([...res.data?.result]);
        // const count = Math.ceil(res?.data?.totalCount / 20);
        // let arr = [];
        // for (let i = 1; i <= count; i++) {
        //   arr.push(i);
        // }
        // setPages({
        //   ...pages,
        //   totalPages: count,
        //   totalDatas: res?.data?.totalCount,
        //   pageArr: arr,
        // });
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getDatas();
  }, [pages.currPage]);

  const AddUserModal = (props) => {
    const [formData, setFormData] = useState({
      ...defaultData,
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
      if (userData._id) {
        api
          .post(`/users/register`, { formData })
          .then((res) => {
            alert("Reward added successful");
          })
          .catch((err) => {});
      } else {
        api
          .post(`/users/register`, { ...formData })
          .then((res) => {
            props.onHide();
            setFormData({ ...defaultData });
            getDatas();
            alert("User added successful");
          })
          .catch((err) => {
            props.onHide();
            setFormData({ ...defaultData });
          });
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userData._id ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Group controlId="formGridState">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  defaultValue={formData.country}
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="Delhi/NCR">Delhi/NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
              setFormData({ ...defaultData });
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const AddRewardsModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Rewards
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img src={userData.profileAirlinePicture} lat="profile" />
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <InputGroup>
                <Form.Control value={userData.firstName} disabled={true} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <InputGroup>
                <Form.Control value={userData.lastName} disabled={true} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <Form.Control value={userData.email} disabled={true} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Airline Name</Form.Label>
              <InputGroup>
                <Form.Control value={userData.airline} disabled={true} />
              </InputGroup>
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-center">
            {userData?.verification?.isAdminVerified && (
              <Button
                className="bg-success"
                onClick={() => {
                  handleApprove(userData?._id);
                }}
              >
                Approve
              </Button>
            )}
            <Button
              className="mx-4 bg-danger"
              onClick={() => {
                handleBlock(
                  userData?._id,
                  userData?.verification?.isBlocked ? false : true
                );
              }}
            >
              {userData?.verification?.isBlocked ? "UnBlock" : "Block"}
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
              setUserData({});
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleApprove = (id) => {
    api
      .post(`/users/update-status`, { userId: id, value: true })
      .then((res) => {
        getDatas();
      })
      .catch((err) => console.log("err", err));
  };

  const handleBlock = (id, value) => {
    api
      .post(`/users/block`, { userId: id, value: value })
      .then((res) => {
        getDatas();
      })
      .catch((err) => console.log("err", err));
  };

  const TableRow = (props) => {
    const {
      _id,
      firstName,
      lastName,
      email,
      airline,
      profileAirlinePicture,
      password,
      verification,
      role,
      createdAt,
      updatedAt,
    } = props;

    return (
      <tr>
        <td>
          <Dropdown>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!verification.isAdminVerified && (
                <Dropdown.Item
                  className="text-success"
                  onClick={() => {
                    handleApprove(_id);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Approve
                </Dropdown.Item>
              )}

              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  handleBlock(_id, verification.isBlocked ? false : true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="me-2" />
                {verification.isBlocked ? "UnBlock" : "Block"}
              </Dropdown.Item>
              <Dropdown.Item
                className="text-success"
                onClick={() => {
                  toggleModalRewards();
                  setUserData({ ...props });
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="me-2" /> View
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td>
          <span className="fw-normal">
            {firstName} {lastName}
          </span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className="fw-normal">{airline}</span>
        </td>
        <td>
          <span className="fw-normal">
            <img src={profileAirlinePicture} alt="logo" />
          </span>
        </td>
        <td>
          <span className="fw-normal">{createdAt}</span>
        </td>
      </tr>
    );
  };

  const CustomTable = () => (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Action</th>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Airline</th>
              <th className="border-bottom">Picture</th>
              <th className="border-bottom">Created At</th>
            </tr>
          </thead>
          <tbody>
            {userDatas.map((t, i) => (
              <TableRow key={i} {...t} />
            ))}
          </tbody>
        </Table>
        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => {
                  handlePageChange(pages.currPage - 1);
                }}
                disabled={pages.currPage === 1 ? true : false}
              >
                Previous
              </Pagination.Prev>
              {pages.totalPages &&
                pages.pageArr.map((ele) => (
                  <Pagination.Item
                    onClick={() => {
                      handlePageChange(ele);
                    }}
                    active={ele === pages.currPage ? true : false}
                  >
                    {ele}
                  </Pagination.Item>
                ))}

              <Pagination.Next
                onClick={() => {
                  handlePageChange(pages.currPage + 1);
                }}
                disabled={
                  pages.currPage === pages.pageArr[pages.pageArr.length - 1]
                    ? true
                    : false
                }
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing{" "}
            <b>
              {(pages.currPage - 1) * 20} -{" "}
              {pages.currPage * 20 > pages.totalDatas
                ? pages.totalDatas
                : pages.currPage * 20}
            </b>{" "}
            entries
          </small>
        </Card.Footer> */}
      </Card.Body>
    </Card>
  );

  console.log(rewardsModalShow);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-md-0" style={{ width: "100%" }}>
          {/* <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Resturants</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="d-flex justify-content-between align-items-center px-4">
            <div>
              <h4>All Users</h4>
            </div>
            <div>
              <button
                onClick={() => {
                  toggleModalUser();
                  setUserData({});
                }}
                className="btn btn-primary mt-0"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          {/* <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup> */}
        </div>
      </div>

      {/* <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div> */}

      <CustomTable />

      <AddRewardsModal show={rewardsModalShow} onHide={toggleModalRewards} />

      <AddUserModal show={userModalShow} onHide={toggleModalUser} />
    </>
  );
};

export default Banners;
