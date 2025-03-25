import React, { useMemo } from "react";
import Lottie from "lottie-react";
import animationData from "../animations/empty.json";

const Empty = () => {
  const memoizedAnimation = useMemo(() => animationData, []);

  return (
    <div className="col-12 my-5 d-flex flex-column align-items-center justify-content-center loading-container flex-grow-1">
      <Lottie
        className="m-0 p-0 d-block"
        animationData={memoizedAnimation}
        loop
        autoplay
        style={{ width: "130px" }}
      />
      <p className="m-0 p-0 mt-2">No tasks found !</p>
    </div>
  );
};

export default Empty;
