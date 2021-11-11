import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getSingleUser, updateUser } from "../redux/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const EditUser = () => {
  const [error, setError] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const [state, setstate] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

 

  let { id } = useParams();

  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [id]);

  useEffect(() => {
    if (user) {
      setstate({ ...user });
    }
  }, [user]);

  const { name, email, phone, website } = state;

  let dispatch = useDispatch();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    if (!name || !email || !phone || !website) {
      setError("Please input all input Field");
    } else {
      dispatch(updateUser(state,id));
      history.push("/");
      setError("");
    }

    e.preventDefault();
  };

  return (
    <div>
      <div className={useButtonStyles.root}>
        <Button
          onClick={() => history.push("/")}
          variant="contained"
          color="primary"
        >
          Go Back
        </Button>
      </div>
      <h2>Edit User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handleInputChange}
          id="standard-basic"
          label="Name"
          name="name"
          value={name || ""}
          type="text"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          id="standard-basic"
          label="Email"
          value={email || ""}
          name="email"
          type="text"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          id="standard-basic"
          label="Phone"
          value={phone || ""}
          name="phone"
          type="text"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          id="standard-basic"
          label="Website"
          value={website || ""}
          name="website"
          type="text"
        />
        <br />
        <div className={useButtonStyles.root}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
