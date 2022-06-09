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
import { toast } from "react-toastify";
import { register } from "../../redux/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <div className="row">
                <MDBValidationItem
                  className="col-md-6"
                  feedback="Please provide your first name"
                  invalid
                  style={{ marginBottom: "30px" }}>
                  <MDBInput
                    label="First Name"
                    type="text"
                    value={firstName}
                    name="firstName"
                    onChange={onInputChange}
                    required
                  />
                </MDBValidationItem>
                <MDBValidationItem
                  className="col-md-6"
                  feedback="Please provide your last Name"
                  invalid
                  style={{ marginBottom: "30px" }}>
                  <MDBInput
                    label="Last Name"
                    type="text"
                    value={lastName}
                    name="lastName"
                    onChange={onInputChange}
                    required
                  />
                </MDBValidationItem>
              </div>

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
              <MDBValidationItem
                feedback="Please provide your password"
                invalid
                style={{ marginTop: "30px" }}>
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBBtn disabled={loading} className="mt-2" style={{ width: "100%" }}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Sign Up
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
