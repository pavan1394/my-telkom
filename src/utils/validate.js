import moment from 'moment';
import momenttz from 'moment-timezone';

export const validatePhoneNumber = (number) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(number);
}

export const validateEmail = (email) => {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email));
}

export const defaultTradingHours = Object.freeze({
  mon: {
    open: '800',
    close: '1700',
  },
  tue: {
    open: '800',
    close: '1700',
  },
  wed: {
    open: '800',
    close: '1700',
  },
  thu: {
    open: '800',
    close: '1700',
  },
  fri: {
    open: '800',
    close: '1700',
  },
});

export const ensureHex = hexValue => {
  if (!hexValue) {
    return null;
  }
  if (hexValue.includes('#')) {
    return hexValue;
  } else {
    return `#${hexValue}`;
  }
};

export const getVariationLabel = variation => {
  let variationText = '';
  if (!variation) return variationText;
  const priceDescription = priceDescriptions.find(
    pDescription => pDescription.value == variation.price_desc,
  );
  if (variation.price_type == 'fixed') {
    if (variation.price_desc == 'custom') {
      variationText = `${variation.price_name}: R ${variation.price}`;
    } else {
      variationText = `${priceDescription.text}: R ${variation.price}`;
    }
  } else if (variation.price_type == 'flexible') {
    if (variation.price_desc == 'custom') {
      variationText = `${variation.price_name}: From R ${variation.price}`;
    } else {
      variationText = `${priceDescription.text}: From R ${variation.price}`;
    }
  } else if (variation.price_type == 'free') {
    if (variation.price_desc == 'custom') {
      variationText = `${variation.price_name}: Free`;
    } else {
      variationText = `${priceDescription.text}: Free`;
    }
  } else {
    variationText = `${variation.price_name}: R ${variation.price}`;
  }
  return variationText;
};

export const getCompleteAddress = (address) => {
  if (!address || (typeof address === "object" && Array.isArray(address))) {
    return "";
  }
  const {
    building,
    streetNumber,
    streetName,
    postalCode,
    city: locality,
    locality: dependentLocality,
    province: administrativeArea,
  } = address;
  const reducer = (acc, v) => {
    const value = typeof v === "string" && v.trim();
    if (value) {
      acc.push(value);
    }
    return acc;
  };
  const joinWith = (arr, separator) =>
    arr.reduce(reducer, []).join(separator).trim();
  const addressLine1 = joinWith([building, streetNumber, streetName], " ");
  const newAddress = joinWith(
    [addressLine1, dependentLocality, locality, postalCode, administrativeArea],
    ", "
  );
  if (newAddress.charAt(newAddress.length - 1) === ",") {
    return newAddress.slice(0, -1);
  }
  return newAddress;
};

export const getStoreDataFromDraft = (onboardState = {}) => {
  const {
    getStarted = {},
    getNoticed = {},
    getCustomising = {},
  } = onboardState;
  return {
    store_id: '',
    name: getStarted.storeName || '',
    email: getStarted.email || '',
    website: getNoticed.website || '',
    phone: Array.isArray(getStarted.phoneNumber)
      ? getStarted.phoneNumber
      : [getStarted.phoneNumber || ''],
    tradingHourSetup: getStarted.tradingHourSetup || '',
    trading_hour: getStarted.tradingHours || {},
    categoryId: getStarted.categoryId || '',
    slogan: getStarted.slogan || '',
    description: getStarted.description || '',
    logo: getCustomising.logo || '',
    gallery:
      getCustomising.gallery?.length && Array.isArray(getCustomising.gallery)
        ? getCustomising.gallery
        : [getCustomising.gallery || ''],
    subcategory: [],
    subcategory_id: getCustomising.subcategoryId || '',
    tag: [],
    address: {
      province: getStarted.address?.province || '',
      complete: getCompleteAddress(getStarted?.address || {}),
    },
    search_path: [],
    geo: `${getStarted.address?.coordinates?.lat},${getStarted.address?.coordinates?.lng}`,
    legacy_id: '',
    ownerId: true,
    lead_source: '',
    store_status: '',
    created: '',
    is_store_listed: '',
    service:
      Array.isArray(getCustomising.services) && getCustomising.services?.length
        ? getCustomising.services.map(makeService)
        : [],
    theme: getCustomising.theme || defaultThemeData,
    badges: {},
    category: [],
    category_id: getStarted.categoryId ? [getStarted.categoryId] : [],
    extra: {
      category: [],
      subcategory: [],
      tag: getCustomising.tags?.length ? getCustomising.tags : [],
    },
    is_verified: 0,
    verif_method: getNoticed.verification_method || '',
    store_claim_status: '',
    ownerFullName: [getNoticed.forename || '', getNoticed.surname || '']
      .filter((s) => s)
      .join(' '),
    socialHandles: getNoticed.socialHandles?.length
      ? getNoticed.socialHandles
      : [],
    isTodayPublicHoliday: false,
    postalCode: getStarted.address?.postalCode || '',
  };
}

