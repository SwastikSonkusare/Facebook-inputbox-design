import React, { useState, useEffect } from "react";

// import axios from "axios";

// import { Grid } from "@giphy/react-components";
// import { GiphyFetch } from "@giphy/js-fetch-api";
import { v4 as uuidv4 } from "uuid";

import Post from "../Post/Post";

import user from "../../assets/images/photo-1501196354995-cbb51c65aaea.jfif";
import gif from "../../assets/images/gif.png";

import "./InputBox.scss";

const InputBox = () => {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchGifs, setFetchGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [selectImage, setSelectImage] = useState("");

  const [posts, setPosts] = useState([]);

  const GIPHY_API = `https://api.giphy.com/v1/gifs/search?api_key=vN5xGq3JsUZRGkVYJBgYdJ5a7bJ4ZsSQ&limit=10&offset=0&q=${query}`;

  useEffect(() => {
    const fetchGiphyGifs = async () => {
      setLoading(true);

      const response = await fetch(GIPHY_API);

      const data = await response.json();

      setLoading(false);

      setFetchGifs(data.data);
    };
    fetchGiphyGifs();
  }, [query]);

  const showSearchBar = () => {
    setShowInput((prevState) => !prevState);
  };

  const handleFetchGifs = (e) => {
    e.preventDefault();

    setQuery(searchTerm);
    setSearchTerm("");
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    if (text.length && image.length) {
      let copy = [...posts];

      copy = [...copy, { id: uuidv4(), image, text }];

      setPosts(copy);

      setText("");
      setImage("");
      setQuery("");
      setShowInput(false);
    }
  };

  const handleClickImage = (index) => {
    setSelectImage(index);
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmitPost}>
          <div className="container__top-section">
            <img src={user} alt="user" className="container__image"></img>

            <input
              className="form__input"
              type="text"
              placeholder="What's on your mind, Mike?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
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
        {showInput && (
          <div>
            <form onSubmit={handleFetchGifs}>
              <input
                className="form__input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
              <button hidden type="submit">
                Submit
              </button>
            </form>

            {loading ? (
              "Loading"
            ) : (
              <div className="gifs__container">
                {fetchGifs.length &&
                  fetchGifs.map((g, index) => (
                    <div
                      onClick={() => handleClickImage(index)}
                      className={selectImage === index ? "border" : ""}
                      key={index}
                    >
                      <img
                        src={g.images.fixed_height.url}
                        key={index}
                        alt="gifs"
                        onClick={() => setImage(g.images.fixed_height.url)}
                      ></img>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      {posts.length
        ? posts.map((post) => <Post post={post} />)
        : "No posts yet"}
    </>
  );
};

export default InputBox;
