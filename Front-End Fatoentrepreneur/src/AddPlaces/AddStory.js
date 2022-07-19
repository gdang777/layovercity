import React, { useState } from "react";
import "./AddPlaces.css";

function AddStory() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));
  const [formData, setFormData] = useState({
    storyName: "",
    city: "",
    country: "",
    description: "",
    address: "",
    email: "",
    phone1: "",
    phone2: "",
    website: "",
    facebookURL: "",
    instagramURL: "",
    twitterURL: "",
    file: [],
  });
  const [category, setCategory] = useState("");
  const dataChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const image = [];
  const [picked, setPicked] = useState();
  const fileUpload = (e) => {
    e.preventDefault();

    console.log(e.target.files);
    const [f] = e.target.files;
    setPicked(f);
    // image.push(e.target.files);
    // if (!picked) {
    //   setPicked(true);
    // } else {
    //   while (image.length != 0) {
    //     image.pop();
    //   }
    //   setPicked(false);
    // }
  };
  // console.log(picked,category)

  const submitStory = (e) => {
    e.preventDefault();
    const data = {
      title: formData.storyName,
      city: formData.city,
      country: formData.country,
      description: formData.description,
      subCategory: category,
      category: category,
      images: picked
    };
    console.log(data);
    async function postData(url = "", data = {}) {
      console.log(data);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "accessToken" : userLoginData.accessToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData("https://fatoentrepreneur.herokuapp.com/stories/add", data).then(
      (res) => {
        console.log("Response Message", res);
      }
    );
  };
  return (
    <div className=" addplaces m-0 p-0">
      <div className=" container">
        <div className="formfield">
          <div className="fields my-4">
            <label htmlFor="place">
              <h6>Story Title*</h6>
              <input
                type="text"
                placeholder="Write your story title"
                onChange={dataChangeHandler}
                name="storyName"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <div className="col-4 px-2">
              <label htmlFor="place">
                <h6>City</h6>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={dataChangeHandler}
                />
              </label>
            </div>
            <div className="col-4 px-2">
              <label htmlFor="place">
                <h6>Country</h6>
                <input
                  type="Text"
                  placeholder="Country"
                  name="country"
                  onChange={dataChangeHandler}
                />
              </label>
            </div>
            <label htmlFor="place">
              <h6>Category</h6>
              <select
                placeholder="select Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Activity">Activity</option>
                <option value="Apartment">Apartment</option>
                <option value="Bakeries">Bakeries</option>
                <option value="Bars">Bars</option>
                <option value="Coffee Shop">Coffee Shop</option>
                <option value="Culture">Culture</option>
                <option value="Hostel">Hostel</option>
                <option value="Hotel">Hotel</option>
                <option value="Luxery">Luxery</option>
                <option value="Market">Market</option>
                <option value="Museum">Museum</option>
                <option value="Park">Park</option>
                <option value="Resturants">Resturants</option>
                <option value="Temple">Temple</option>
              </select>
            </label>
          </div>
          <div className="fields my-4">
            <label htmlFor="place">
              <h6>Description</h6>
              <textarea
                rows="5"
                cols=""
                placeholder="Item description"
                name="description"
                onChange={dataChangeHandler}
              ></textarea>
            </label>
          </div>
          <div className="col-4 px-2">
            <label htmlFor="place">
              <h6>
                Image <span>(Your can select multiple files**)</span>
              </h6>
              <input
                type="file"
                multiple
                name="files"
                placeholder="select multiple files"
                onChange={fileUpload}
              />
            </label>
          </div>
        </div>
        <div className="formfield">
          <h4>Location </h4>
          <div className="fields my-4">
            <label htmlFor="place">
              <h6>Place Address*</h6>
              <input
                type="text"
                placeholder="Full address"
                onChange={dataChangeHandler}
                name="address"
              />
            </label>
          </div>
        </div>
        <div className="formfield">
          <h4>Contact Info </h4>
          <div className="fields my-4">
            <label htmlFor="place" className="my-2">
              <h6>Email</h6>
              <input
                type="email"
                placeholder="Your email address"
                onChange={dataChangeHandler}
                name="email"
              />
            </label>
            <label htmlFor="place" className="my-2">
              <h6>Phone Number 1(Optional)</h6>
              <input
                type="text"
                placeholder="Your phone 1 number"
                onChange={dataChangeHandler}
                name="phone1"
              />
            </label>
            <label htmlFor="place" className="my-2">
              <h6>Phone Number 2(Optional)</h6>
              <input
                type="text"
                placeholder="Your phone 2 number"
                onChange={dataChangeHandler}
                name="phone2"
              />
            </label>
            <label htmlFor="place" className="my-2">
              <h6>Website (Optional)</h6>
              <input
                type="text"
                placeholder="Your website url"
                onChange={dataChangeHandler}
                name="website"
              />
            </label>
          </div>
        </div>
        <div className="formfield">
          <h4>Social Networks </h4>
          <div className="fields my-4">
            <label htmlFor="place" className="my-2">
              <h6>Facebook</h6>
              <input
                type="text"
                placeholder="Facebook url"
                onChange={dataChangeHandler}
                name="facebookURL"
              />
            </label>
            <label htmlFor="place" className="my-2">
              <h6>Instagram</h6>
              <input
                type="text"
                placeholder="Instagram url"
                onChange={dataChangeHandler}
                name="instagramURL"
              />
            </label>
            <label htmlFor="place" className="my-2">
              <h6>Twitter</h6>
              <input
                type="text"
                placeholder="Twitter url"
                onChange={dataChangeHandler}
                name="twitterURL"
              />
            </label>
          </div>
        </div>
        <button className="submitbtn my-4" onClick={submitStory}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddStory;
