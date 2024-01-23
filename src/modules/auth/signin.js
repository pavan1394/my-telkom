import apiClient from "../../utils/apiClient";
import { logout, setAuthData } from "./session";
import Toast from 'react-native-toast-message';
import { validateEmail } from "../../utils/validate";

const LOGIN_START = 'auth/signin/LOGIN_START';
const ERROR = 'auth/signin/ERROR';
const CLEAR_STATE = 'auth/signin/CLEAR_STATE';
const SET_PHONE_NUMBER = 'auth/signin/SET_PHONE_NUMBER';
const SET_EMAIL = 'auth/signin/SET_EMAIL';
const SET_PASSWORD = 'auth/signin/SET_PASSWORD';
const ENTER_OTP = 'auth/signin/ENTER_OTP';
const SKIP = 'auth/signin/SKIP';
const SET_REGISTRATION_DETAILS = 'auth/signin/SET_REGISTRATION_DETAILS';
const CLEAR_ERRORS = 'auth/signin/CLEAR_ERRORS';

const initialState = {
  loggingIn: false,
  skip: true,
  error: {},
  errorMessage: '',
  phoneNumber: '',
  email: 'nzamadot@gmail.com',
  password: 'Telkom@6',
  otp: '',
  name: '',
  alternate_phone: '',
  designation: '',
  location: '',
  company_name: '',
  lead_type: '',
  errors: {},
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const startLogin = () => ({
  type: LOGIN_START,
});

export const displayError = (title, message) => ({
  type: ERROR,
  title,
  message,
});

export const skipNow = (skip) => ({
  type: SKIP,
  skip,
});

export const setPhoneNumber = (phoneNumber) => {
  return {
    type: SET_PHONE_NUMBER,
    phoneNumber,
  };
};

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    email,
  };
};

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    password,
  };
};

export const setOTP = (otp) => {
  return {
    type: ENTER_OTP,
    otp,
  };
};

export const requestOtp = (callback, type = 'send', module = 'login') => async (dispatch, getState) => {
  const state = getState();
  const {
    company_name,
    lead_type,
    name,
    email,
    phoneNumber,
    alternate_phone,
  } = state.signin;

  try {

    dispatch(clearErrors());

    const url = module === 'login' ? apiClient.Urls.login : apiClient.Urls.register;

    let params = {
      number: phoneNumber,
      type,
      app: 'seller',
    };
    if (module == 'register' && type == 'send') {
      params = {
        company_name,
        lead_type,
        name,
        email,
        phoneNumber,
        alternate_phone,
        type,
        app: 'seller',
      }
    }
    const response = await apiClient.post(url, params);

    console.log(`${module}---------->`, response, phoneNumber);

    if (response.success) {
      if (callback) {
        callback();
      }
      Toast.show({ text1: response.message || 'OTP Sent', type: 'success', });
    } else {
      if (type === 'resend') {
        dispatch(requestOtp(callback, 'send', 'login'));
      }
      Toast.show({ text1: response.message || response || "Something went wrong!", type: 'error', });
      dispatch({
        type: ERROR,
        errorMessage: response.message,
        errors: response.errors,
      });
    }
  } catch (e) {
    console.log('');
    Toast.show({ text1: e.message || e || "Something went wrong!", type: 'error', });
    dispatch({
      type: ERROR,
      errorMessage: e.message
    })
  }
};

export const validateOtp = () => async (dispatch, getState) => {
  const state = getState();
  const { otp, phoneNumber } = state.signin;

  try {
    const response = await apiClient.post(apiClient.Urls.verifyOtp, {
      number: phoneNumber,
      otp,
    });

    console.log('sign in---------->', response, phoneNumber, otp);

    if (response.success) {
      dispatch(setAuthData(response.profile.authToken, response.profile));
      Toast.show({ text1: response.message || 'Login Success', type: 'success', });
      dispatch(skipNow(false));
    } else {
      Toast.show({ text1: response.message || "Something went wrong!", type: 'error', });
      dispatch(displayError("", response.message || "Something went wrong!"));
    }
  } catch (e) {
    Toast.show({ text1: e.message || e || "Something went wrong!", type: 'error', });
    dispatch(displayError("", e.message || e || "Something went wrong!"));
  }
};

