import apiClient from "../../utils/apiClient";
import { encodeURLParams } from "../../utils/validate";

const ERROR = 'Modules/yep/ERROR';

const GET_YEP_DASHBOARD_DATA_START = 'Modules/yep/GET_YEP_DASHBOARD_DATA_START';
const GET_YEP_DASHBOARD_DATA_SUCCESS = 'Modules/yep/GET_YEP_DASHBOARD_DATA_SUCCESS';
const GET_YEP_DASHBOARD_DATA_FAIL = 'Modules/yep/GET_YEP_DASHBOARD_DATA_FAIL';

const GET_POPULAR_KEY_WORDS_START = 'Modules/yep/GET_POPULAR_KEY_WORDS_START';
const GET_POPULAR_KEY_WORDS_SUCCESS = 'Modules/yep/GET_POPULAR_KEY_WORDS_SUCCESS';
const GET_POPULAR_KEY_WORDS_FAIL = 'Modules/yep/GET_POPULAR_KEY_WORDS_FAIL';

const GET_STOREFRONT_START = 'Modules/yep/GET_STOREFRONT_START';
const GET_STOREFRONT_SUCCESS = 'Modules/yep/GET_STOREFRONT_SUCCESS';
const GET_STOREFRONT_FAIL = 'Modules/yep/GET_STOREFRONT_FAIL';

const GET_STOREFRONT_SERVICE_START = 'Modules/yep/GET_STOREFRONT_SERVICE_START';
const GET_STOREFRONT_SERVICE_SUCCESS = 'Modules/yep/GET_STOREFRONT_SERVICE_SUCCESS';
const GET_STOREFRONT_SERVICE_FAIL = 'Modules/yep/GET_STOREFRONT_SERVICE_FAIL';

const GET_CATEGORIES_START = 'Modules/yep/GET_CATEGORIES_START';
const GET_CATEGORIES_SUCCESS = 'Modules/yep/GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_FAIL = 'Modules/yep/GET_CATEGORIES_FAIL';

const GET_SEARCH_RESULTS_START = 'Modules/yep/GET_SEARCH_RESULTS_START';
const GET_SEARCH_RESULTS_SUCCESS = 'Modules/yep/GET_SEARCH_RESULTS_SUCCESS';
const GET_SEARCH_RESULTS_FAIL = 'Modules/yep/GET_SEARCH_RESULTS_FAIL';

const GET_WHAT_RESULTS_START = 'Modules/yep/GET_WHAT_RESULTS_START';
const GET_WHAT_RESULTS_SUCCESS = 'Modules/yep/GET_WHAT_RESULTS_SUCCESS';
const GET_WHAT_RESULTS_FAIL = 'Modules/yep/GET_WHAT_RESULTS_FAIL';

const GET_LOCATION_RESULTS_START = 'Modules/yep/GET_LOCATION_RESULTS_START';
const GET_LOCATION_RESULTS_SUCCESS = 'Modules/yep/GET_LOCATION_RESULTS_SUCCESS';
const GET_LOCATION_RESULTS_FAIL = 'Modules/yep/GET_LOCATION_RESULTS_FAIL';

const GET_ADDRESS_BY_REVERSE_GEOCODE_START = 'Modules/yep/GET_ADDRESS_BY_REVERSE_GEOCODE_START';
const GET_ADDRESS_BY_REVERSE_GEOCODE_SUCCESS = 'Modules/yep/GET_ADDRESS_BY_REVERSE_GEOCODE_SUCCESS';
const GET_ADDRESS_BY_REVERSE_GEOCODE_FAIL = 'Modules/yep/GET_ADDRESS_BY_REVERSE_GEOCODE_FAIL';

const SELECT_CATEGORY = 'Modules/yep/SELECT_CATEGORY';
const TOGGLE_TAG = 'Modules/yep/TOGGLE_TAG';
const SET_CURRENT_PAGE = 'Modules/yep/SET_CURRENT_PAGE';
const CLEAR_GET_WHAT_DATA = 'Modules/yep/CLEAR_GET_WHAT_DATA';
const SET_SEARCH_KEYWORD = 'Modules/yep/SET_SEARCH_KEYWORD';
const SET_SELECTED_LOCATION = 'Modules/yep/SET_SELECTED_LOCATION';

const getInitialState = () => ({
  loading: false,
  homeData: {},
  popularkeywords: [],
  showYellowPageHeader: true,
  storefront: {},
  storefrontServices: [],
  categories: [],
  categories: [],
  tags: [],
  popularKeywords: [],
  selectedCategory: null,
  selectedSubcategory: null,
  selectedTags: [],
  deals: [],
  featuredBusiness: [],
  keywords: [],
  storefronts: [],
  locations: [],
  searchResults: null,
  keyword: '',
  selectedLocation: {
    geo: '',
    name: '',
  },
  currentPage: 1,
  regions: [],
  placesData: null,
  isLoading: false,
  showYellowPageHeader: true,
  homeData: {},
  loadingHomePage: true,
  showOverview: false,
  loadingOverview: false,
  flags: [],
  loadingFlags: false,
  featureFlagsPayload: {},
  storefronts: [],

});

