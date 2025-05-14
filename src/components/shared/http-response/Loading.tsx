import React from "react";

const Loading = () => {
  return (
    <div className="flex row-auto">
      <div className="text-center col-auto" style={{ marginBlock: "100px" }}>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
