import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Comment.css";
import {
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

const Comments = ({
  currentUserId,
  comment,
  userLoginData,
  placeID,
  setPlaceComments,
  setStoryComment,
  isStory = false,
}) => {
  const history = useHistory();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  // setBackendComments(comment);
  // console.log(comment);
  // console.log(userLoginData);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentCommentId === null
  );

  userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));

  // console.log(placeID)
  const getReplies = (commentId) => 
    backendComments
      .filter((backendComment) => backendComment.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  
  const addComment = (text,replyId) => {
    async function postData(url = "", data = {}) {
      // console.log(data);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          accessToken: userLoginData.accessToken,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    // console.log("here",replyId,text)

    const data = replyId ? {
      placeId: placeID,
      description: text,
      type: isStory ? "story" : "place",
      parentCommentId: replyId
    } 
    :
    {
      placeId: placeID,
      description: text,
      type: isStory ? "story" : "place",
    };

    // console.log(data);

    postData(replyId ? "https://fatoentrepreneur.herokuapp.com/comments/child" : "https://fatoentrepreneur.herokuapp.com/comments",data).then(
      (res) => {
        console.log("working?",res)
        fetch(
          `https://fatoentrepreneur.herokuapp.com/comments/${
            isStory ? `stories` : "places"
          }?id=${placeID}`
        )
          .then((res) => res.json())
          .then((json) => {
            // console.log(json.result)
            // console.log("Working!",placeID,isStory,json);
            isStory ? setStoryComment(json.result) : setPlaceComments(json.result);
          });
      }
    );
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      {userLoginData && userLoginData.isLoginSuccess ? (
        <>
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Write" handleSubmit={addComment} />
        </>
      ) : null}
      <div className="comments-container">
        {comment &&
          comment.map((rootComment) => (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={rootComment.children}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={currentUserId}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
