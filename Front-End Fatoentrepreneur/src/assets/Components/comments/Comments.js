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
  commentsUrl,
  currentUserId,
  comment,
  userLoginData,
  placeID,
  place,
  setPlaceComments,
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

  // console.log(placeID)
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text) => {
    async function postData(url = "", data = {}) {
      console.log(data);
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

    const data = {
      placeId: placeID,
      description: text,
      type: "place",
    };

    postData("https://fatoentrepreneur.herokuapp.com/comments", data).then(
      (res) => {
        fetch(
          `https://fatoentrepreneur.herokuapp.com/comments/places?id=${placeID}`
        )
          .then((res) => res.json())
          .then((json) => {
            setPlaceComments(json.result);
          });
      }
    );
  };
// console.log(p)
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
