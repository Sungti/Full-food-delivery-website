import {
  SIGNUP_SUCCESS,
  LOADING_UI,
  SET_ERRORS,
  SERVER_ERROR,
  CLEAR_ERRORS,
  LOADING_USER,
  SET_USER,
  SET_ERROR,
  SET_UNAUTHENTICATED,
  SET_ERRORS_SIGNUP_SELLER,
} from "../types";

import axios from "../../util/axios";
import axiosNewInstance from "axios";

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/signup-user", newUserData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((err) => {
      console.error("Error during signupUser:", err); // Log the entire error object for inspection
      if (err.response && err.response.data) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const loginAction = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/login", userData)
    .then((res) => {
      const jwt = `Bearer ${res.data.token}`;
      localStorage.setItem("jwt", jwt);
      axios.defaults.headers.common["Authorization"] = jwt;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log("Authenticated, check localStorage", jwt);
      history.push("/");
    })
    .catch((err) => {
      console.error("Error during loginAction:", err); // Log the entire error object for inspection
      if (err.response && err.response.data) {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      console.error("Error during getUserData:", err); // Log the entire error object for inspection
    });
};

export const signupSeller = (newSellerData, history) => (dispatch) => {
  const location = `+${newSellerData.get("aptName")},+${newSellerData.get(
    "locality"
  )},+${newSellerData.get("street")},+${newSellerData.get("zip")}`;
  axiosNewInstance
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    })
    .then((result) => {
      if (
        Array.isArray(result.data.results) &&
        result.data.results.length > 0
      ) {
        const formattedAddress = result.data.results[0].formatted_address;
        const lat = result.data.results[0].geometry.location.lat;
        const lng = result.data.results[0].geometry.location.lng;
        newSellerData.append("lat", lat);
        newSellerData.append("lng", lng);
        newSellerData.append("formattedAddress", formattedAddress);
      }

      dispatch(signupSellerFinal(newSellerData, history));
    })
    .catch((err) => {
      console.error("Error during signupSeller:", err); // Log the entire error object for inspection
      dispatch({
        type: SERVER_ERROR,
      });
    });
};

export const signupSellerFinal = (newSellerData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/signup-seller", newSellerData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((err) => {
      console.error("Error during signupSellerFinal:", err); // Log the entire error object for inspection
      if (err.response && err.response.data) {
        dispatch({
          type: SET_ERRORS_SIGNUP_SELLER,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const logoutAction = (history) => (dispatch) => {
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) history.push("/login");
};
