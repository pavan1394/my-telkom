import Toast from 'react-native-toast-message';
import apiClient from "../../utils/apiClient";

const ERROR = 'Modules/home/ERROR';

const GET_DASHBOARD_DATA_START = 'MOdules/home/GET_DASHBOARD_DATA_START';
const GET_DASHBOARD_DATA_SUCCESS = 'MOdules/home/GET_DASHBOARD_DATA_SUCCESS';
const GET_DASHBOARD_DATA_FAIL = 'MOdules/home/GET_DASHBOARD_DATA_FAIL';

const getInitialState = () => ({
  loading: false,
  dashboardData: {},
});

export const getDashboardData = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;
    console.log('profile-------->', profile);

    dispatch({
      type: GET_DASHBOARD_DATA_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.viewLoginBalance}`, {
      idType: profile?.idType || 'RSA_ID',
      idValue: profile?.idValue || '8608175776089',
      serviceNo: "",
      // username: profile?.email || 'nzamadot@gmail.com',
    });
    console.log('dashboardData res-------->', response);

    if (response.success) {
      dispatch({
        type: GET_DASHBOARD_DATA_SUCCESS,
        dashboardData: response,
      });
    } else {
      Toast.show({ text1: response.message || "Something went wrong!", type: 'error', });
      dispatch({
        type: GET_DASHBOARD_DATA_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 46---------------', e);
    Toast.show({ text1: e.message || e || "Something went wrong!", type: 'error', });
    dispatch({
      type: GET_DASHBOARD_DATA_FAIL,
    });
  }
};

export default homeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ERROR: {
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    }
    case GET_DASHBOARD_DATA_START: {
      return {
        ...state,
        errorMessage: '',
        dashboardData: {},
        loading: true,
      }
    }
    case GET_DASHBOARD_DATA_SUCCESS: {
      return {
        ...state,
        dashboardData: action.dashboardData,
        loading: false,
      }
    }
    case GET_DASHBOARD_DATA_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    default:
      return state;
  }
};