export const selectCategory = (category = null) => ({
  type: SELECT_CATEGORY,
  category,
});

export const toggleTag = (tag = '') => ({
  type: TOGGLE_TAG,
  tag,
});
export const setCurrentPage = (currentPage = 1) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setKeyword = (keyword) => ({
  type: SET_SEARCH_KEYWORD,
  keyword,
});

export const resetGetWhatData = () => ({
  type: CLEAR_GET_WHAT_DATA,
});

export const setSelectedLocation = ({ geo, name, current } = {}) => ({
  type: SET_SELECTED_LOCATION,
  selectedLocation: {
    geo: geo || '',
    name: name || '',
    current: current || false,
  },
});

export const getYepDashboardData = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_YEP_DASHBOARD_DATA_START,
    });

    const response = await apiClient.get(`${apiClient.Urls.yepHome}`, {

    });
    console.log('yep home page data response---------->', response);

    if (response.success) {
      dispatch({
        type: GET_YEP_DASHBOARD_DATA_SUCCESS,
        homeData: response.data || {},
      });
    } else {
      dispatch({
        type: GET_YEP_DASHBOARD_DATA_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_YEP_DASHBOARD_DATA_FAIL,
    });
  }
};

export const getPopularKeywords = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_POPULAR_KEY_WORDS_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.popularkeywords}`, {

    });
    console.log('yep popular keywords data response---------->', response);

    if ((response || []).length) {
      dispatch({
        type: GET_POPULAR_KEY_WORDS_SUCCESS,
        popularkeywords: response,
      });
    } else {
      dispatch({
        type: GET_POPULAR_KEY_WORDS_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_POPULAR_KEY_WORDS_FAIL,
    });
  }
};

export const getStorefront = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_STOREFRONT_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.yepStorefront}`, {

    });
    console.log('yep storefront data response---------->', response);

    if (response && response?.store_id) {
      dispatch({
        type: GET_STOREFRONT_SUCCESS,
        storefront: response,
      });
    } else {
      dispatch({
        type: GET_STOREFRONT_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_STOREFRONT_FAIL,
    });
  }
};

export const getStoreservice = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_STOREFRONT_SERVICE_START,
    });

    const response = await apiClient.post(`${apiClient.Urls.yepStorefront}`, {

    });
    console.log('yep popular keywords data response---------->', response);

    if ((response || []).length) {
      dispatch({
        type: GET_STOREFRONT_SERVICE_SUCCESS,
        storefrontServices: response,
      });
    } else {
      dispatch({
        type: GET_STOREFRONT_SERVICE_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_STOREFRONT_SERVICE_FAIL,
    });
  }
};

export const getCategories = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_CATEGORIES_START,
    });

    const response = await apiClient.get(`${apiClient.Urls.yepCategories}`, {

    });
    console.log('yep categories data response---------->', response);

    if ((response || []).length) {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        categories: response,
      });
    } else {
      dispatch({
        type: GET_CATEGORIES_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
    });
  }
};

