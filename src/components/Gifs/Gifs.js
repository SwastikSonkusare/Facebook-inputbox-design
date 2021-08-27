import React from "react";

import "./Gifs.scss";

const Gifs = ({ handleClickImage, index, selectImage, setImage, g }) => {
  return (
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
  );
};

export default Gifs;
