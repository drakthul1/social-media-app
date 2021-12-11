import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./context/AuthActions";
export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};
