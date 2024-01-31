export const baseUrl = 'https://salesfulfillment.telkom.co.za/';
export const yepBaseUrl = 'https://api.yep.co.za/';
export const yepApiCacheUrl = 'https://apicache.yep.co.za/';

const apiClient = {
  Urls: {
    login: `${baseUrl}workflow-mam/v1/workflow/keycloak/login`,
    viewLoginBalance: `${baseUrl}workflow-mam/v1/workflow/balanceManagement/viewLoginBalance`,
    personalDetails: `${baseUrl}workflow-mam/v1/workflow/view/personal-details`,
    billingAddress: `${baseUrl}workflow-mam/v1/workflow/view/billing-address`,
    physicalAddress: `${baseUrl}workflow-mam/v1/workflow/view/physical-details`,
    contactDetails: `${baseUrl}workflow-mam/v1/workflow/view/contact-details`,
    customerProducts: `${baseUrl}workflow-mam/v1/workflow/cache/customer/products/`,
    billingAccounts: `${baseUrl}workflow-mam/v1/workflow/cache/customer/billing-accounts/`,
    paymentHistory: `${baseUrl}workflow-mam/v1/workflow/payment/history`,
    clevvaJourney: `${baseUrl}workflow-mam/v1/workflow/clevva-journey`,
    spendLimit: `${baseUrl}workflow-mam/v1/workflow/spend-limit/get-spend-limit/`,
    topupStartProcess: `${baseUrl}workflow-mam/v1/workflow/top-up/start-process`,
    subscriberProductView: `${baseUrl}workflow-mam/v1/workflow/subscriber-product/view`,
    contentServiceView: `${baseUrl}workflow-mam/v1/workflow/content-service/view`,
    yepHome: `${yepApiCacheUrl}home-page`,
    popularkeywords: `${yepApiCacheUrl}popularkeywords`,
    yepStorefront: `${yepBaseUrl}store`,
    yepCategories: `${yepApiCacheUrl}categories`,
    searchResults: `${yepBaseUrl}search?type=storefronts`,
    suggestions: `${yepBaseUrl}getWhat?`,
    locations: `${yepBaseUrl}getWhere?`,
    geocodeReverse: `${yepBaseUrl}locationService/geocodeReverse`,
  },

  make: function (url, method, params, isFileUpload) {
    console.log("apiclient", url, params);

    let headers = {
      "Content-Type": "application/json",
    };

    if (params?.authToken) {
      headers['Authorization'] = `Bearer ${params?.authToken}`
    }

    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(params),
    }).then(async (response) => {
      console.log('response--------------------->', response)
      let res = await response.json();
      console.log('res----------->', res);
      return res;
    })
      .catch(error => {
        console.log('api client error block at line 33-------->', error);
        return {
          success: false,
          message: error?.message || error || 'Something went wrong!',
        };
      });

  },

  post: function (url, params, isFileUpload = false) {
    return this.make(url, 'POST', params, isFileUpload);
  },

  get: function (url, params) {
    console.log("apiclient", url, params);
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    if (params.authToken) {
      headers['Authorization'] = `Bearer ${params.authToken}`
    }
    return fetch(url, {
      method: 'GET',
      headers,
    }).then(async (response) => {
      console.log('response--------------------->', response)
      let res = await response.json();
      console.log('res----------->', res);
      return res;
    })
      .catch(error => {
        console.log('api client error block at line 65-------->', error);
        return {
          success: false,
          message: error?.message || error || 'Something went wrong!',
        };
      });
  },

  mock: function (url, params, mockResponse) {
    return Promise.resolve(mockResponse);
  },

  fileUpload: function (url, params) {
    const data = new FormData();
    data.append('content', params.content);
    data.append('image', params.image);
    data.append('authToken', params.authToken);


    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    }).then(response => response.json())
      .catch(error => {
        console.log('api client-------->', error);
        return {
          success: false,
          message: error?.message || error || 'Something went wrong!',
        };
      });
  },

};

export default apiClient;
