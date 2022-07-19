import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams, useHistory } from "react-router-dom";
import "./SingleStory.css";
// import ReactBootstrapCarousel from "react-bootstrap-carousel";
// import "bootstrap/dist/css/bootstrap.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../../assets/Components/Footer/Footer";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import Loader from "../../assets/Components/Loader/Loader";
import Comments from "../../assets/Components/comments/Comments";

function SingleStory() {
  const content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
  officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
  fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
  atque, exercitationem quibusdam, reiciendis odio laboriosam?`;

  let { storyID } = useParams();
  const [storyData, setStoryData] = useState([]);
  const [storyComment,setStoryComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fatoentrepreneur.herokuapp.com/stories/${storyID}`)
      .then((res) => res.json())
      .then((json) => {
        setStoryData(json.story);
        // console.log(json.story)
        setLoading(false);
      });

    fetch(`https://fatoentrepreneur.herokuapp.com/comments/stories?id=${storyID}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setStoryComment(json.result);
      });
  }, []);

  // const heading =storyData.title;
  // const elements =heading.split(" ");
  // const firstElement = elements[0]+" ";
  // let SecondElement="";
  // for (let i = 1; i < elements.length; i++) {
  //    SecondElement=SecondElement+elements[i]+" ";
  // }

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="singlestoryhead container-fluid my-2">
        <img
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-sm-12 m-0">
            <div className="storyHeading my-5 d-flex justify-content-evenly">
              <span className="postTitle">
                <h2 className="text-center">{storyData.title}</h2>
              </span>
              <span>
                <i
                  class={`fa-${
                    likes ? "solid" : "regular"
                  } fa-heart redHeart mx-3`}
                  style={{ fontSize: "24px" }}
                  onClick={() => {
                    setLikes(!likes);
                  }}
                ></i>
              </span>
            </div>
            <div className="stroyContent text-start px-4 my-4">
              <p>{storyData.description}</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="sidebar">
              <Sidebar image="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" />
            </div>
          </div>
          <div className="px-4 col-6">
            <Comments setStoryComment={setStoryComment} placeID={storyID} comment={storyComment} isStory={true} currentUserId={1} />
          </div>
          <div className="otherStories">
            <h2 className="m-4">
              {" "}
              <span className="chgedcolor">Some</span> other stories
            </h2>
          </div>
        </div>
        <div className="d-flex">
          <Post
            img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            place="London"
            category="Stay"
            topic="Lorem ipsum dolor sit amet"
            timeposted="1"
            content={content}
          />

          <Post
            img="https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            place="Paris"
            category="Food"
            topic="Lorem ipsum dolor sit amet"
            timeposted="2"
            content={content}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SingleStory;
