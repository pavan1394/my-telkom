import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigator from './MainTabNavigator';

import { colors, fonts } from '../../styles';
import MyAccount from '../home/MyAccount';
import AccountDetails from '../myAccount/AccountDetails';
import Upgrades from '../myAccount/Upgrades';
import ContentServices from '../myAccount/ContentServices';
import SpendLimit from '../myAccount/SpendLimit';
import InternationalRoaming from '../myAccount/ActivateRoaming';
import ViewInvoice from '../myAccount/ViewInvoice';
import ViewPuk from '../myAccount/ViewPuk';
import ViewVAS from '../myAccount/ViewVas';
import PaymentDetails from '../myAccount/PaymentDetails';
import PaymentHistory from '../myAccount/PaymentHistory';
import TopupAirTime from '../myHome/AirTime';
import AirTimePayment from '../myHome/AirTimePayment';
import TopUpVoice from '../myHome/TopupVoice';
import SelectProductTypes from '../myHome/ProductTypes';
import TopupData from '../myHome/TopupData';
import ProductPayment from '../myHome/ProductPayment';
import GetHelpDetailsPage from '../home/GetHelpDetailsPage';
import Settings from '../../components/Settings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectRechargeType from '../myHome/SelectRechargeType';
import SelectBundleSize from '../myHome/SelectBundleSize';
import SelectBundleType from '../myHome/SelectBundleType';
import TopupAirtime from '../myHome/TopupAirtime';
import GetWhat from '../yep/Search/Containers/GetWhat';
import GetWhere from '../yep/Search/Containers/GetWhere';
import SearchResults from '../yep/Search/Containers/SearchResults';
// import Storefront from '../yep/Storefront';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
     <MaterialIcons name='keyboard-backspace' size={18} color='#fff'/>
    </TouchableOpacity>
  )
}

const StackNavigationData = [
  {
    name: 'Home',
    component: TabNavigator,
    headerLeft: null,
    headerShown: false,
    headerBackground: null,
    headerTitleStyle: null,
  },
  {
    name: 'MyAccount',
    title: 'My Account',
    component: MyAccount,
    headerLeft: null,
    headerShown: true,
    headerBackground: null,
    headerTitleStyle: null,
  },
  {
    name: 'AirTimeTopUp',
    title: 'Air Time TopUp',
    component: TopupAirTime,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'AirTimePayment',
    title: 'Air Time Payment',
    component: AirTimePayment,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'TopupAirtime',
    title: 'AIRTIME',
    component: TopupAirtime,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'TopupVoice',
    title: 'Topup Voice',
    component: TopUpVoice,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'TopupData',
    title: 'Topup Data',
    component: TopupData,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'SelectProductTypes',
    title: 'Select Product Types',
    component: SelectProductTypes,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'SelectRechargeType',
    title: 'Select Product Types',
    component: SelectRechargeType,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'SelectBundleSize',
    title: 'Select Bundle Size',
    component: SelectBundleSize,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'SelectBundleType',
    title: 'Select Bundle Type',
    component: SelectBundleType,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'ProductPayment',
    title: 'Product Payment',
    component: ProductPayment,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'PaymentDetails',
    title: 'Payment Details',
    component: PaymentDetails,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'PaymentHistory',
    title: 'Payment History',
    component: PaymentHistory,
    headerLeft: null,
    headerShown: true,
  },
  {
    name: 'AccountDetails',
    title: 'Account Details',
    component: AccountDetails,
    headerLeft: null,
    headerShown: true,
  },
  {
    name: 'SpendLimit',
    title: 'Spend Limit',
    component: SpendLimit,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'Upgrades',
    title: 'Upgrades',
    component: Upgrades,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'ViewPuk',
    title: 'View Puk',
    component: ViewPuk,
    headerLeft: null,
    headerShown: true,
  },
  {
    name: 'ViewVas',
    title: 'View Vas',
    component: ViewVAS,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'ContentServices',
    title: 'Content Services',
    component: ContentServices,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'InternationalRoaming',
    title: 'International Roaming',
    component: InternationalRoaming,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'ViewInvoice',
    title: 'View Invoice',
    component: ViewInvoice,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'GetHelpDetailsPage',
    title: 'Get Help',
    component: GetHelpDetailsPage,
    headerLeft: null,
    headerShown: true,
  },
  {
    name: 'Settings',
    title: 'Settings',
    component: Settings,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'GetWhat',
    title: 'Get What',
    component: GetWhat,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'GetWhere',
    title: 'Get Where',
    component: GetWhere,
    headerLeft: null,
    headerShown: false,
  },
  {
    name: 'SearchResults',
    title: 'SearchResults',
    component: SearchResults,
    headerLeft: null,
    headerShown: false,
  },
  // {
  //   name: 'Storefront',
  //   title: 'Storefront',
  //   component: Storefront,
  //   headerLeft: null,
  //   headerShown: false,
  // },
]

export default StackNavigationData;
