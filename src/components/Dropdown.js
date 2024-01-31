import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { View, Text, TouchableOpacity, TouchableHighlight, } from 'react-native';

import { colors, fonts } from '../styles';

class RNSDropDown extends React.Component {
  static defaultProps = {
    placeholder: 'Please Select...',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({ isOpened: true });
  };

  _closeModal = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      borderColor,
      selectedIndex,
      placeholder,
      leftIcon,
      dropdownStyle = {},
      customValue = '',
      dropdownLabelStyle = {},
      disabled = false,
    } = this.props;
    return (
      <ModalDropdown
        options={items}
        onDropdownWillShow={this._openModal}
        onDropdownWillHide={this._closeModal}
        disabled={disabled}
        dropdownStyle={[{
          shadowColor: '#000000',
          margin: 10,
          marginTop: -30,
          marginLeft: 12,
          marginRight: 12,
          elevation: 5,
          borderRadius: 5,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
        }, dropdownStyle]}
        adjustFrame={params => {
          // eslint-disable-next-line no-param-reassign
          params.left = 0;
          // eslint-disable-next-line no-param-reassign
          params.right = 0;
          return params;
        }}
        renderRow={text => (
          <View
            underlayColor={'102e6a'}
            onPress={onSelect}
            style={{ padding: 10, backgroundColor: '#FFF', flexDirection: 'row', }}>
            <Text numberOfLines={2} style={[{ flex: 1, color, fontFamily: fonts.primaryRegular, fontSize: 16, textTransform: 'capitalize', }, dropdownLabelStyle]}>{text.name}</Text>
            {(selectedIndex > -1 && items[selectedIndex].name == text.name) ?
              <AntDesign
                name={'check'}
                size={16}
                style={{ color: '#102e6a' }}
              />
              :
              null}
          </View>
        )}
        onSelect={onSelect}
      >
        <View style={[styles.container, style && style, { borderColor }]}>
          {leftIcon ? <Icon
            name={'bell-o'}
            color={color}
            size={18}
            style={{ marginRight: 15, }}
          /> : null}
          <Text numberOfLines={2} style={{ flex: 1, color: selectedIndex > -1 ? color : '#808080', fontFamily: fonts.primaryRegular, fontSize: selectedIndex > -1 ? 12 : 10, textTransform: 'capitalize', }}>
            {selectedIndex > -1 && items[selectedIndex].name
              ? customValue ? customValue : items[selectedIndex].name
              : placeholder}
          </Text>
          <Icon
            name={this.state.isOpened ? 'angle-up' : 'angle-down'}
            color={selectedIndex > -1 ? color : '#808080'}
            size={28}
            style={styles.icon}
          />
        </View>
      </ModalDropdown>
    );
  }
}

const styles = {
  container: {
    borderWidth: 2,
    borderColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
    height: 44,
    padding: 10,
    backgroundColor: '#F2F2F2',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    shadowColor: '#dddddd',
    borderWidth: 2,
  },
  icon: {
    marginLeft: 10,
  },
};

export default RNSDropDown;
