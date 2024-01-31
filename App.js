import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar, LogBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors, fonts } from './src/styles';

import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';
import Splash from './src/modules/splash/Splash';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { navigationRef, routeNameRef, } from './RootNavigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#69C779' }}
      text1Style={{
        fontSize: 12,
        fontFamily: fonts.primaryMedium,
        marginLeft: -10,
      }}
      text1NumberOfLines={3}
      text2Style={{
        fontSize: 12,
        fontFamily: fonts.primaryMedium,
        marginLeft: -10,
      }}
      autoHide={false}
      onPress={() => Toast.hide()}
      renderLeadingIcon={() => <AntDesign style={[styles.toastIconStyles, { color: '#69C779', paddingLeft: 10, }]} name={'checkcircleo'} />}
      renderTrailingIcon={() => <MaterialIcons style={[styles.toastIconStyles, { color: '#FE6301', paddingRight: 10, }]} name={'cancel'} />}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 12,
        fontFamily: fonts.primaryMedium,
        marginLeft: -10,
      }}
      text1NumberOfLines={3}
      text2Style={{
        fontSize: 12,
        fontFamily: fonts.primaryMedium,
        marginLeft: -10,
      }}
      autoHide={false}
      onPress={() => Toast.hide()}
      renderLeadingIcon={() => <AntDesign style={[styles.toastIconStyles, { color: '#FE6301', paddingLeft: 10, }]} name={'warning'} />}
      renderTrailingIcon={() => <MaterialIcons style={[styles.toastIconStyles, { color: '#FE6301', paddingRight: 10, }]} name={'cancel'} />}
    />
  ),
};

LogBox.ignoreLogs(['Warning: ViewPropTypes']);

class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    appReady: false,
    restartAllowed: true,
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({ appReady: true });
    }, 2000);
  }

  render() {

    if (!this.state.appReady) {
      return (
        <Splash />
      );
    }

    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef?.current;
            const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName) {
              // await analytics().logScreenView({
              //   screen_name: currentRouteName,
              //   screen_class: currentRouteName,
              // });
            }
            routeNameRef.current = currentRouteName;
          }}>
          <PersistGate
            loading={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <View style={styles.container}>
                <ActivityIndicator color={colors.red} />
              </View>
            }
            persistor={persistor}
          >
            <AppView />
          </PersistGate>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  toastIconStyles: {
    fontSize: 24,
    alignSelf: 'center',
  }
});

export default App;