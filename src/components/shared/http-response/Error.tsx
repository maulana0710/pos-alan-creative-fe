import React from "react";
import { AlertCircle } from "react-feather";


const Error = () => {
  return (
    <div>
      <div className="text-center" style={{ marginBlock: "100px" }}>
        <div className="d-grid gap-2">
          <span className="icon">
            <span className="feather-icon">
              <AlertCircle className="fs-3" />
            </span>
          </span>
          <span>Something went wrong.</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
