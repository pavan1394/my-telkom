import Help from '../home/Help';
import HomeScreen from '../home/HomeView';
import MyAccount from '../home/MyAccount';
import Insurance from '../insurance/Insurance';
import YepHome from '../yep/YepHome';

const iconHome = require('../../images/home.png');
const iconAccount = require('../../images/my-account.png');
const iconHelp = require('../../images/help.png');
const iconYep = require('../../images/yep.png');
const iconInsurance = require('../../images/insurance.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'My Account',
    component: MyAccount,
    icon: iconAccount,
  },
  // {
  //   name: 'Get Help',
  //   component: Help,
  //   icon: iconHelp,
  // },
  {
    name: 'Yep',
    component: YepHome,
    icon: iconYep,
  },
  {
    name: 'Insurance',
    component: Insurance,
    icon: iconInsurance,
  },
];

export default tabNavigationData;