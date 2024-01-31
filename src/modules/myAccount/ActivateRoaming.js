import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Circle from '../../images/circle.png';
import HeaderSection from "../../components/HeaderSection";
import PrimaryButton from "../../components/PrimaryButton";
import { fonts } from "../../styles";

const roamingData = [
  {
    title: `Activate\nRoaming/International`,
    msg: 'You should get confirmation from Telkom either via SMS/Call/Email',
    process: [
      {
        step: 'Open the SIM Menu/SIM application on your mobile'
      },
      {
        step: 'Select "International Roaming"'
      },
      {
        step: 'Select "Via Partners"'
      },
      {
        step: 'Restart the mobile'
      },
      {
        step: "Mobile will connect to one of the country's networks"
      },
    ],
    clickers: [
      {
        text: 'CLICK HERE to access a Roaming Pocket guide to take control of your roaming costs'
      },
      {
        text: 'CLICK HERE to get more roaming related questions answered'
      },
    ]
  },
]

const InternationalRoaming = ({ navigation }) => {
  return (
    <View style={{ flex: 1, }}>
      <ScrollView>

        <HeaderSection />
        {roamingData.map((data, i) => {
          return (
            <View style={styles.container} key={i}>
              <Text style={styles.headerText}>{data.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Circle} style={styles.img} />
                <Text style={styles.msgText}>{data.msg}</Text>
              </View>
              <View style={{ marginTop: 30, marginBottom: 10 }}>
                <Text style={styles.msgText}>{'In the new country'}</Text>
                {data.process.map((res, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                    <Image source={Circle} style={styles.img} />
                    <Text style={styles.msgText}>{res.step}</Text>
                  </View>
                ))}
                {data.clickers.map((action, i) => (
                  <View key={i}>
                    <Text style={styles.msgText}>
                      <TouchableOpacity>
                        <Text style={[styles.msgText, { textDecorationLine: action.text.includes('CLICK HERE') ? 'underline' : 'none' }]}>
                          CLICK HERE
                        </Text>
                      </TouchableOpacity>
                      {action.text.substring('CLICK HERE'.length)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )
        })}
      </ScrollView>
      <PrimaryButton
        title={'Back'}
        navigation={() => navigation.goBack()}
      />
    </View>
  )
}
export default InternationalRoaming

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontFamily: fonts.primaryBold,
    color: '#0083c2',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  container: {
    paddingHorizontal: 30,
  },
  img: {
    width: 10,
    height: 10,
  },
  msgText: {
    marginLeft: 10,
    color: '#0083c2',
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
  }
})