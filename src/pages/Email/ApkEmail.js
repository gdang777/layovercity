import React, { useState, useEffect, useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import useApi from "../../Hooks/useApi";
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import "./Home.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Card,
  Button,
  Table,
  Dropdown,
  Modal,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";

import { UPLOAD_URL, UPLOAD_TOKEN } from "../../utils/env";
import axios from "axios";

const CustomEmail = () => {
  const [pages, setPages] = useState({
    currPage: 1,
    totalPages: 0,
    totalDatas: 0,
    pageArr: [],
  });
  const [userDatas, setUserDatas] = useState([]);
  const [userDatasFixed, setUserDatasFixed] = useState([]);
  const api = useApi();
  const [pictures, setPictures] = useState([]);
  const [picturesUploading, setPicturesUploading] = useState(false);

  const [data, setData] = useState({ email: [], subject: "", body: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onDrop = (picture) => {
    console.log("picture", picture);
    const pictureName = picture[0].name;
    var bodyFormData = new FormData();
    bodyFormData.append("target", picture[0]);
    setPicturesUploading(true);
    axios({
      method: "post",
      url: `${UPLOAD_URL}/users/upload`,
      data: bodyFormData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        accesstoken: UPLOAD_TOKEN,
      },
    })
      .then((res) => {
        setPicturesUploading(false);
        console.log("res", res);

        setPictures([
          ...pictures,
          {
            filename: pictureName,
            path: res.data.url,
          },
        ]);
      })
      .catch((err) => {
        setPicturesUploading(false);
        console.log("err", err);
      });
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("target", file);
            var bodyFormData = new FormData();
            bodyFormData.append("target", file);
            fetch(`${UPLOAD_URL}/users/upload`, {
              method: "post",
              body: body,
              withCredentials: true,
              headers: {
                accesstoken: UPLOAD_TOKEN,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                console.log("res", res);
                resolve({
                  default: res.url,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const getDatas = () => {
    api
      .get(`/users/all-users`)
      .then((res) => {
        setUserDatasFixed([...res.data.result]);
        const formatData = res.data.result.map((ele) => ({
          ...ele,
          value: ele.email,
          label: ele.email,
        }));
        setUserDatas([
          { value: "selectAll", label: "Select All" },
          { value: "unselectAll", label: "UnSelect All" },
          ...formatData,
        ]);
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

  const handleSEnd = () => {
    const formatAttachments = pictures.map((ele) => ele.path);
    const formatEmails = data.email.map((ele) => ele.email);
    const formatDta = {
      email: [...formatEmails],
    };

    api
      .post(`/admin/email-apk`, formatDta)
      .then((res) => {
        alert("Email Sent Successfully");
      })
      .catch((err) => {
        alert("Some Error Occures");
      });
  };

  useEffect(() => {
    getDatas();
  }, [pages.currPage]);

  console.log(userDatas);
  return (
    <div className="mt-5">
      <Form.Label>Select Emails</Form.Label>
      <Select
        isMulti
        name="email"
        value={data.email}
        options={userDatas}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(val) => {
          console.log(val[val.length - 1]);
          if (val[val.length - 1].value === "selectAll") {
            const emails = userDatasFixed.map((ele) => ({
              value: ele.email,
              label: ele.email,
            }));
            setData({ ...data, email: [...emails] });
          } else if (val[val.length - 1].value === "unselectAll") {
            setData({ ...data, email: [] });
          } else {
            setData({ ...data, email: [...val] });
          }
        }}
        clearValue={() => {
          console.log("clear");
        }}
      />
      {/* <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Write Subject"
            value={data.subject}
            name="subject"
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      <Form.Label>Body</Form.Label>
      <div className="ckeditor">
        <CKEditor
          editor={ClassicEditor}
          name="body"
          value={data.body}
          data=""
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            handleChange({ target: { name: "body", value: data } });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
          config={{
            extraPlugins: [uploadPlugin],
          }}
        />
      </div> */}
      {/* {picturesUploading && <div class="loader">Uploading..</div>}
      {pictures && pictures.length > 0 && (
        <div style={{ margin: "20px 0" }} class="d-flex">
          {pictures.map((ele, i) => (
            <div
              style={{
                border: "1px solid grey",
                padding: "10px",
                fontWeight: "bold",
                borderRadius: "10px",
                marginBottom: "20px",
                marginRight: "20px",
              }}
              class="d-flex align-items-center justify-content-between"
            >
              <div>{ele.filename}</div>
              <div
                className="text-danger"
                onClick={() => {
                  const filterItems = pictures.filter(
                    (item) => ele.path !== item.path
                  );
                  setPictures([...filterItems]);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </div>
          ))}
        </div>
      )} */}
      {/* <div>
        <ImageUploader
          withIcon={false}
          onChange={onDrop}
          accept="*"
          withLabel={false}
          imgExtension={[]}
          singleImage={true}
          buttonStyles={{
            padding: "15px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          buttonText="Add attachments"
        />
      </div> */}

      <div
        className="d-flex justify-content-end mb-5 mt-5"
        style={{ cursor: "pointer" }}
      >
        <Button onClick={handleSEnd}>Send</Button>
      </div>
    </div>
  );
};

export default CustomEmail;
