import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../../redux/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error &&
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [error]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const googleSuccess = (res) => {
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));
  };
  const googleFailure = () => {
    toast.error(error);
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}>
      <MDBCard alignment="center">
        <MDBIcon
          fas
          icon="user-circle"
          className="fa-2x"
          style={{ color: "#0C56D0" }}
        />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem
                feedback="Please provide your email"
                invalid
                style={{ marginBottom: "30px" }}>
                <MDBInput
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                feedback="Please provide your password"
                invalid>
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBBtn
                disabled={loading}
                className="mt-2"
                style={{ width: "100%" }}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <span>Or Sign In with</span> */}
          <GoogleLogin
            clientId="690962533782-6461dfbgo3f8c9p0snl8dmvfitrtt68e.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ width: "100%" }}
                color="danger">
                <MDBIcon className="me-2" fab icon="google" />
                Google Sign In
              </MDBBtn>
            )}
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </MDBCardBody>

        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
