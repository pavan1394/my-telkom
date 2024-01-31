import apiClient from "../../utils/apiClient";

const ERROR = 'Modules/home/ERROR';

const GET_DASHBOARD_DATA_START = 'Modules/home/GET_DASHBOARD_DATA_START';
const GET_DASHBOARD_DATA_SUCCESS = 'Modules/home/GET_DASHBOARD_DATA_SUCCESS';
const GET_DASHBOARD_DATA_FAIL = 'Modules/home/GET_DASHBOARD_DATA_FAIL';

const GET_BILLING_ACCOUNTS_START = 'Modules/home/GET_BILLING_ACCOUNTS_START';
const GET_BILLING_ACCOUNTS_SUCCESS = 'Modules/home/GET_BILLING_ACCOUNTS_SUCCESS';
const GET_BILLING_ACCOUNTS_FAIL = 'Modules/home/GET_BILLING_ACCOUNTS_FAIL';

const GET_PAYMENT_HISTORY_DETAILS_START = 'Modules/home/GET_PAYMENT_HISTORY_DETAILS_START';
const GET_PAYMENT_HISTORY_DETAILS_SUCCESS = 'Modules/home/GET_PAYMENT_HISTORY_DETAILS_SUCCESS';
const GET_PAYMENT_HISTORY_DETAILS_FAIL = 'Modules/home/GET_PAYMENT_HISTORY_DETAILS_FAIL';

const GET_PERSONAL_DETAILS_START = 'Modules/home/GET_PERSONAL_DETAILS_START';
const GET_PERSONAL_DETAILS_SUCCESS = 'Modules/home/GET_PERSONAL_DETAILS_SUCCESS';
const GET_PERSONAL_DETAILS_FAIL = 'Modules/home/GET_PERSONAL_DETAILS_FAIL';

const GET_BILLING_ADDRESS_DETAILS_START = 'Modules/home/GET_BILLING_ADDRESS_DETAILS_START';
const GET_BILLING_ADDRESS_DETAILS_SUCCESS = 'Modules/home/GET_BILLING_ADDRESS_DETAILS_SUCCESS';
const GET_BILLING_ADDRESS_DETAILS_FAIL = 'Modules/home/GET_BILLING_ADDRESS_DETAILS_FAIL';

const GET_PHYSICAL_ADDRESS_DETAILS_START = 'Modules/home/GET_PHYSICAL_ADDRESS_DETAILS_START';
const GET_PHYSICAL_ADDRESS_DETAILS_SUCCESS = 'Modules/home/GET_PHYSICAL_ADDRESS_DETAILS_SUCCESS';
const GET_PHYSICAL_ADDRESS_DETAILS_FAIL = 'Modules/home/GET_PHYSICAL_ADDRESS_DETAILS_FAIL';

const GET_CONTACT_DETAILS_START = 'Modules/home/GET_CONTACT_DETAILS_START';
const GET_CONTACT_DETAILS_SUCCESS = 'Modules/home/GET_CONTACT_DETAILS_SUCCESS';
const GET_CONTACT_DETAILS_FAIL = 'Modules/home/GET_CONTACT_DETAILS_FAIL';

const GET_SPEND_LIMIT_DETAILS_START = 'Modules/home/GET_SPEND_LIMIT_DETAILS_START';
const GET_SPEND_LIMIT_DETAILS_SUCCESS = 'Modules/home/GET_SPEND_LIMIT_DETAILS_SUCCESS';
const GET_SPEND_LIMIT_DETAILS_FAIL = 'Modules/home/GET_SPEND_LIMIT_DETAILS_FAIL';

const GET_TOPUP_START_PROCESS_START = 'Modules/home/GET_TOPUP_START_PROCESS_START';
const GET_TOPUP_START_PROCESS_SUCCESS = 'Modules/home/GET_TOPUP_START_PROCESS_SUCCESS';
const GET_TOPUP_START_PROCESS_FAIL = 'Modules/home/GET_TOPUP_START_PROCESS_FAIL';

const GET_VAS_DETAILS_START = 'Modules/home/GET_VAS_DETAILS_START';
const GET_VAS_DETAILS_SUCCESS = 'Modules/home/GET_VAS_DETAILS_SUCCESS';
const GET_VAS_DETAILS_FAIL = 'Modules/home/GET_VAS_DETAILS_FAIL';

