import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams, useHistory } from "react-router-dom";

import Post from "../post/Post";
import "./posts.css";
import Loader from "../../assets/Components/Loader/Loader";

export default function Posts() {
  const location = useHistory();
  const [storydata, setStoryData] = useState([]);
  const [loading, setLoading] = useState(null);

  const storyClickHandler=(e)=>{
    location.push(`story/${e.title}/${e._id}`)
  }
  useEffect(() => {
    setLoading(true);
    fetch(`https://fatoentrepreneur.herokuapp.com/stories`)
      .then((res) => res.json())
      .then((json) => {
        setStoryData(json.result);
        setLoading(false);
      });
  }, []);

  const content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
  officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
  fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
  atque, exercitationem quibusdam, reiciendis odio laboriosam?`;
  return (
    <div className="posts">
      {loading
        ? <Loader/>
        : storydata.map((story, index) => {
            return (
              <Post
                key={index}
                img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                place={story.city}
                category={story.category}
                topic={story.title}
                timeposted="1"
                content={story.description}
                click={()=>storyClickHandler(story)}
              />
            );
          })}
    </div>
  );
}
