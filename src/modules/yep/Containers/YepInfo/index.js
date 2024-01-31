import React, { useState , useEffect} from 'react';
import {
  View,
  Text,
  Image,
  UIManager,
  LayoutAnimation,
  Dimensions
} from 'react-native';
import styles, {
  Title,
  Body,
  ItemBody
} from './styles';
import Checkmark from './CheckIcon';
import { Button } from 'react-native-elements';

const {width}= Dimensions.get('window');

const ListItem = ({ iconStyle, body, textStyle }) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 10 }}>
    <Checkmark style={{ marginRight: 12, ...iconStyle }} />
    <Body style={[textStyle, { flex: 1, fontSize: 14 }]}>{body}</Body>
  </View>
);

const BenifitItem = ({
  Icon,
  title,
  body,
  titleStyle = {},
  bodyStyle = {}
}) => (
  <View style={{ flexDirection: 'row', marginVertical: 15 }}>
    {Icon}
    <View style={{ flex: 1, marginLeft: 20 }}>
      <Text style={{ marginVertical: 10, ...titleStyle }}>{title}</Text>
      <ItemBody style={bodyStyle}>{body}</ItemBody>
    </View>
  </View>
);

export default (props) => {

  const {
    navigation,
    tabs,
    title
  } = props;

  useEffect(() => {
    setInfo(tabs[0]);
  },[]);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const [consumer, setConsumer] = useState(true);
  const [info, setInfo] = useState({});
  const setConsumerCard = (isConsumer) => {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      300,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.scaleXY
    ));
    setConsumer(isConsumer)
  }

  const card = consumer ? {
    text: styles.dark,
    card: styles.bgLight,
    callToAction: {
      onPress: () => navigation.navigate('BrowseVerticalCategory'),
      buttonStyle: styles.bgDark,
      titleStyle: styles.light
    }
  } : {
    text: styles.light,
    card: styles.dark,
    callToAction: {
      onPress: () => navigation.navigate('VendorPage'),
      buttonStyle: styles.bgLight,
      titleStyle: styles.dark
    }
  }

  return (
    <View style={{ paddingHorizontal: 20,marginBottom:20,marginTop:60 }}>

      <View style={[styles.cardContainer, card.card]}>

        <Image
          style={{width:width-40,height:(width)*1,borderTopLeftRadius:20,borderTopRightRadius:20 }}
          source={{uri: info?.image}}
        />

        <View style={{ padding: 20 }}>
          <View>
            <Title style={[{ fontSize: 24, marginVertical: 20, marginTop: 0, }, card.text]}>
              {title}
            </Title>
          </View>

          <View style={styles.cardActionsContainer}>
            {tabs.map((t,index)=>{
              return (
                <Body
                  key={index}
                  bold
                  style={[card.text, ((t?.title ==='For consumers' && consumer) || (t?.title ==='For business' && !consumer)) ? styles.active : {}, { paddingBottom: 2 }]}
                  onPress={() => {
                    setConsumerCard(t?.title ==='For consumers');
                    setInfo(t);
                  }}
                >
                  {t?.title || ""}
                </Body>
              )
            })}
          </View>

          <View>
            <Body bold style={[card.text, { marginBottom: 20, fontSize: 14 }]}>
              {info?.content || ""}
            </Body>
            {
              (info?.features || []).map((feature, index) => <ListItem
                key={index}
                body={feature}
                iconStyle={card.text}
                textStyle={card.text}
              />)
            }
            <View style={{ marginTop: 20 }}>
              {/* <Button {...card.callToAction} label={(info?.cta || []).length && info?.cta[0].label || ''} /> */}
            </View>
          </View>
        </View>
      </View>

    </View >
  );
}