const GET_CONTENT_SERVICE_DETAILS_START = 'Modules/home/GET_CONTENT_SERVICE_DETAILS_START';
const GET_CONTENT_SERVICE_DETAILS_SUCCESS = 'Modules/home/GET_CONTENT_SERVICE_DETAILS_SUCCESS';
const GET_CONTENT_SERVICE_DETAILS_FAIL = 'Modules/home/GET_CONTENT_SERVICE_DETAILS_FAIL';

const SET_SELECTED_SERVICE_ID = 'Modules/home/SET_SELECTED_SERVICE_ID';
const SELECT_PRODUCT_TYPE = 'Modules/home/SELECT_PRODUCT_TYPE';
const SELECT_BUNDLE_SIZE = 'Modules/home/SELECT_BUNDLE_SIZE';
const SELECT_BUNDLE_TYPE = 'Modules/home/SELECT_BUNDLE_TYPE';
const SELECT_PAYMENT_METHOD = 'Modules/home/SELECT_PAYMENT_METHOD';

const getInitialState = () => ({
  loading: false,
  dashboardData: {},
  billingAccounts: [],
  paymentHistory: [],
  selectedServiceId: null,
  personalDetails: {},
  billingAddress: {},
  physicalAddress: {},
  contactDetails: {},
  spendLimit: {},
  topupStartProcess: {},
  selectedProduct: '',
  selectedBundle: '',
  selectedPaymentMethod: '',
  selectedBundleType: '',
  vasData: [],
  contentServiceData: [],
});

export const setSelectedProductType = (selectedProduct) => (dispatch) => {
  dispatch({
    type: SELECT_PRODUCT_TYPE,
    selectedProduct,
  });
}

export const setSelectedBundle = (selectedBundle) => (dispatch) => {
  dispatch({
    type: SELECT_BUNDLE_SIZE,
    selectedBundle,
  });
}

export const setSelectedBundleType = (selectedBundleType) => (dispatch) => {
  dispatch({
    type: SELECT_BUNDLE_TYPE,
    selectedBundleType,
  });
}

export const setSelectedPaymentMethod = (selectedPaymentMethod) => (dispatch) => {
  dispatch({
    type: SELECT_PAYMENT_METHOD,
    selectedPaymentMethod,
  });
}

export const getDashboardData = (serviceNo) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;
    const { serviceId } = state.home;

    dispatch({
      type: GET_DASHBOARD_DATA_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.viewLoginBalance}`, {
      idType: profile?.idType || '',
      idValue: profile?.idValue || '',
      serviceNo: serviceNo || "",
    });
    console.log('dashboardData res-------->', response);

    if (response.success) {
      if (serviceNo) {
        dispatch({
          type: SET_SELECTED_SERVICE_ID,
          serviceNo,
        });
      } else {
        dispatch({
          type: SET_SELECTED_SERVICE_ID,
          serviceNo: (response?.balances?.assignedProducts || [])[0]?.serviceId,
        });
      }
      dispatch({
        type: GET_DASHBOARD_DATA_SUCCESS,
        dashboardData: response,
      });
    } else {
      dispatch({
        type: GET_DASHBOARD_DATA_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 46---------------', e);
    dispatch({
      type: GET_DASHBOARD_DATA_FAIL,
    });
  }
};

export const getBillingAccounts = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_BILLING_ACCOUNTS_START,
    });

    const response = await apiClient.get(`${apiClient.Urls.billingAccounts}${profile?.idValue}`, {
      authToken,
    });
    console.log('billingAccounts res-------->', response);

    if ((response || [].length)) {
      dispatch({
        type: GET_BILLING_ACCOUNTS_SUCCESS,
        billingAccounts: response,
      });
    } else {
      dispatch({
        type: GET_BILLING_ACCOUNTS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_BILLING_ACCOUNTS_FAIL,
    });
  }
};

export const getPaymentHistoryDetails = (reqObj) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_PAYMENT_HISTORY_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.paymentHistory}`, {
      authToken,
      ...reqObj,
    });
    console.log('paymentHistory res-------->', response);

    if ((response || [].length)) {
      dispatch({
        type: GET_PAYMENT_HISTORY_DETAILS_SUCCESS,
        paymentHistory: response,
      });
    } else {
      dispatch({
        type: GET_PAYMENT_HISTORY_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_PAYMENT_HISTORY_DETAILS_FAIL,
    });
  }
};

