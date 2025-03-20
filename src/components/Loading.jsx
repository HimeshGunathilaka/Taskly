import Lottie from "lottie-react";
import animationData from "../animations/loading-2.json";

const Loading = () => {
  return (
    <div className="col-12 my-5 d-flex flex-row align-items-center justify-content-center loading-container">
      <p className="m-0 p-0">Loading ...</p>
      <Lottie
        className={`m-0 p-0`}
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "60px" }}
      />
    </div>
  );
};

export default Loading;
