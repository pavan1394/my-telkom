import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import CustomList from '../CustomList';
import styles from '../styles';
import DealsCard from './DealsCard';
import {navigate, goBack} from '../../../../RootNavigation';

const DealsPage = ({
  deals,
  dealsLoading,
  storefront,
  storeservice,
  getStoreservice,
  user,
  title,
  isPadded,
  titleStyles,
  shouldGetAQuote,
}) => {
  return (
    <CustomList
      title={title || 'Daily Deals'}
      titleStyles={titleStyles || {}}
      data={deals}
      initialNumToRender={1}
      emptyLabel={'Deals'}
      renderItem={({item}) => (
        <View style={styles.cardWrapper}>
          <DealsCard
            item={item}
            goToStore={() => {
              // navigate('Storefront', {storefront: item});
            }}
            onPress={() => {
              if(!shouldGetAQuote) return;
              if (item.ownerId === user?._id) {
                // navigate('ConfirmationPopUp', {
                //   title: "Oops, you can't do that!",
                //   label:
                //     "As long as you're logged into your Yep! account, you can't engage with your own content or shopfront. If you want to test something, log in to a different Yep! account and try again.",
                //   onPress: () => goBack(),
                //   buttonTitle: 'Got it',
                //   icon: require('../Images/notification.png'),
                // });
              } else {
                // getStoreservice(item?.service_id, services => {
                //   navigate('GetAQuoteLanding', {
                //     isDeals: true,
                //     storefront: {
                //       ...item,
                //       subcategory_id: services[0]?.subcategory_id,
                //       ...storefront,
                //     },
                //     prefilServiceType: true,
                //     services: (services).map(service => {
                //       return {
                //         ...service,
                //         id: service.service_id,
                //         name: service.title,
                //       }
                //     }),
                //   });
                // });

              }
            }} />
        </View>
      )}
      padded={isPadded}
    />
  );
};

export default DealsPage;
