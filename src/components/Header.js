import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../styles';

const Header = (props) => {
  const {
    data,
    icon,
    rightIcon,
    getDashboardData,
    selectedServiceId,
  } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigation = useNavigation();

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  let selectedProduct = data.find(o => o.serviceId == selectedServiceId) || data[0];

  return (
    <View style={styles.header}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <View style={{ flex: 0.1, paddingLeft: 10, }}>{icon}</View>
        <View style={{ flex: 0.8, }}>
          {selectedProduct && (
            <TouchableOpacity>
              <Text
                style={styles.headerTitle}
                numberOfLines={1}
                ellipsizeMode='tail'>
                {selectedProduct.customName}
              </Text>
              <Text style={{ fontSize: 12, color: '#fff', fontFamily: fonts.primaryRegular }}>{selectedProduct.serviceId}</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={{ flex: 0.1, paddingLeft: 5, paddingRight: 5, }} onPress={() => { navigation.navigate('Settings') }}>{rightIcon}</TouchableOpacity>
      </View>

      {!isCollapsed && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((res, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                getDashboardData(res.serviceId);
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', opacity: res.serviceId == selectedServiceId ? 1 : 0.5, marginRight: 10 }}>
                <View style={{ marginLeft: 5, }}>{icon}</View>
                <View style={{ paddingLeft: 5, }}>
                  <Text style={{ color: '#fff', fontFamily: fonts.primaryRegular, }}>{res.customName}</Text>
                  <Text style={{ fontSize: 10, color: '#fff', fontFamily: fonts.primaryRegular, }}>{res.serviceId}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity onPress={handleCollapseToggle} style={styles.toggle}>
        {isCollapsed ? <Arrow name='keyboard-double-arrow-down' size={30} color='#fff' /> : <Arrow name='keyboard-double-arrow-up' size={30} color='#fff' />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: '#fff'
  },
  header: {
    paddingTop: 30,
    backgroundColor: '#0085c2',
  },
  toggle: {
    alignItems: 'center',
    opacity: 0.5
  }
})
