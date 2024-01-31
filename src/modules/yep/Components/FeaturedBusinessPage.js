import React, {useState} from "react";
import { ActivityIndicator, View, Dimensions, ScrollView } from "react-native";
import CustomList from "../CustomList";
import styles from '../styles';
import FeaturedBusinessCard from "./FeaturedBusinessCard";
import {navigate} from "../../../../RootNavigation"
import Modal from 'react-native-modal';
// import FavouriteModal from 'App/Modules/Favourites/components/FavouriteModal';
import { connect } from "react-redux";

const {height}= Dimensions.get('screen');

const FeaturedBusinessPage = ({ featuredBusiness, isLoggedIn, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  return (
    <>
    <CustomList
      title={"Featured businesses"}
      data={featuredBusiness}
      initialNumToRender={1}
      emptyLabel={"Featured businesses"}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <FeaturedBusinessCard
            item={item}
            // onPress={() => {navigate('Storefront', {storefront: item}) }}
            handleFav={(id)=>{
              setShowModal(true);
              if(!isLoggedIn) {
                navigation.navigate('Authentication',{screen:"AuthLanding"});
              }
              setCurrentId(id);
            }}
          />
        </View>
      )}
      padded={true}
    />
    <Modal
      statusBarTranslucent={true}
      propagateSwipe={true}
      animationInTiming={350}
      backdropOpacity={0.5}
      useNativeDriver={true}
      deviceHeight={height}
      isVisible={isLoggedIn && showModal}
      style={styles.modalContainer}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* <FavouriteModal
          storeId={currentId}
          handleClose={()=>{
            setShowModal(false);
            setCurrentId(null);
          }}
        /> */}
      </ScrollView>
    </Modal>
  </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.session.securityToken,
  };
};

export default connect(mapStateToProps)(FeaturedBusinessPage);