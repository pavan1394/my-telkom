import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { dimens, fonts, colors } from '../../styles'
import { Button, PageLoader } from '../../components';
import {
  setEmail,
  setPassword,
  requestOtp,
  skipNow,
  login,
} from './signin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { validateEmail } from '../../utils/validate';

class Login extends Component {

  state = {
    isPasswordVisible: false,
  }

  fieldRef = React.createRef();

  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  render() {
    const {
      email,
      password,
      setEmail,
      setPassword,
      requestOtp,
      skipNow,
      login,
      navigation,
      loading,
    } = this.props;

    console.log('loading--------->', loading);

    const {
      isPasswordVisible
    } = this.state;

    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 1]}
        colors={['#0272bd', '#35a8e8', '#0272bd']}

        style={styles.container}>
          <PageLoader loading={loading} />
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} translucent={true} />
        <View style={{ flex: 1, }}>
          <View style={styles.logoContainer}>
            <Image source={require('../splash/images/logo.png')} style={styles.logo} />
          </View>
          <View style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>

            {/* <Text style={styles.signInText}>{"Login Account"}</Text>
            <Text style={styles.signInSubLabel1}>{"Hello, Welcome back to our account"}</Text> */}
            {/* <Text style={styles.signInSubLabel2}>{"Enter Your Mobile Number To Receive A Verification Code"}</Text> */}

            <TextInput
              ref={this.fieldRef}
              label='Email'
              placeholder={'Enter email'}
              // keyboardType='email-address'
              containerStyle={styles.textInput}
              // formatText={this.formatText}
              baseColor={colors.grey}
              tintColor={colors.blue}
              value={email}
              // secureTextEntry={true}
              affixTextStyle={colors.green}
              onChangeText={(text) => {
                setEmail(text);
              }}
              labelOffset={{ x0: 0, y0: 0, x1: -45, y1: -10, }}
              labelTextStyle={{ color: 'red', fontFamily: fonts.primaryRegular, }}
              renderLeftAccessory={() => {
                return (
                  <MaterialCommunityIcons
                    name={'email-outline'}
                    size={25}
                    color={'grey'}
                    style={{ marginRight: 10 }}
                  />
                )
              }}
            />

            <TextInput
              ref={this.fieldRef}
              label='Password'
              placeholder={'Enter password'}
              // keyboardType='phone-pad'
              containerStyle={styles.textInput}
              // formatText={this.formatText}
              baseColor={colors.grey}
              tintColor={colors.blue}
              value={password}
              affixTextStyle={colors.green}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => {
                setPassword(text);
              }}
              labelOffset={{ x0: 0, y0: 0, x1: -45, y1: -10, }}
              labelTextStyle={{ color: 'red', fontFamily: fonts.primaryRegular, }}
              renderLeftAccessory={() => {
                return (
                  <MaterialIcons
                    name={'lock-outline'}
                    size={25}
                    color={'grey'}
                    style={{ marginRight: 10 }}
                  />
                )
              }}
              renderRightAccessory={password ? () => {
                return (
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye'}
                    size={25}
                    style={{ marginRight: 0 }}
                    color={'grey'}
                    onPress={() => {
                      this.setState({ isPasswordVisible: !isPasswordVisible })
                    }}
                  />
                )
              } : null}
            />

            <Button
              style={[styles.demoButton, {
                // flex: 1,
                backgroundColor: colors.primaryBtnColor,
              }]}
              bgColor={colors.primaryBtnColor}
              // secondary
              caption="Sign In"
              onPress={() => {
                login();
                // navigation.navigate('Home')
                // if (validateEmail(email) && password) {
                // requestOtp(() => this.props.navigation.navigate('VerifyOTP'), 'send', 'login');
                // }
              }}
            />

            <TouchableOpacity
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-end', }}>
                <Text style={[styles.skipNow, {
                  color: '#000000',
                  fontSize: 13,
                  fontFamily: fonts.primaryMedium,
                }]}
                >
                  {`Not registered yet ? `}
                  <Text
                    onPress={() => {
                      // this.props.navigation.navigate('SignUp')
                    }}
                    style={{
                      color: colors.blue,
                      fontSize: 13,
                      fontFamily: fonts.primaryBold,
                    }}>
                    {`Create an Account`}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>


        {/* <TouchableOpacity
          onPress={() => skipNow(false)}
          activeOpacity={1}>
          <Text style={styles.skipNow}>{"Skip Now"}</Text>
        </TouchableOpacity> */}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0272bd',
  },
  logoContainer: {
    width: dimens.width * 0.4,
    height: dimens.width * 0.4,
    // backgroundColor: colors.blue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  textInput: {
    marginTop: 30,
  },
  signInText: {
    fontFamily: fonts.primaryBold,
    fontSize: 15,
    paddingBottom: 0,
    color: '#000000',
  },
  signInSubLabel1: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    paddingTop: 5,
    color: '#000000',
  },
  signInSubLabel2: {
    fontFamily: fonts.primaryMedium,
    fontSize: 12,
    paddingTop: 20,
    color: '#000000',
  },
  demoButton: {
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.themeColor,
  },
  skipNow: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#9A9A9A',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 20,
  }
});

export default connect(
  state => {
    return {
      email: state.signin.email,
      password: state.signin.password,
      loading: state.signin.loading,
    };
  }, {
  setEmail,
  setPassword,
  requestOtp,
  skipNow,
  login,
}
)(Login);