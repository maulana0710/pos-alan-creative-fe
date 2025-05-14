import React from "react";
import { Archive } from "react-feather";

const Null = () => {
  return (
    <div className="flex row-auto">
      <div className="text-center col-auto" style={{ marginBlock: "100px" }}>
        <div className="d-grid gap-2">
          <span className="icon">
            <span className="feather-icon">
              <Archive className="fs-3" />
            </span>
          </span>
          <span>No data found</span>
        </div>
      </div>
    </div>
  );
};

export default Null;
