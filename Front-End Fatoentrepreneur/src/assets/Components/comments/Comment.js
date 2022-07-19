import CommentForm from "./CommentForm";

import userImg from "./user-icon.png";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  // console.log(replies , comment._id);

  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment._id && replies.length === 0 && !timePassed;
  const canReply = Boolean(comment._id);
  const canEdit = currentUserId === comment._id && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  // const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={userImg} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.createdBy.firstName}</div>
          <div>
            {comment.createdBy.createdAt.substring(0, 10)}{" "}
            {comment.createdBy.createdAt.substring(11, 16)}
          </div>
        </div>
        {!isEditing && (
          <div className="comment-text">{comment.description}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment._id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {sessionStorage.getItem("userLoginData") &&
          JSON.parse(sessionStorage.getItem("userLoginData")).isLoginSuccess ? <div>
          {canReply &&  (
            <div
              className="comment-action"
              onClick={() =>
                {
                  console.log(comment._id)
                  setActiveComment({ id: comment._id, type: "replying" })
                }
              }
            >
              Reply
            </div>
          ) }
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
</div> : null}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => {addComment(text, comment.parentCommentId ? comment.parentCommentId : comment._id);setActiveComment({})}}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
