import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, Platform, TouchableOpacity, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, fonts } from '../../styles';

import tabNavigationData from './tabNavigationData';

const Tab = createBottomTabNavigator();

function BottomTabs({ navigation, }) {

  const headerRightComponent = (screenName) => {
    return null;
  }

  return (
    <Tab.Navigator tabBarOptions={{ style: { height: Platform.OS === 'ios' ? 90 : 50 } }}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              navigation.setOptions({
                headerRight: () => headerRightComponent(item.name)
              });
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => <Text style={{ fontSize: 12, color: focused ? colors.primaryBtnColor : colors.blue, fontFamily: fonts.primarySemiBold }}>{item.name}</Text>,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    tintColor: colors.blue
  },
  tabBarIconFocused: {
    tintColor: colors.primaryBtnColor,
  },
  numberWrap: {
    position: "absolute",
    top: -3,
    right: -5,
    height: 18,
    minWidth: 18,
    backgroundColor: '#102E6A',
    borderRadius: 9,
  },
  number: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: "#FFFFFF",
    fontSize: 10,
    margin: 3,
    fontFamily: fonts.primaryRegular,
  },
  activityText: {
    color: "#8E8E8E",
    fontSize: 10,
    fontFamily: fonts.primaryRegular,
    textAlign: 'right',
  },
  activityStatusText: {
    color: "#006E0D",
    fontSize: 12,
    fontFamily: fonts.primaryBold,
    textAlign: 'left',
  },
});

export default connect(
  state => {
    return {
    };
  }, {
}
)(BottomTabs);