export const hex_is_light=(color)=> {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}

export const formatSizeUnits = (bytes) => {
  if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
  else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
  else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
  else if (bytes > 1)           { bytes = bytes + " KB"; }
  else if (bytes == 1)          { bytes = bytes + " KB"; }
  else                          { bytes = "0 KB"; }
  return bytes;
}

export const encodeURLParams = (params, ignoreEncodingInKeys = []) => {
  try {
    let encodedParams = Object.keys(params)
      .map(key => {
        const shouldEncode = !ignoreEncodingInKeys.includes(key);
        if (Array.isArray(params[key])) {
          return params[key].map(str => key + '=' + (shouldEncode ? encodeURIComponent(str) : str));
        }
        return key + '=' + (shouldEncode ? encodeURIComponent(params[key]) : params[key]);
      })
      .flat(Infinity)
      .join('&');
    return encodedParams;
  } catch (error) {
    // console.error(error);
    return {};
  }
};

export const formatSuggestion = (searchTerm = '', term = '') => {
  const index = term.indexOf(searchTerm);
  if (index >= 0) {
    const preFix = term.substring(0, index);
    const bold = term.substring(index, index + searchTerm.length);
    const suffix = term.substring(index + searchTerm.length, term.length);
    return {
      preFix,
      bold,
      suffix,
      term,
    };
  }
  return {
    preFix: term,
    bold: '',
    suffix: '',
    term,
  };
};

export const checkIsStorOpen = (tradingHours, weekday) => {
  if (tradingHours && weekday in tradingHours && tradingHours[weekday]) {
    const currentTime = momenttz().tz('Africa/Johannesburg').format('YYYY-MM-DD HH:mm');
    const datetime = moment().format('YYYY-MM-DD') + ' ';
    const startTime = moment(datetime + convertToTimeFormat(tradingHours[weekday].open==='0'?'000':tradingHours[weekday].open));
    const endTime = moment(datetime + convertToTimeFormat(tradingHours[weekday].close==='0'?'000':tradingHours[weekday].close));
    const isBetween = moment(currentTime).isBetween(startTime, endTime);
    return isBetween;
  }
  return false;
};

export const checkStoreOpenTiming = (tradingHours, weekday) => {
  if (tradingHours && weekday in tradingHours && tradingHours[weekday]) {
    const currentTime = momenttz().tz('Africa/Johannesburg').format('YYYY-MM-DD HH:mm');
    const datetime = momenttz().tz('Africa/Johannesburg').format('YYYY-MM-DD') + ' ';
    const startTime = momenttz(datetime + convertToTimeFormat(tradingHours[weekday].open));
    const isBefore = momenttz(currentTime).isBefore(startTime);
    return isBefore;
  }
  return false;
};

export const convertToTimeFormat = value => {
  let timeStr = `${value || '000'}`;
  if (timeStr.length === 3) {
    return `0${timeStr.charAt(0)}:${timeStr.slice(1)}`;
  } else {
    return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
  }
};