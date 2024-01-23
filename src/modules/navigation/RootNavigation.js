// import 'react-native-gesture-handler';
import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity, View, Text, Dimensions, Platform, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

import StackNavigationData from './stackNavigationData';
import { colors, fonts } from '../../styles';
import HomeView from '../home/HomeView';

const Stack = createStackNavigator();

function NavigatorView(props) {
  // console.log('---------------------------->', props);
  // const { app } = props;
  // if (app.isLoggedIn || app.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;

  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Image
          // source={require('@images/menu.png')}
          resizeMode="contain"
          style={{
            height: 20,
            left: -15,
          }}
        />
      </TouchableOpacity>
    )
  }

  const headerRightSearchComponent = () => {
    return (
      <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
          }}>
          <View>
            <Image
              // source={props?.isSearchEnabled ? require('@images/cancel.png') : require('@images/search.png')}
              resizeMode="contain"
              style={{
                height: 24,
                width: 24,
                tintColor: '#1F1F1F',
                marginRight: 10,
              }}
            />
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  return (
    <Stack.Navigator>
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            title: '',
            headerShown: (item.headerBackground && item.headerBackground.source) ? true : false,
            headerTitleStyle: item.headerTitleStyle,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#95959530',
  },
  headerImage: {
    top: Platform.OS === 'android' ? '55%' : '65%',
    // top: '55%',
    width: '50%',
    height: 25,
    alignSelf: 'center',
  },
  rpcLeadsStatusCountText: {
    fontFamily: fonts.primaryBold,
    color: colors.green,
    fontSize: 10,
  },
});

export default connect(
  state => {
    return {
      isSearchEnabled: state.home.isSearchEnabled,
      rpcLeadsStatusCount: state.home.rpcLeadsStatusCount,
      loading: state.home.loading,
    };
  }, {
}
)(NavigatorView);