const getSearchReqParams = (state) => {
  try {
    const selectedCategory = state.yepHome.selectedCategory;
    const selectedSubcategory = state.yepHome.selectedSubcategory;
    const allSubcategoryIds = selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length
      ? selectedCategory.subcategories.map(c => c.id)
      : [];
    const selectedTags = (state.yepHome.selectedTags || []).map(tag => tag.name);
    const keyword = state.yepHome.keyword;
    const location = state.yepHome.selectedLocation;
    const filters = state.filter;
    const currentPage = state.yepHome.currentPage;

    let params = {};

    // check for category first
    if (selectedCategory) {
      if (selectedSubcategory) {
        // if subcategory send that subcategoryId[] as array
        params['subcategoryId'] = [selectedSubcategory.id];
        // if category & subcategory selected check if tags selected and send tags as tags[]
        if (selectedTags.length) {
          params['tags'] = selectedTags;
        }
      } else {
        // if subcategory not selected send all subcategoryId[] as array,
        params['subcategoryId'] = allSubcategoryIds;
      }
    } else if (keyword) {
      // else if check if keyword or searchTerm is present, if present then send it as 'what'
      params['what'] = keyword;
    }

    // check if location is present, if present send and is current then send it as 'where=place' else send it as 'location=lat,long'
    if (location && location.geo) {
      if (location.current) {
        params['location'] = `${location.geo || ''}`;
      } else if (location.name) {
        params['where'] = location.name;
      }
    }

    //@toDo check if pageNumber is present, if present send it as 'from=(number of results to skip)';
    const currentPageNumber = currentPage;
    if (currentPageNumber && currentPageNumber > 0) {
      params['from'] = (currentPageNumber - 1) * 10;
    }

    //check if open filter applied, if applied send it as open=boolean;
    if ((filters?.others || []).length) {
      filters.others.forEach(f => {
        params[f.key] = 'true';
      });
    }

    //check if distance filter applied, if applied send it as distance=number;
    if (filters?.distance) {
      params['distance'] = filters?.distance + 'KM';
    }


    //check if sort filters applied, if applied send it as sort='a,b,c';
    if ((filters?.sortBy || []).length) {
      params['sort'] = filters.sortBy.map(f => f.key).join(',');
    }

    return params;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export const getSearchResults = () => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;
    dispatch({
      type: GET_SEARCH_RESULTS_START,
    });
    const params = getSearchReqParams(state);
    const url = `${apiClient.Urls.searchResults}&${encodeURLParams(params, ['location'])}`;
    console.log("Params --------", params);
    console.log("HITTING --------\n" + url + '\n');


    const response = await apiClient.get(url, {

    });
    console.log('yep search results data response---------->', response);

    if (response && !response.code && response.data && Array.isArray(response.data)) {
      dispatch({
        type: GET_SEARCH_RESULTS_SUCCESS,
        searchResults: response,
      });
    } else {
      dispatch({
        type: GET_SEARCH_RESULTS_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_SEARCH_RESULTS_FAIL,
    });
  }
};

export const getWhatResults = (keyword) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_WHAT_RESULTS_START,
      keyword,
    });

    if (keyword && keyword.length >= 3) {
      const response = await apiClient.get(`${apiClient.Urls.suggestions}keyword=${encodeURIComponent(keyword)}`, {

      });
      console.log('yep what results data response---------->', response);

      if (response) {
        dispatch({
          type: GET_WHAT_RESULTS_SUCCESS,
          keywords: response.keywords || [],
          storefronts: response.storefronts || [],
        });

      } else {
        dispatch({
          type: GET_WHAT_RESULTS_FAIL,
        });
      }
    }
  } catch (e) {
    dispatch({
      type: GET_WHAT_RESULTS_FAIL,
    });
  }
};

export const getLocationResults = (searchKeyword) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;
    const url = `${apiClient.Urls.locations}keyword=${encodeURIComponent(searchKeyword)}`;
    console.log(url);

    dispatch({
      type: GET_LOCATION_RESULTS_START,
    });

    const response = await apiClient.get(url, {

    });
    console.log('yep location results data response---------->', response);

    if (response) {
      dispatch({
        type: GET_LOCATION_RESULTS_SUCCESS,
        locations: response,
      });

    } else {
      dispatch({
        type: GET_LOCATION_RESULTS_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_LOCATION_RESULTS_FAIL,
    });
  }
};

