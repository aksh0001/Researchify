/**
 * This file houses our user-related Action Creators.
 */
import * as api from "../api";
import { ADD_USER_DATA } from "./types";

/**
 * This action creator will be called when a user registers.
 *
 * @param userData object containing user email, name and password
 * @returns a thunk responsible for posting the data to the api and dispatching
 */
export const addUserAction = (userData) => async (dispatch) => {
  try {
    const message = await api.addUserData(userData);
    console.log("API responded with: " + message);

    // We do not need to store the password, so create a new object without it and then dispatch
    const data = {
      email: userData.email,
      name: userData.name,
    };

    // Store user related data in our redux global store
    dispatch({ type: ADD_USER_DATA, payload: data });
  } catch (err) {
    console.error(`Error in posting user data to the api: ${err}`);
  }
};
