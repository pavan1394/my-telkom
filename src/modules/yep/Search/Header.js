import React, { Component } from 'react';
import { Image, ImageBackground, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderTitle } from './headerStyles';

export default class Header extends Component {

  renderHeaderContent = () => {
    const { title, back, titleStyles = {} } = this.props;
    return (
      <View
        style={{
          width: "100%",
          flexDirection: 'row',
          alignItems: "center",
          position: 'absolute',
          top: '40%',
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 30,
            height: "100%",
            marginHorizontal: 10,
            justifyContent: "center",
          }}
          onPress={() => {
            if (back) {
              back();
            }
          }}
        >
          <Image
            source={require('./Images/arrow-back.png')}
            style={{ width: 30, height: 18, marginTop: Platform.OS === 'ios' ? 5 : -2  }}
          />
        </TouchableOpacity>
        <HeaderTitle style={titleStyles}>{`${title || 'Near ?'}`}</HeaderTitle>
      </View>
    )
  }

  render() {
    const { hideBackground } = this.props;

    if (!hideBackground) {
      return (
        <ImageBackground source={require('./Images/header_background.png')} style={{ width: '100%', height: 120, resizeMode: 'contain', backgroundColor: '#00C1BC' }}>
          {this.renderHeaderContent()}
        </ImageBackground>
      );
    }
    return (
      <View style={{
        width: '100%',
        height: 120
      }}>
        {this.renderHeaderContent()}
      </View>
    );
  }
}