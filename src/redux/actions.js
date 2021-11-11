import axios from "axios";
import * as types from "./actionTypes";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDelete = () => ({
  type: types.DELETE_USER,
});

const userAdded = () => ({
  type: types.ADD_USER,
});

const userUpdated = () => ({
  type: types.UPDATE_USER,
});

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

export const loadUsers = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        console.log("resp : ", res);
        dispatch(getUsers(res.data));
      })
      .catch((err) => console.log(err));
  };
};
export const deleteUsers = (id) => {
  return (dispatch) => {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((res) => {
        dispatch(userDelete());
        dispatch(loadUsers());
      })
      .catch((err) => console.log(err));
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API}`, user)
      .then((res) => {
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((er) => console.log(er));
  };
};

export const getSingleUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((res) => {
        console.log("Get User : ", res);
        dispatch(getUser(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (user, id) => {
  return (dispatch) => {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, user)
      .then((res) => {
        console.log("Get User : ", res);
        dispatch(userUpdated());
        dispatch(loadUsers());
      })
      .catch((err) => console.log(err));
  };
};
