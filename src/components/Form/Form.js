import React from "react";

import user from "../../assets/images/photo-1501196354995-cbb51c65aaea.jfif";
import gif from "../../assets/images/gif.png";
import search from "../../assets/images/icons8-search.svg";

import "./Form.scss";

const Form = ({ handleSubmitPost, showSearchBar, text, setText, image }) => {
  return (
    <form className="form" onSubmit={handleSubmitPost}>
      <div className="container__top-section">
        <img src={user} alt="user" className="container__image"></img>

        <div className="form__container">
          <input
            className="form__input"
            type="text"
            placeholder="What's on your mind, Mike?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <img className="form__search" src={search} alt="search"></img>
        </div>
        <button hidden type="submit">
          Submit
        </button>
      </div>
      <div className="container__bottom-section" onClick={showSearchBar}>
        <div>
          <img src={gif} alt="gif"></img>
          <span>Gif</span>
        </div>

        <button
          className={`${
            text.length && image.length
              ? "container__button active"
              : "container__button"
          }`}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default Form;
