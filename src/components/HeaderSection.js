import React from "react";
import {
  Image,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { getDashboardData } from "../modules/home/home";
import Header from "./Header";
import Settings from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'


const HeaderSection = ({
  dashboardData,
  selectedServiceId,
  getDashboardData,
}) => {
  const assignedProducts = dashboardData?.balances?.assignedProducts || [];

  return (
    <View>
      <View>
        <Header
          data={assignedProducts || []}
          icon={<Entypo name='mobile' size={30} color='#fff' />}
          rightIcon={<Settings name='setting' size={30} color='#fff' />}
          selectedServiceId={selectedServiceId}
          getDashboardData={getDashboardData}
        />
      </View>
    </View>
  );
}

export default connect(
  state => {
    return {
      dashboardData: state.home.dashboardData,
      selectedServiceId: state.home.selectedServiceId,
    }
  }, {
  getDashboardData,
}
)(HeaderSection);