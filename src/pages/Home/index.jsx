import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardTour, Spinner } from "../../components";
import { getTours } from "../../redux/tourSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, tours } = useSelector((state) => ({ ...state.tour }));

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  console.log(tours, loading);

  return (
    <div
      style={{
        alignContent: "center",
        margin: "auto",
        maxWidth: "1000px",
        padding: "15px",
      }}>
      <MDBRow>
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours found
          </MDBTypography>
        )}

        <MDBCol style={{ marginTop: "4rem" }}>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              {tours &&
                tours.map((item, index) => <CardTour key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
