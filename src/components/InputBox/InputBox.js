import React, { useState, useEffect } from "react";

import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

import user from "../../assets/images/photo-1501196354995-cbb51c65aaea.jfif";
import gif from "../../assets/images/gif.png";

import "./InputBox.scss";

const InputBox = () => {
  const handleSubmitPost = (e) => {
    e.preventDefault();
  };

  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("dogs");
  const [fetchGifs, setFetchGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  //   const gf = new GiphyFetch("vN5xGq3JsUZRGkVYJBgYdJ5a7bJ4ZsSQ");

  const GIPHY_API = `https://api.giphy.com/v1/gifs/search?api_key=vN5xGq3JsUZRGkVYJBgYdJ5a7bJ4ZsSQ&limit=10&offset=0&q=${searchTerm}`;

  useEffect(() => {
    if (searchTerm.length > 0) {
      setLoading(true);
      fetch(GIPHY_API)
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((result) => {
          setFetchGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch(() => {
          setLoading(false);
          alert("Something went wrong");
        });
    }

    console.log(fetchGifs);
  }, [searchTerm]);

  const showSearchBar = () => {
    setShowInput((prevState) => !prevState);
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

      <div className="container__bottom-section" onClick={showSearchBar}>
        <div>
          <img src={gif} alt="gif"></img>
          <span>Gif</span>
        </div>
      </div>

      {showInput && (
        <div>
          <input
            className="form__input"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>

          <Grid
            width={400}
            columns={3}
            gutter={6}
            fetchGifs={fetchGifs}
            key={searchTerm}
          />
        </div>
      )}
    </div>
  );
};

export default InputBox;
