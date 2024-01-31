import { Platform } from 'react-native';
import apiClient from '../../utils/apiClient';
import { skipNow } from './signin';

const SET_AUTH_DATA = 'auth/session/SET_AUTH_DATA';
const LOGOUT_SUCCESS = 'auth/session/LOGOUT_SUCCESS';
const ERROR = 'auth/session/ERROR';
const UPDATE_STORE_DETAILS = 'auth/session/UPDATE_STORE_DETAILS';
const SET_YP_POP_UP_DATA = 'auth/session/SET_YP_POP_UP_DATA';


const initialState = {
  authToken: null,
  profile: null,
  lastYPPopUp: null,
};

export const setAuthData = (authToken, profile) => ({
  type: SET_AUTH_DATA,
  authToken,
  profile,
});

export const updateStoreDetails = (store) => ({
  type: UPDATE_STORE_DETAILS,
  store,
});

export const setYPPopUpData = (lastYPPopUp) => ({
  type: SET_YP_POP_UP_DATA,
  lastYPPopUp,
});

export const logout = () => async (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  return;
  const { authToken } = getState().session;
  dispatch(skipNow(true));
  apiClient.post(apiClient.Urls.logout, {
    authToken,
    device_id: undefined,
  }).then((res) => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  }).catch(e => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  });
};
export const deleteAccount = () => async (dispatch, getState) => {
  const { authToken } = getState().session;
  dispatch(skipNow(true));
  apiClient.get(`${apiClient.Urls.deleteAccount}?device_id=${undefined}}`, {
    authToken,
  }).then((res) => {
    console.log("Delete-------------------->>>>>",res)
    if(res.success){
      dispatch(logout());
    }
  }).catch(e => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  });
};

export const getAppLatestVersion = async (version) => {
  return await apiClient.post(`${apiClient.Urls.appLatestVersion}`, {
    version_name: version,
    os: Platform.OS,
  });
};

export const setFCMToken = async (token, deviceId, userId) => {
  return await apiClient.post(`${apiClient.Urls.init}`, {
    token: token,
    device_id: deviceId,
    user_id: userId,
    device_type: 'phone',
    access_type: 'app',
    os: Platform.OS,
  });
};

export default sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        authToken: action.authToken,
        profile: action.profile,
      };
    case LOGOUT_SUCCESS:
      console.log('check----------->', action);
      return {
        ...state,
        authToken: null,
        profile: null,
      };
    case ERROR: {
      return {
        ...state,
        message: action.message,
      }
    }
    case SET_YP_POP_UP_DATA: {
      return {
        ...state,
        lastYPPopUp: action.lastYPPopUp,
      }
    }
    case UPDATE_STORE_DETAILS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          store: {
            ...state.profile.store,
            ...action.store,
          }
        },
      }
    }
    default:
      return state;
  }
};
