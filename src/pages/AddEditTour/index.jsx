import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBSpinner,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createTour, updateTour } from "../../redux/tourSlice";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { title, description, tags } = tourData;
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [id]);

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

  const handleClear = () => {
    setTourData({
      title: "",
      description: "",
      tags: [],
    });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide your tags");
    }

    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
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
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem feedback="Please enter tour title" invalid>
              <MDBInput
                label="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem feedback="Please enter tour description" invalid>
              <MDBTextArea
                rows={4}
                label="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem feedback="Please enter tour description" invalid>
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag, index) => handleDeleteTag(tag, index)}
                style={{ width: "100%" }}
              />
            </MDBValidationItem>
            {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            <MDBValidationItem feedback="Please enter tour description" invalid>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
                style={{ width: "100%" }}
                className="form-control"
              />
            </MDBValidationItem>
            <div className="col-md-12">
              <MDBBtn className="mt-2" style={{ width: "100%" }}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                {id ? "Update Tour" : "Add Tour"}
              </MDBBtn>
              <MDBBtn
                className="mt-2"
                style={{ width: "100%" }}
                color="danger"
                onClick={handleClear}>
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
