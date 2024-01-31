import React, { Component } from 'react';
import { View, Image, StatusBar, } from 'react-native';
import { colors } from '../../styles';

export default class Splash extends Component {

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor={'#2ea3e6'} translucent={true} />
        <View style={{ flex: 1, backgroundColor: '#2ea3e6', }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2ea3e6',
              // width: '100%',
              // height: '100%',
            }}>
            {/* <View style={{ flex: 1 }} /> */}

            <Image source={require('./images/logo.png')} style={{ alignSelf: 'center', width: '60%', resizeMode: 'contain', }} />
          </View>
        </View>
      </React.Fragment>
    );
  }
}