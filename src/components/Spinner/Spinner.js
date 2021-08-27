import React from "react";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const override = css`
    display: block;
    margin: 1rem auto 0 auto;
    border-color: #1877f2;
  `;

  return <ClipLoader css={override} size={20} />;
};

export default Spinner;
