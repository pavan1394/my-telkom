import Help from '../home/Help';
import HomeScreen from '../home/HomeView';
import MyAccount from '../home/MyAccount';

const iconHome = require('../../images/home.png');
const iconAccount = require('../../images/my-account.png');
const iconHelp = require('../../images/help.png');

const tabNavigationData = [
  {
    name: 'Dashboard',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'My Account',
    component: MyAccount,
    icon: iconAccount,
  },
  {
    name: 'Get Help',
    component: Help,
    icon: iconHelp,
  },
];

export default tabNavigationData;