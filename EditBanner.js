import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import useApi from "./src/Hooks/useApi";
import ImageUploading from "react-images-uploading";
import { useHistory } from "react-router-dom";

const CreateBanner = (props) => {
  const api = useApi();
  let history = useHistory();
  const [data, setData] = useState({
    image: "",
    position: "",
    description: "",
  });
  const [images, setImages] = React.useState([]);
  const optionsData = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "strawberry" },
    { value: "vanilla", label: "vanilla" },
  ];

  const [resturants, setResturants] = useState([]);
  const [values, setValues] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    let formatData = new FormData();
    formatData.append("target", imageList[0].file);
    api
      .post("/auth/upload", formatData)
      .then((res) => setData({ ...data, image: res.data.url }))
      .catch((err) => console.log(err));
  };

  const getDatas = (formatData = []) => {
    api
      .get(`/banner/${props.match.params.id}`)
      .then((res) => {
        setData({
          image: res.data.result.bannerImage,
          position: res.data.result.position,
          description: res.data.result.description,
        });

        const formated = res.data.result.restaurantIds.map((ele) => {
          const findele = formatData.find((item) => item._id === ele);
          return { ...findele };
        });

        setValues([...formated]);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    api
      .get(`/restaurant?from=0&size=5000`)
      .then((res) => {
        const formatData = res.data.result.map((ele) => ({
          ...ele,
          value: ele.name,
          label: ele.name,
        }));

        setResturants([...formatData]);

        getDatas(formatData);
      })
      .catch((err) => {
        console.log("err", err);
        getDatas();
      });
  }, []);

  const handleSubmit = () => {
    const formatList = values.map((ele) => ele._id);
    const formatData = {
      restaurantIds: formatList,
      bannerImage: data.image,
      position: data.position,
      description: data.description,
    };

    api
      .put(`/banner/${props.match.params.id}`, formatData)
      .then((res) => history.goBack())
      .catch((err) => console.log(err));

    console.log(formatData);
  };

  return (
    <div>
      <div className="pt-4 pb-3">
        <h4>Edit Banner</h4>
      </div>
      <div>
        <Form.Label>Select Resturants</Form.Label>
        <Select
          isMulti
          name="colors"
          value={values}
          options={resturants}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(val) => {
            setValues([...val]);
          }}
          clearValue={() => {
            console.log("clear");
          }}
        />
      </div>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Position"
                value={data.position}
                name="position"
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                as="textarea"
                rows={5}
                placeholder="Description"
                value={data.description}
                name="description"
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <div>
        <ImageUploading value={data.image} onChange={onChange}>
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
                className="btn btn-primary"
              >
                Click or Drop here
              </button>

              {data.image && (
                <div className="image-item">
                  <div className="p-3">
                    <img src={data.image} alt="" width="150" />
                  </div>
                  <div className="image-item__btn-wrapper pt-3">
                    <button
                      className="btn btn-success"
                      onClick={() => onImageUpdate()}
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: 10 }}
                      className="btn btn-danger me-3"
                      onClick={() => setData({ ...data, image: "" })}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>

      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <button onClick={handleSubmit} className="btn btn-primary mt-5">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBanner;
