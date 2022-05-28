import { Link } from "react-router-dom";
import "./post.css";

export default function Post(props) {
  const heading =props.topic;
  const elements =heading.split(" ");
  const firstElement = elements[0]+" ";
  let SecondElement="";
  for (let i = 1; i < elements.length; i++) {
     SecondElement=SecondElement+elements[i]+" ";
  }
  return (
    <div className="post" onClick={props.click}>
      <img
        className="postImg"
        src={props.img}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <span className="link" >
              {props.place}
            </span>
          </span>
          <span className="postCat">
            <sapn className="link" >
              {props.category}
            </sapn>
          </span>
        </div>
        <span className="postTitle">
          <p  className="link">
          <span className="chgedcolor"> {firstElement}</span> 
          {SecondElement}
          </p>
        </span>
        <span className="postDate">{props.timeposted} hour ago</span>
      </div>
      <p className="postDesc">
      {props.content}
      </p>
    </div>
  );
}