export const login = () => async (dispatch, getState) => {
  const state = getState();
  const { email, password } = state.signin;

  if (!validateEmail(email)) {
    Toast.show({ text1: `Please enter valid Email`, type: 'error', });
    return;
  }

  if (password.length < 3) {
    Toast.show({ text1: `Please enter valid password`, type: 'error', });
    return;
  }

  try {
    const response = await apiClient.post(apiClient.Urls.login, {
      email,
      password,
    });

    console.log('login---------->', response, email, password);

    if (response.success) {
      dispatch(setAuthData(response.user_info.idValue, response.user_info));
      Toast.show({ text1: response.message || 'Login Success', type: 'success', });
      dispatch(skipNow(false));
    } else {
      Toast.show({ text1: response.message || "Something went wrong!", type: 'error', });
      dispatch(displayError("", response.message || "Something went wrong!"));
    }
  } catch (e) {
    Toast.show({ text1: e.message || e || "Something went wrong!", type: 'error', });
    dispatch(displayError("", e.message || e || "Something went wrong!"));
  }
};

export const updateProfile = (profileDetails) => async (dispatch, getState) => {

  try {

    const state = getState();
    const { authToken, profile } = state.session;
    const response = await apiClient.post(apiClient.Urls.updateProfile, {
      authToken,
      client_name: profileDetails.companyName,
      name: profileDetails.userName,
      email: profileDetails.email,
      phone: profileDetails.phoneNumber,
    });

    console.log('Update Profile---------->', response);

    if (response.success) {
      dispatch(getProfileDetails());
      // dispatch(setAuthData(authToken, response.profile));
      Toast.show({ text1: response.message || 'Profile details got updated...', type: 'success', });
    } else {
      Toast.show({ text1: response.message || "Something went wrong!", type: 'error', });
      dispatch(displayError("", response.message || "Something went wrong!"));
    }
  } catch (e) {
    Toast.show({ text1: e.message || e || "Something went wrong!", type: 'error', });
    dispatch(displayError("", e.message || e || "Something went wrong!"));
  }
};

export const setRegistrationDetails = (key, value) => {
  return {
    type: SET_REGISTRATION_DETAILS,
    key,
    value,
  };
};

export const getProfileDetails = () => async (dispatch, getState) => {
  const state = getState();
  const { profile, authToken } = state.session;

  try {
    const response = await apiClient.get(apiClient.Urls.getProfileDetails, {
      authToken,
    });

    console.log('get profile details------------->', response, profile?.phone, profile?.userID);

    if (response.success) {
      dispatch(setAuthData(response.profile.authToken, response.profile));
    } else {
      dispatch(logout());
      dispatch(skipNow(false));
      Toast.show({ text1: response.message || "Something went wrong!", type: 'error', });
      dispatch(displayError("", response.message || "Something went wrong!"));
    }
  } catch (e) {
    Toast.show({ text1: e.message || e || "Something went wrong!", type: 'error', });
    dispatch(displayError("", e.message || e || "Something went wrong!"));
  }
};

export default signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: {
          title: action.title,
          message: action.message,
        },
        loggingIn: false,
        errors: action.errors,
      };
    }
    case CLEAR_STATE: {
      return {
        ...initialState,
      };
    }
    case LOGIN_START: {
      return {
        ...state,
        loggingIn: true,
        errorMessage: '',
        error: {},
        errors: {},
      };
    }
    case ENTER_OTP: {
      return {
        ...state,
        otp: action.otp,
        errors: {},
      };
    }
    case SET_PHONE_NUMBER: {
      console.log('action--------->', action);
      return {
        ...state,
        phoneNumber: action.phoneNumber,
        errors: {},
      };
    }
    case SET_EMAIL: {
      return {
        ...state,
        email: action.email,
        errors: {},
      };
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
        errors: {},
      };
    }
    case SKIP: {
      return {
        ...state,
        skip: action.skip,
      }
    }
    case SET_REGISTRATION_DETAILS: {
      return {
        ...state,
        errors: {},
        [action.key]: action.value,
      }
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        errors: {},
      }
    }
    default:
      return state
  }
};