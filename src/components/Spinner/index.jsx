import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

const Spinner = () => {
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>
        <MDBSpinner
          className="me-2"
          style={{
            width: "3rem",
            height: "3rem",
            marginTop: "100px",
          }}>
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    </>
  );
};

export default Spinner;
