import React, { useState, useEffect } from "react";

// import axios from "axios";

// import { Grid } from "@giphy/react-components";
// import { GiphyFetch } from "@giphy/js-fetch-api";
import { v4 as uuidv4 } from "uuid";

import Post from "../Post/Post";

import Form from "../Form/Form";
import Gifs from "../Gifs/Gifs";

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
        <Form
          handleSubmitPost={handleSubmitPost}
          showSearchBar={showSearchBar}
          text={text}
          image={image}
          setText={setText}
        />
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
                    <Gifs
                      handleClickImage={handleClickImage}
                      index={index}
                      selectImage={selectImage}
                      setImage={setImage}
                      g={g}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      {posts.length ? (
        posts.map((post) => <Post post={post} />)
      ) : (
        <div>No posts yet</div>
      )}
    </>
  );
};

export default InputBox;
