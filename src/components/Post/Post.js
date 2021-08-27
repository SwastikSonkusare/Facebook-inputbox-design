import React from "react";

import user from "../../assets/images/photo-1501196354995-cbb51c65aaea.jfif";
import like from "../../assets/images/like.png";
import like2 from "../../assets/images/like (1).png";
import comment from "../../assets/images/chat.png";
import share from "../../assets/images/share.png";

import "./Post.scss";

const Post = ({ post }) => {
  const postActions = [
    {
      icon: like,
      text: "Like",
    },
    {
      icon: comment,
      text: "Comment",
    },
    {
      icon: share,
      text: "Share",
    },
  ];

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container-left">
          <div>
            <img src={user} alt="user"></img>
            <div className="post__name">
              <span>Mike</span>
              <small>{new Date().toLocaleString()}</small>
            </div>
          </div>

          <div className="post__container-right">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="post__content">
          <span>{post.text}</span>
          <img src={post.image} alt="gifs"></img>
        </div>

        <div className="post__cta">
          <div>
            <div className="post__likes">
              <img src={like2} alt="like"></img>
              <span>100 Likes</span>
            </div>

            <div className="post__comments">
              <span>32 Comments</span>
              <span>12 Shares</span>
            </div>
          </div>

          <div className="post__actions">
            {postActions.map((postAction) => (
              <div>
                <img src={postAction.icon} alt="icon"></img>
                <span>{postAction.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