export const getPersonalDetails = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_PERSONAL_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.personalDetails}`, {
      authToken,
      rsaID: profile?.idValue,
    });
    console.log('personalDetails res-------->', response);

    if (response?.processId || response?.documentNumber) {
      dispatch(getBillingAddressDetails(response.processId));
      dispatch(getPhysicalAddressDetails(response.processId));
      dispatch(getContactDetails(response.processId));
      dispatch({
        type: GET_PERSONAL_DETAILS_SUCCESS,
        personalDetails: response,
      });
    } else {
      dispatch({
        type: GET_PERSONAL_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_PERSONAL_DETAILS_FAIL,
    });
  }
};

export const getBillingAddressDetails = (processId) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_BILLING_ADDRESS_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.billingAddress}`, {
      authToken,
      processId: processId,
    });
    console.log('billingAddress res-------->', response);

    if ((response || [].length)) {
      dispatch({
        type: GET_BILLING_ADDRESS_DETAILS_SUCCESS,
        billingAddress: response,
      });
    } else {
      dispatch({
        type: GET_BILLING_ADDRESS_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_BILLING_ADDRESS_DETAILS_FAIL,
    });
  }
};

export const getPhysicalAddressDetails = (processId) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_PHYSICAL_ADDRESS_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.personalDetails}`, {
      authToken,
      processId: processId,
    });
    console.log('physicalAddress res-------->', response);

    if ((response || [].length)) {
      dispatch({
        type: GET_PHYSICAL_ADDRESS_DETAILS_SUCCESS,
        physicalAddress: response,
      });
    } else {
      dispatch({
        type: GET_PHYSICAL_ADDRESS_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_PHYSICAL_ADDRESS_DETAILS_FAIL,
    });
  }
};

export const getContactDetails = (processId) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_CONTACT_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.contactDetails}`, {
      authToken,
      processId: processId,
    });
    console.log('contactDetails res-------->', response);

    if (response?.phoneNumber || response?.mobileNumber || response?.email) {
      dispatch({
        type: GET_CONTACT_DETAILS_SUCCESS,
        contactDetails: response,
      });
    } else {
      dispatch({
        type: GET_CONTACT_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_CONTACT_DETAILS_FAIL,
    });
  }
};

export const getSpendLimitDetails = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;
    const { selectedServiceId } = state.home;

    dispatch({
      type: GET_SPEND_LIMIT_DETAILS_START,
    });

    const response = await apiClient.get(`${apiClient.Urls.spendLimit}${selectedServiceId || '0691002002'}`, {
      authToken,
    });
    console.log('spendLimit res-------->', response);

    if (response.success) {
      dispatch({
        type: GET_SPEND_LIMIT_DETAILS_SUCCESS,
        spendLimit: response,
      });
    } else {
      dispatch({
        type: GET_SPEND_LIMIT_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_SPEND_LIMIT_DETAILS_FAIL,
    });
  }
};

export const getTopupStartProcess = (data) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;

    dispatch({
      type: GET_TOPUP_START_PROCESS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.topupStartProcess}`, {
      authToken,
      ...data,
    });
    console.log('topupStartProcess res-------->', response);

    if (response.success) {
      dispatch({
        type: GET_TOPUP_START_PROCESS_SUCCESS,
        topupStartProcess: response,
      });
    } else {
      dispatch({
        type: GET_TOPUP_START_PROCESS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_TOPUP_START_PROCESS_FAIL,
    });
  }
};

export const getVasData = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;
    const { selectedServiceId } = state.home;

    dispatch({
      type: GET_VAS_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.subscriberProductView}`, {
      authToken,
      msisdn: selectedServiceId,
    });
    console.log('subscriberProductview res-------->', response);

    if (response?.length) {
      dispatch({
        type: GET_VAS_DETAILS_SUCCESS,
        vasData: response,
      });
    } else {
      dispatch({
        type: GET_VAS_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_VAS_DETAILS_FAIL,
    });
  }
};

