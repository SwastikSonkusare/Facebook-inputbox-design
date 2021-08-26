import React from "react";

import user from "../../assets/images/photo-1501196354995-cbb51c65aaea.jfif";
import gif from "../../assets/images/gif.png";

import "./InputBox.scss";

const InputBox = () => {
  const handleSubmitPost = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="container__top-section">
        <img src={user} alt="user" className="container__image"></img>

        <form className="form">
          <input
            className="form__input"
            type="text"
            placeholder="What's on your mind, Mike?"
          ></input>
          <button hidden type="submit" onClick={handleSubmitPost}>
            Submit
          </button>
        </form>
      </div>

      <div className="container__bottom-section">
        <div>
          <img src={gif} alt="gif"></img>
          <span>Gif</span>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
