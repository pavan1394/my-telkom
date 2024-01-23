import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import { fonts, dimens, colors } from '../../styles';
import { connect } from 'react-redux';
import Login from '../auth/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { logout, deleteAccount } from '../auth/session';
import { skipNow } from '../auth/signin';

const drawerData = [
  // {
  //   name: 'My Profile',
  //   icon: require('@images/user.png'),
  //   screen: 'MyAccount',
  // },
  // {
  //   name: 'Call & Enquiry',
  //   icon: require('@images/phone.png'),
  //   screen: 'CallAndEnquiry',
  // },
  // {
  //   name: 'Reminders',
  //   icon: require('@images/reminders.png'),
  //   screen: 'Reminders',
  // },
  // {
  //   name: 'Listings',
  //   icon: require('@images/create_free_listing.png'),
  //   screen: 'PropertyListings',
  // },
  // {
  //   name: 'My Leads',
  //   icon: require('@images/create_free_listing.png'),
  //   screen: 'MyLeads',
  // },
  // {
  //   name: 'Delete Account',
  //   icon: require('@images/cancel.png'),
  // },
  // {
  //   name: 'Logout',
  //   icon: require('@images/logout.png'),
  // },
];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const data = drawerData;
  return (
    <>
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{}}
        />
        <View style={{ paddingLeft: 15 }}>
          <Text style={styles.userName}>{props.profile ? props.profile.name : 'Guest'}</Text>
          {props.profile ? <Text style={{ color: '#000000', fontFamily: fonts.primaryBold }}>{props.profile.phone}</Text> : null}
        </View>
      </View>
      <View style={styles.divider} />
      {data.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => {
            if (item.name === 'Logout') {
              if (props.profile) {
                return (
                  <View
                    style={styles.menuLabelFlex}>
                    <Image
                      style={[styles.icon, { tintColor: colors.themeColor, }]}
                      source={item.icon}
                    />
                    <Text style={[styles.menuTitle, { color: colors.themeColor, }]}>{item.name}</Text>
                  </View>
                )
              } else {
                return (
                  <View
                    style={styles.menuLabelFlex}>
                    <Image
                      style={[styles.icon, { tintColor: colors.themeColor, }]}
                      source={item.icon}
                    />
                    <Text style={[styles.menuTitle, item.name === 'Logout' && { color: colors.themeColor, }]}>{'Login'}</Text>
                  </View>
                )
              }
            } else {
              return (
                <View
                  style={styles.menuLabelFlex}>
                  <Image
                    style={styles.icon}
                    source={item.icon}
                  />
                  <Text style={[styles.menuTitle]}>{item.name}</Text>
                </View>
              )
            }
          }}
          onPress={() => {
            if (item.name === 'Logout') {
              if (props.profile) {
                props.logout();
              } else {
                props.skipNow(true);
              }
            } else if(item.name === 'Delete Account'){
              Alert.alert(
                'Are you sure you want to delete?',
                'If you delete, you won`t be able to use this account in future.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      props.deleteAccount();
                      // Code to handle the user pressing the "OK" button
                    },
                  },
                ]
              );
              }
              else{
              if (item.screen == 'Shops' || item.screen == 'Services') {
                props.navigation.navigate(item.screen, {
                  storeType: item.screen == 'Services' ? 'service' : 'shop',
                });
              } else {
                props.navigation.navigate(item.screen);
              }
            }
          }}
        />
      ))}
      {/* <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconBlog}
            />
            <Text style={styles.menuTitle}>Blog</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Blog')}
      />
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconSettings} 
            />
            <Text style={styles.menuTitle}>Settings</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Calendar')}
      /> */}
      </DrawerContentScrollView>
      <Text style={styles.appVersionText}>{`App version: ${'1.0.0'}`}</Text>
    </>
  );
}

const App = (props) => {

  console.log('props---------------------->', props.authToken);

  if (!props.authToken) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    )
  }
  return (
    <NavigatorView />
  )
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#fff',
      }}
      drawerContent={(navProps) => <CustomDrawerContent {...props} {...navProps} />}
    >
      <Drawer.Screen
        options={{
          swipeEnabled: false,
          disableGestures: true,
        }}
        name="Home"
        component={NavigatorView} {...props}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 20,
    color: '#0B0B0B',
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
    textAlign: 'center',
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    color: '#000000',
    fontSize: 18,
    fontFamily: fonts.primaryBold,
  },
  divider: {
    borderBottomColor: '#00000019',
    borderBottomWidth: 2,
  },
  avatar: {
    width: dimens.width * 0.08,
    height: dimens.width * 0.08,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#0B0B0B',
    resizeMode: 'contain',
  },
  appVersionText: {
    fontFamily: fonts.primaryExtraBold,
    fontSize: 15,
    padding: 5,
    alignSelf: 'flex-end',
    color: colors.themeColor,
  },
});

export default connect(
  state => {
    return {
      authToken: state.session.authToken,
      profile: state.session.profile,
      skip: state.signin.skip,
    }
  }, {
  logout,
  deleteAccount,
  skipNow,
}
)(App);