export const getContentServicesData = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile, authToken } = state.session;
    const { selectedServiceId } = state.home;

    dispatch({
      type: GET_CONTENT_SERVICE_DETAILS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.contentServiceView}`, {
      authToken,
      subscriberMsisdn: selectedServiceId,
    });
    console.log('subscriberProductview res-------->', response);

    if (response.length) {
      dispatch({
        type: GET_CONTENT_SERVICE_DETAILS_SUCCESS,
        contentServiceData: response,
      });
    } else {
      dispatch({
        type: GET_CONTENT_SERVICE_DETAILS_FAIL,
      });
    }
  } catch (e) {
    console.log('error at line 85---------------', e);
    dispatch({
      type: GET_CONTENT_SERVICE_DETAILS_FAIL,
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
    case SELECT_PRODUCT_TYPE: {
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      }
    }
    case SELECT_BUNDLE_SIZE: {
      return {
        ...state,
        selectedBundle: action.selectedBundle,
      }
    }
    case SELECT_BUNDLE_TYPE: {
      return {
        ...state,
        selectedBundleType: action.selectedBundleType,
      }
    }
    case SELECT_PAYMENT_METHOD: {
      return {
        ...state,
        selectedPaymentMethod: action.selectedPaymentMethod,
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
    case GET_BILLING_ACCOUNTS_START: {
      return {
        ...state,
        errorMessage: '',
        billingAccounts: [],
        loading: true,
      }
    }
    case GET_BILLING_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        billingAccounts: action.billingAccounts,
        loading: false,
      }
    }
    case GET_BILLING_ACCOUNTS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_PAYMENT_HISTORY_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        paymentHistory: [],
        loading: true,
      }
    }
    case GET_PAYMENT_HISTORY_DETAILS_SUCCESS: {
      return {
        ...state,
        paymentHistory: action.paymentHistory,
        loading: false,
      }
    }
    case GET_PAYMENT_HISTORY_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case SET_SELECTED_SERVICE_ID: {
      return {
        ...state,
        selectedServiceId: action.serviceNo,
      }
    }
    case GET_PERSONAL_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        personalDetails: {},
        loading: true,
      }
    }
    case GET_PERSONAL_DETAILS_SUCCESS: {
      return {
        ...state,
        personalDetails: action.personalDetails,
        loading: false,
      }
    }
    case GET_PERSONAL_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_BILLING_ADDRESS_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        billingAddress: {},
        loading: true,
      }
    }
    case GET_BILLING_ADDRESS_DETAILS_SUCCESS: {
      return {
        ...state,
        billingAddress: action.billingAddress,
        loading: false,
      }
    }
    case GET_BILLING_ADDRESS_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_PHYSICAL_ADDRESS_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        physicalAddress: {},
        loading: true,
      }
    }
    case GET_PHYSICAL_ADDRESS_DETAILS_SUCCESS: {
      return {
        ...state,
        physicalAddress: action.physicalAddress,
        loading: false,
      }
    }
    case GET_PHYSICAL_ADDRESS_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_CONTACT_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        contactDetails: {},
        loading: true,
      }
    }
    case GET_CONTACT_DETAILS_SUCCESS: {
      return {
        ...state,
        contactDetails: action.contactDetails,
        loading: false,
      }
    }
    case GET_CONTACT_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_SPEND_LIMIT_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        spendLimit: {},
        loading: true,
      }
    }
    case GET_SPEND_LIMIT_DETAILS_SUCCESS: {
      return {
        ...state,
        spendLimit: action.spendLimit,
        loading: false,
      }
    }
    case GET_SPEND_LIMIT_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_TOPUP_START_PROCESS_START: {
      return {
        ...state,
        errorMessage: '',
        topupStartProcess: {},
        loading: true,
      }
    }
    case GET_TOPUP_START_PROCESS_SUCCESS: {
      return {
        ...state,
        topupStartProcess: action.topupStartProcess,
        loading: false,
      }
    }
    case GET_TOPUP_START_PROCESS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_VAS_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        vasData: [],
        loading: true,
      }
    }
    case GET_VAS_DETAILS_SUCCESS: {
      return {
        ...state,
        vasData: action.vasData,
        loading: false,
      }
    }
    case GET_VAS_DETAILS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_CONTENT_SERVICE_DETAILS_START: {
      return {
        ...state,
        errorMessage: '',
        contentServiceData: [],
        loading: true,
      }
    }
    case GET_CONTENT_SERVICE_DETAILS_SUCCESS: {
      return {
        ...state,
        contentServiceData: action.contentServiceData,
        loading: false,
      }
    }
    case GET_CONTENT_SERVICE_DETAILS_FAIL: {
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