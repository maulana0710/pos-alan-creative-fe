import React from "react";

const PageFooter = () => {
  return (
    <div className="hk-footer">
      <div className="footer">
        <div>
          <div>
            <p className="footer-text text-center">
              <span className="text-gray-400">Alan Resto © {new Date().getFullYear()} | Developed by Alan Creative.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
