import React from 'react';
import {Text, View, FlatList} from 'react-native';
import Section from '..//Section';
import styles, {Title} from '../styles';

const CustomList = ({
  title,
  data,
  initialNumToRender,
  emptyLabel,
  renderItem,
  customSectionStyle = {},
  padded,
  titleStyles,
}) => {
  return (
    <Section padded={padded} style={{backgroundColor: 'transparent', ...customSectionStyle}}>
      <View style={styles.titleContainer}>
        <Title style={titleStyles}>{title}</Title>
      </View>
      <FlatList
        horizontal={true}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        data={data.length > 0 && data[0] != undefined ? data : []}
        ListFooterComponent={<View style={styles.endPadding} />}
        initialNumToRender={initialNumToRender || 1}
        removeClippedSubviews={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text h4>{`No ${emptyLabel} Data`}</Text>
          </View>
        )}
        renderItem={renderItem}
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
      />
    </Section>
  );
};

export default CustomList;
