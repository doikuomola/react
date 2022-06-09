import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut } from "../../redux/authSlice";

const Header = () => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(setLogOut());
  };
  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <Link
          to="/"
          className="navbar-brand"
          style={{ fontSize: "22px", fontWeight: 600 }}>
          Tourpedia
        </Link>
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}>
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={show}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h6
                style={{
                  textAlign: "center",
                  marginRight: "30px",
                  marginTop: "8px",
                  fontSize: "16px",
                }}>
                Logged in as: {user.result?.name}
              </h6>
            )}
            <MDBNavbarItem>
              <Link
                fullwidth="false"
                aria-current="page"
                to="/"
                className="navbar-brand">
                <span className="header-text">Home</span>
              </Link>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <Link
                    fullwidth="false"
                    aria-current="page"
                    to="/addTour"
                    className="navbar-brand">
                    <span className="header-text">Add Tour</span>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link
                    fullwidth="false"
                    aria-current="page"
                    to="/dashboard"
                    className="navbar-brand">
                    <span className="header-text">Dashboard</span>
                  </Link>
                </MDBNavbarItem>
              </>
            )}

            {user?.result?._id ? (
              <MDBNavbarItem>
                <Link
                  fullwidth="false"
                  aria-current="page"
                  to="/login"
                  className="navbar-brand">
                  <span className="header-text" onClick={handleLogOut}>
                    Logout
                  </span>
                </Link>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <Link
                  fullwidth="false"
                  aria-current="page"
                  to="/login"
                  className="navbar-brand">
                  <span className="header-text">Login</span>
                </Link>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>

          {/* <form className="d-flex input-group w-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Type query"
              aria-label="Search"
            />
            <MDBBtn color="primary">Search</MDBBtn>
          </form> */}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
