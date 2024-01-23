import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigator from './MainTabNavigator';

import { colors, fonts } from '../../styles';
import Login from '../auth/Login';
import MyAccount from '../home/MyAccount';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        // source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          width: 22,
          height: 22,
          tintColor: '#1F1F1F',
        }}
      />
    </TouchableOpacity>
  )
}

const logo = '';//require('@images/logo.png')

const StackNavigationData = [
  {
    name: 'Home',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: logo },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'MyAccount',
    component: MyAccount,
    headerLeft: headerLeftComponent,
    headerBackground: { source: logo },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
]

export default StackNavigationData;
