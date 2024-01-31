import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Locker from 'react-native-vector-icons/EvilIcons';
import EditIcon from 'react-native-vector-icons/Feather';
import MobileIcon from 'react-native-vector-icons/AntDesign';
import ProfileIcon from 'react-native-vector-icons/Octicons';
import Logout from 'react-native-vector-icons/AntDesign';
import ForwardIcon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from "../styles";
import PrimaryButton from "./PrimaryButton";
import { logout } from "../modules/auth/session";
import CommonHeader from "../modules/navigation/CommonHeader";

const settingPageData = [
  {
    leftIcon: <Locker name='lock' size={30} color='#0083c2' />,
    text: 'Change Password'
  },
  {
    leftIcon: <EditIcon name='edit' size={20} color='#0083c2' />,
    text: 'Edit Service Name'
  },
  {
    leftIcon: <EditIcon name='edit' size={20} color='#0083c2' />,
    text: 'Edit Account Name'
  },
  {
    leftIcon: <MobileIcon name='mobile1' size={20} color='#0083c2' />,
    text: 'Manage One-Time-Pin'
  },
  {
    leftIcon: <ProfileIcon name='circle-slash' size={20} color='#0083c2' />,
    text: 'Deregester Profile'
  },
  {
    leftIcon: <EditIcon name='edit' size={20} color='#0083c2' />,
    text: 'Protect/Unprotect Number'
  },
]

const Settings = ({
  navigation,
  logout,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        leftText={'Settings'}
        // leftIcon={<FontAwesome name='user-circle' size={30} color='#fff' />}
        rightIcon={<TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{ flexDirection: 'row' }}>
          <View>
            <Logout name='logout' size={20} color='#fff' />
          </View>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>} />
      <View>
        {settingPageData.map((setting, i) => {
          return (
            <View key={i}>
              <TouchableOpacity style={styles.body}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[{ flex: 0.1, }, i == 0 ? {marginLeft: -5,} : {}]}>{setting.leftIcon}</View>
                  <View style={[{ flex: 0.9, }]}>
                  <Text style={[{ fontFamily: fonts.primaryRegular, fontSize: 16, color: '#0083c2' },]}>{setting.text}</Text>
                  </View>
                <View style={{ flex: 0.1, }}><ForwardIcon name="keyboard-arrow-right" size={30} color='#0083c2' /></View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>
            </View>
          )
        })}
      </View>
      <View style={styles.btn}>
        <PrimaryButton
          title={'Back'}
          navigation={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    // fontFamily: fonts.primaryExtraBold,
    color: '#0083c2',
  },
  logout: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontFamily: fonts.primaryRegular,
  },
  hr: {
    borderWidth: 1,
    // borderColor: colors.lightGray,
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default connect(
  state => {
    console.log('token........', state.session.authToken)
    return {
      authToken: state.session.authToken,
    }
  }, {
  logout
}
)(Settings);