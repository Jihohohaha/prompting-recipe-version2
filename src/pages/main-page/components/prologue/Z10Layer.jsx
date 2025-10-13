import React from "react";

const Z10_BACKGROUND_URL = "/images/main-page/Z10Background.png";

const Z10Layer = () => {
  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 z-10"
      style={{
        backgroundImage: `url(${Z10_BACKGROUND_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    </div>
  );
};

export default Z10Layer;
