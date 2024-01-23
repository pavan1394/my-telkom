export const baseUrl = 'https://salesfulfillment.telkom.co.za/';

const apiClient = {
  Urls: {
    login: 'workflow-mam/v1/workflow/keycloak/login',
    viewLoginBalance: 'workflow-mam/v1/workflow/balanceManagement/viewLoginBalance',
    myAccount: 'workflow-mam/v1/workflow/view/personal-details',
    customerProducts: 'workflow-mam/v1/workflow/cache/customer/products/',
  },

  make: function (url, method, params, isFileUpload) {
    console.log("apiclient", baseUrl + url, params);
   
    let headers = {
      "Content-Type": "application/json",
    };

    if (params?.authToken) {
      headers['Authorization'] = `Bearer ${params?.authToken}`
    }

    return fetch(baseUrl + url, {
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
    console.log("apiclient", baseUrl + url, params);
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    if (params.authToken) {
      headers['Authorization'] = `Bearer ${params.authToken}`
    }
    return fetch(baseUrl + url, {
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


    return fetch(baseUrl + url, {
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
