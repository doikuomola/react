import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour } from "../../redux/tourSlice";
import moment from "moment";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);

  return (
    <MDBContainer style={{ marginTop: "100px" }}>
      <MDBCard className="mb-3 mt-2">
        <MDBCardImage
          src={tour?.imageFile}
          alt={tour?.title}
          position="top"
          style={{ width: "100%", maxHeight: "600px" }}
        />
        <MDBCardBody>
          <h3>{tour?.title}</h3>
          <span>
            <p
              className="text-start tourName"
              style={{ color: "#F48FB1", fontSize: "18px", fontWeight: "500" }}>
              Created By: {tour.name}
            </p>
          </span>
          <div style={{ float: "left" }}>
            <span className="text-start">
              {tour?.tags?.map((item) => `#${item} `)}
            </span>
          </div>
          <br />
          <MDBCardText className="text-start mt-2">
            <MDBIcon
              style={{ float: "left", margin: "5px" }}
              far
              icon="calendar-alt"
              size="lg"
            />
            <small className="text-muted">
              {moment(tour.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {tour.description}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SingleTour;
