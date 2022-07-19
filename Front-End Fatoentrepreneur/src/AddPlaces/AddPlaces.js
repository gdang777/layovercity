import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./AddPlaces.css";
import Footer from "../assets/Components/Footer/Footer";

function AddPlaces() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));
  // console.log(userLoginData)
  const highlights = [
    {
      id: "wifi",
      value: "wifi",
      title: "Wifi",
    },
    {
      id: "reservations",
      value: "reservations",
      title: "Reservations",
    },
    {
      id: "creditCards",
      value: "creditCards",
      title: "Credit cards",
    },
    {
      id: "carParking",
      value: "carParking",
      title: "Car parking",
    },
    {
      id: "nonSmoking",
      value: "nonSmoking",
      title: "Non smoking",
    },
    {
      id: "swimmingPool",
      value: "swimmingPool",
      title: "Swimming pool",
    },
    {
      id: "airConditioner",
      value: "airConditioner",
      title: "Air conditioner",
    },
    {
      id: "cocktails",
      value: "cocktails",
      title: "cocktails",
    },
  ];

  const [formData, setFormData] = useState({
    placeName: "",
    price: "",
    stayTime: "",
    description: "",
    address: "",
    email: "",
    phone1: "",
    phone2: "",
    website: "",
    facebookURL: "",
    instagramURL: "",
    twitterURL: "",
  });

  const dataChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    e.preventDefault();
  };

  const feature=[];
  const [checked,setChecked]=useState(true)
  const onCheck=(e)=>{
    if(e.target.checked){
      feature.push(e.target.value)
    }else{
      for(let i=0 ;i<feature.length;i++){
        if(feature[i]===e.target.value){
          feature.splice(i,1)
        }
      }
    }
  }

  const [category,setCategory]=useState('');
  const [placetype,setPlaceType]=useState('');
  // console.log(category,placetype);

  const image = [];
  const [picked, setPicked] = useState(false);
  const fileUpload = (e) => {
    if (!picked) {
      image.push(e.target.files);
      setPicked(true);
    } else {
      while (image.length != 0) {
        image.pop();
      }
    }
  };


  const submitPlaces = () => {
    const data = {
      category: formData.placeName,
      price: formData.price,
      city:"62782323c78dfb38bf85ed95",
      description: formData.description,
      features:feature,
      subCategory:placetype,
      images:image,
      contact: {
        address: formData.address,
        email: formData.email,
        website: formData.website,
        facebook: formData.facebookURL,
        instagram: formData.instagramURL
      },
    };

    // console.log(data);
    async function postData(url = "", data = {}) {
      // console.log(data);
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

    // console.log("Clicked");

    postData(
      "https://fatoentrepreneur.herokuapp.com/places/add",
      data
    ).then((res) => {
      // console.log("Ho toh raha hai")
      // console.log("Response Message", res);
    });
  };

  return (
    <div className=" addplaces m-0 p-0">
      <div className=" container">
        {/* <div className="navigate d-flex flex-wrap justify-content-start">
        <h4 className="py-4 addPlaceHeading mx-4">
          {" "}
          <span className="chgedcolor">Add</span> new place
        </h4>
        <h4 className="py-4 addPlaceHeading mx-4">
          {" "}
          <span className="chgedcolor">Add</span> new place
        </h4>
        </div> */}
        <div className="formfield">
          <h4>General </h4>
          <div className="fields my-4">
            <label htmlFor="place">
              <h6>Place Name*</h6>
              <input
                type="text"
                placeholder="What's the name of the place"
                onChange={dataChangeHandler}
                name="placeName"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <div className="col-4 px-2">
              <label htmlFor="place">
                <h6>Price*</h6>
                <input
                  type="number"
                  placeholder="Only Numbers"
                  onChange={dataChangeHandler}
                  name="price"
                />
              </label>
            </div>
            <div className="col-4 px-2">
              <label htmlFor="place">
                <h6>Time</h6>
                <input
                  type="Text"
                  placeholder="Hours/Days/Month"
                  onChange={dataChangeHandler}
                  name="stayTime"
                />
              </label>
            </div>
          </div>
          <div className="fields my-4">
            {/* <h6 className="editor my-4">Description</h6> */}
            {/* <Editor className="editor my-4 py-4" /> */}
            <label htmlFor="place">
              <h6>Description</h6>
              <textarea
                rows="5"
                cols=""
                placeholder="Item description"
                onChange={dataChangeHandler}
                name="description"
              ></textarea>
            </label>
          </div>
          <div className="fields my-4">
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
          <div className="fields my-4">
            <label htmlFor="place">
              <h6>Category*</h6>
              <select placeholder="select Category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option
                  value="Food and Drink"
                  name="category"
                >
                  Food and Drink
                </option>
                <option
                  value="See & Do"
                  name="category"
                >
                  See & do
                </option>
                <option
                  value="Shopping"
                  name="category"
                >
                  Shopping
                </option>
                <option
                  value="Stay"
                  name="category"
                >
                  Stay
                </option>
              </select>
            </label>
          </div>
          <div className="fields my-4">
            <label htmlFor="place">
              <h6>Place type*</h6>
              <select placeholder="select Category" onChange={(e)=>setPlaceType(e.target.value)}>
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
          <form action=""></form>
        </div>
        <div className="formfield">
          <h4>HIGHTLIGHTS </h4>
          <div className="fields my-4">
            <label htmlFor="place">
              <div className="inputFields d-flex justify-content-around align-items-start my-4">
                {highlights.map((data, index) => {
                  return (
                    <div className="d-flex flex-column mx-4">
                      <input
                        type="checkbox"
                        id={data.id}
                        value={data.value}
                        className="my-2 inputval"
                        onChange={onCheck}
                      />
                      <label for={data.id}>{data.title}</label>
                    </div>
                  );
                })}
              </div>
            </label>
          </div>
        </div>
        {/* <div className="formfield">
          <h4>Menu </h4>
          <div className="fields d-flex  my-4">
            <div className="col-4 px-2">
              <label htmlFor="place">
                <h6>Name</h6>
                <input type="number" placeholder="Only Numbers" />
              </label>
            </div>
            <div className="col-4 px-2">
              <label htmlFor="place">
                <h6>Price</h6>
                <input type="Text" placeholder="Hours/Days/Month" />
              </label>
            </div>
            <label htmlFor="place">
              <h6>Type</h6>
              <select placeholder="select Category">
                <option value="">Select type</option>
                <option value="Food and Drink">Desert</option>
                <option value="Food and Drink">Main Course</option>
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
              ></textarea>
            </label>
          </div>
          <div className="col-4 px-2">
            <label htmlFor="place">
              <h6>Image</h6>
              <input type="file" placeholder="Only Numbers" />
            </label>
          </div>
        </div> */}
        <div className="formfield">
          <h4>Location </h4>
          {/* <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <h6>City/Town*</h6>
              <select placeholder="select Category">
                <option value="">Select City/Town</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Barcelona">Barcelona</option>
                <option value="London">London</option>
                <option value="LosAngeles">Los Angeles</option>
                <option value="NewYork">New York</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
              </select>
            </label>
            <label htmlFor="place" className="mx-2">
              <h6>Time Zone</h6>
              <select placeholder="select Category">
                <option value="">UTC+0</option>
                <option value="time1">time1</option>
                <option value="time1">time2</option>
                <option value="time1">time3</option>
              </select>
            </label>
          </div> */}
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
        {/* <div className="formfield">
          <h4> Opening Hours </h4>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Monday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input
                type="Text"
                placeholder="9:00AM - 5:00 PM OR 9:00AM - 11:00 AM"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Tuesday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input
                type="Text"
                placeholder="9:00AM - 5:00 PM OR 9:00AM - 11:00 AM"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Wednesday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input
                type="Text"
                placeholder="9:00AM - 5:00 PM OR 9:00AM - 11:00 AM"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Thursday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input
                type="Text"
                placeholder="9:00AM - 5:00 PM OR 9:00AM - 11:00 AM"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Friday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input
                type="Text"
                placeholder="9:00AM - 5:00 PM OR 9:00AM - 11:00 AM"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Saturday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input
                type="Text"
                placeholder="9:00AM - 5:00 PM OR 9:00AM - 11:00 AM"
              />
            </label>
          </div>
          <div className="fields d-flex  my-4">
            <label htmlFor="place" className="mx-2">
              <input type="text" placeholder="day" value="Sunday" />
            </label>
            <label htmlFor="place" className="mx-2">
              <input type="Text" placeholder="Closed" />
            </label>
          </div>
        </div> */}
        {/* <div className="formfield">
          <h4>FAQs </h4>
          <div className="fields my-4">
            <label htmlFor="place" className="my-2">
              <h6>Questions</h6>
              <input type="text" placeholder="Question" />
            </label>
            <label htmlFor="place" className="my-2">
              <h6>Answer</h6>
              <textarea rows="2" cols="" placeholder="Answer"></textarea>
            </label>
          </div>
        </div> */}
        <button className="submitbtn my-4" onClick={submitPlaces}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddPlaces;
