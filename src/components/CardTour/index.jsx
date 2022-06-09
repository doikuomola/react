import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const CardTour = ({ imageFile, description, title, tags, _id, name }) => {

  const excerpt = (str) => {
    if (str?.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };
  
  return (
    <MDBCol>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags && tags.map((item) => `#${item} `)}
        </span>
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {excerpt(description)}
            <Link to={`tour/${_id}`}>
              {" "}
              <small style={{ fontSize: "12px", fontWeight: "bold" }}>
                Read More
              </small>
            </Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default CardTour;