export const getAddressByReverseGeocode = (lat, long, callback) => async (dispatch, getState) => {
  try {

    const state = getState();
    const { profile } = state.session;

    dispatch({
      type: GET_ADDRESS_BY_REVERSE_GEOCODE_START,
    });

    const response = await apiClient.get(apiClient.Urls.geocodeReverse+'?'+'lat='+encodeURIComponent(lat)+'&lng='+encodeURIComponent(long)+'&type='+encodeURIComponent('google'), {

    });
    console.log('yep get address by reverse geocode results data response---------->', response);

    if (response) {
      if (callback) {
        callback(response)
      }
      dispatch({
        type: GET_ADDRESS_BY_REVERSE_GEOCODE_SUCCESS,
        locations: response,
      });

    } else {
      dispatch({
        type: GET_ADDRESS_BY_REVERSE_GEOCODE_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_ADDRESS_BY_REVERSE_GEOCODE_FAIL,
    });
  }
};

export default yepHomeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ERROR: {
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    }
    case SELECT_CATEGORY: {
      const categoryChanged = (!state.category || action.category.name != state.selectedCategory.name);
      return {
        ...state,
        currentPage: categoryChanged ? 1 : state.currentPage,
        tags: categoryChanged ? [] : state.tags,
        selectedTags: categoryChanged ? [] : state.selectedTags,
        selectedSubcategory: categoryChanged ? null : state.selectedSubcategory,
        keyword: categoryChanged ? '' : state.keyword,
        selectedCategory: action.category,
        // keyword: action.category.name,
      }
    }
    case TOGGLE_TAG: {
      const selectedTags = state.selectedTags || [];
      const shouldPushTag = action.tag && !(selectedTags.findIndex(tag => tag.id === action.tag.id) > -1);
      return {
        ...state,
        selectedTags: shouldPushTag ? [...selectedTags, action.tag] : selectedTags.filter(tag => tag.id != action.tag.id),
        currentPage: 1,
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case CLEAR_GET_WHAT_DATA: {
      return {
        ...state,
        keyword: '',
        getWhatLoading: false,
        keywords: [],
        storefronts: [],
      }
    }
    case SET_SEARCH_KEYWORD: {
      return {
        ...state,
        tags: [],
        selectedCategory: null,
        selectedSubcategory: null,
        selectedTags: [],
        currentPage: 1,
        keyword: action.keyword,
      }
    }
    case CLEAR_GET_WHAT_DATA: {
      return {
        ...state,
        keyword: '',
        getWhatLoading: false,
        keywords: [],
        storefronts: [],
      }
    }
    case SET_SELECTED_LOCATION: {
      return {
        ...state,
        currentPage: 1,
        selectedLocation: {
          ...state.selectedLocation,
          ...action.selectedLocation,
        },
        locations: [],
      }
    }
    case GET_YEP_DASHBOARD_DATA_START: {
      return {
        ...state,
        errorMessage: '',
        homeData: {},
        loading: true,
      }
    }
    case GET_YEP_DASHBOARD_DATA_SUCCESS: {
      return {
        ...state,
        homeData: action.homeData,
        loading: false,
      }
    }
    case GET_YEP_DASHBOARD_DATA_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_POPULAR_KEY_WORDS_START: {
      return {
        ...state,
        errorMessage: '',
        popularkeywords: [],
        loading: true,
      }
    }
    case GET_POPULAR_KEY_WORDS_SUCCESS: {
      return {
        ...state,
        popularkeywords: action.popularkeywords,
        loading: false,
      }
    }
    case GET_POPULAR_KEY_WORDS_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_STOREFRONT_START: {
      return {
        ...state,
        errorMessage: '',
        storefront: {},
        loading: true,
      }
    }
    case GET_STOREFRONT_SUCCESS: {
      return {
        ...state,
        storefront: action.storefront,
        loading: false,
      }
    }
    case GET_STOREFRONT_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_STOREFRONT_SERVICE_START: {
      return {
        ...state,
        errorMessage: '',
        storefrontServices: [],
        loading: true,
      }
    }
    case GET_STOREFRONT_SERVICE_SUCCESS: {
      return {
        ...state,
        storefrontServices: action.storefrontServices,
        loading: false,
      }
    }
    case GET_STOREFRONT_SERVICE_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    case GET_CATEGORIES_START: {
      return {
        ...state,
        errorMessage: '',
        categories: [],
        categoriesLoading: true,
      }
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.storefrontServices,
        categoriesLoading: false,
      }
    }
    case GET_CATEGORIES_FAIL: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        categoriesLoading: false,
      }
    }
    case GET_SEARCH_RESULTS_START: {
      return {
        ...state,
        searchResultsLoading: true,
        searchResults: null,
      }
    }
    case GET_SEARCH_RESULTS_SUCCESS: {
      return {
        ...state,
        searchResultsLoading: false,
        searchResults: action.searchResults,
      }
    }
    case GET_SEARCH_RESULTS_FAIL: {
      return {
        ...state,
        searchResultsLoading: false,
        searchResults: null,
      }
    }
    case GET_WHAT_RESULTS_START: {
      console.log('action yep home--------->', action);
      return {
        ...state,
        keyword: action.keyword,
        getWhatLoading: action.keyword && action.keyword.length >= 3 ? true : false,
        keywords: [],
        storefronts: [],
      }
    }
    case GET_WHAT_RESULTS_SUCCESS: {
      return {
        ...state,
        getWhatLoading: false,
        keywords: action.keywords,
        storefronts: action.storefronts,
      }
    }
    case GET_WHAT_RESULTS_FAIL: {
      return {
        ...state,
        // keyword: '',
        getWhatLoading: false,
        keywords: [],
        storefronts: [],
      }
    }
    case GET_LOCATION_RESULTS_START: {
      return {
        ...state,
        locationsResultsLoading: true,
        locations: [],
      }
    }
    case GET_LOCATION_RESULTS_SUCCESS: {
      return {
        ...state,
        locationsResultsLoading: false,
        locations: action.locations,
      }
    }
    case GET_LOCATION_RESULTS_FAIL: {
      return {
        ...state,
        locationsResultsLoading: false,
        locations: [],
      }
    }
    case GET_ADDRESS_BY_REVERSE_GEOCODE_START: {
      return {
        ...state,
        locationsResultsLoading: true,
        locations: [],
      }
    }
    case GET_ADDRESS_BY_REVERSE_GEOCODE_SUCCESS: {
      return {
        ...state,
        locationsResultsLoading: false,
        locations: action.locations,
      }
    }
    case GET_ADDRESS_BY_REVERSE_GEOCODE_FAIL: {
      return {
        ...state,
        locationsResultsLoading: false,
        locations: [],
      }
    }
    default:
      return state;
  }
};