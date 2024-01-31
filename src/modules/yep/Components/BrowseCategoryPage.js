import React from 'react';
import { ActivityIndicator, View, } from 'react-native';
import CategoryCard from './CategoryCard';
import styles from '../styles';
import CustomList from '../CustomList';

const BrowseCategoryPage = ({ title, categories, categoriesLoading, onSelectCategory}) => {
  return (
    <View style={{width: '100%',marginTop: 20}}>
      <CustomList
        title={title}
        data={Object.values(categories)}
        initialNumToRender={10}
        emptyLabel={"Category"}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CategoryCard
              item={item}
              onPress={() => {
                onSelectCategory(item);
              }}
            />
          </View>
        )}
        padded={true}
      />
    </View>
  );
}

export default BrowseCategoryPage;
