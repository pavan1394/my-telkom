import React from 'react';
import { Text, FlatList, Image, StatusBar, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { Slider, CheckBox } from 'react-native-elements'
import styles from '../styles';

const {width}= Dimensions.get('window');

const FilterSection = ({title, children}) => (
  <View style={{marginBottom: 30}}>
    <Text
      style={{
        marginBottom: 20,
        color: '#01272F',
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'Gordita-Medium',
      }}
    >
      {title}
    </Text>
    {children}
  </View>
);

const CategoryItem = ({item: category, selectedCategory, onSelectCategory}) => {
  const selected = selectedCategory && selectedCategory.name === category.name;
  return (
    <TouchableOpacity
      style={{margin: 10, flex: 1, }}
      onPress={() => onSelectCategory(category)}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: '#01272F',
          borderStyle: 'solid',
          alignSelf: 'center',
          borderRadius: 50,
          height: 50,
          width: 50,
          marginBottom: 12,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected ? '#01272F' : 'transparent',
        }}
      >
        <Image
          source={{uri: category.iconURL}}
          style={{
            resizeMode: 'contain',
            width: 25,
            height: 25,
            ...(selected ? {tintColor: '#FFFFFF'} : {})
          }} 
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          color: '#01272F',
          paddingHorizontal: 3,
          fontFamily: 'Gordita-Medium',
          letterSpacing: -0.5,
          lineHeight: 14,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  )
}

const Tag = ({tag, onToggle, selected}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 12,
        height: 37,
        backgroundColor: selected ? '#01272F' : 'transparent',
        marginVertical: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#01272F'
      }}
      onPress={() => onToggle(tag)}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: selected ? '#FFFFFF' : '#01272F',
        }}
      >
        {tag.name}
      </Text>
    </TouchableOpacity>
  )
}

const CheckBoxFilter = ({item, onToggle, checked}) => {
  return (
    <View style={{marginBottom: 10, marginHorizontal: -5, marginTop: 0, flex: 1}}>
      <CheckBox
        checked={!!checked}
        title={item.label}
        checkedColor={"#00C1BC"}
        containerStyle={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          padding: 0,
        }}
        textStyle={[{
          fontWeight: checked ? '800' : '500',
          fontFamily: 'Gordita-Medium',
          paddingBottom: 3,
          marginLeft: 5,
        }, styles.textPadding]}
        onPress={onToggle}
      />
    </View>
  ) 
}

const FiltersPage = (props) => {

  const {
    navigation,
    onClose,
    categories,
    selectedCategory,
    categoriesLoading,
    selectedSubcategory,
    onSelectCategory,
    tags,
    toggleTag,
    isTagSelected,
    sortByFilters,
    otherFilters,
    showYellowPageHeader,
    toggleSortByFilter,
    toggleOtherFilter,
    setDistanceFilter,
    appliedSortByFilters,
    appliedOtherFilters,
    checkSortFilterApplied,
    checkOtherFilterApplied,
    showDistanceFilter,
    distance,
    onApplyFilter,
    onResetFilters,
    handleGoBack,
  } = props;

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FB', marginTop:showYellowPageHeader? 0 : 30 }}>
      <StatusBar barStyle="dark-content" backgroundColor={showYellowPageHeader? "#FFCF00" : '#F7F8FB'} />
      <View style={{ flex: 1 }}>
        <View style={{flex: 1, marginVertical:10, marginHorizontal: 13 }}>
          <View style={{ marginBottom: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap'}}>
            <Text style={{fontSize: 20, letterSpacing: -0.5, color: '#01272F', marginRight: 10, fontFamily: 'Gordita-Medium', lineHeight: 26, }}>Filter</Text>
            <TouchableOpacity
              onPress={()=>{
                handleGoBack();
              }}
            >
              <Image
                source={require("../../../../images/close.png")}
                style={{
                  resizeMode: 'contain',
                  paddingTop: 5,
                  height: width*0.05,
                  width: width*0.05,
                  marginRight: -5
                }} 
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}}>
            {/* <FilterSection title="Category">
              <FlatList
                data={categories}
                keyExtractor={category => category.name}
                renderItem={({item}) => (
                  <CategoryItem
                    item={item}
                    selectedCategory={selectedCategory}
                    onSelectCategory={onSelectCategory}
                  />
                )}
                numColumns={4}
              />
            </FilterSection> */}
            {
              tags && tags.length > 0
              ? <FilterSection title="Type of service">
                  <FlatList
                    data={tags}
                    keyExtractor={tag => tag.id}
                    renderItem={({item: tag}) => {
                      return (
                        <Tag
                          tag={tag}
                          selected={isTagSelected(tag)}
                          onToggle={toggleTag}
                        />
                      )
                    }}
                    contentContainerStyle={{
                      flexDirection : "row",
                      flexWrap : "wrap"
                    }}
                  />
                </FilterSection>
              : null
            }
            <FilterSection title="Sort By">
              <FlatList
                data={sortByFilters}
                numColumns={2}
                renderItem={({item}) => {
                  return (
                    <CheckBoxFilter
                      item={item}
                      onToggle={() => toggleSortByFilter(item)}
                      checked={checkSortFilterApplied(item)}
                    />
                  )
                }}
              />
            </FilterSection>
            {showDistanceFilter ? (
              <FilterSection title="Distance from current location">
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                  <Slider
                    value={distance || 5}
                    minimumValue={5}
                    maximumValue={20}
                    step={5}
                    thumbStyle={{
                      backgroundColor: '#00C1BC',
                    }}
                    trackStyle={{
                      borderColor: 'red',
                    }}
                    onValueChange={(value) => {
                      setDistanceFilter(value)
                    }}
                  />
                  <Text style={{ fontFamily: 'Gordita-Medium', }}>Distance: {distance || 5} Km</Text>
                </View>
              </FilterSection>
            ) : null}
            <FilterSection title="Other">
              <FlatList
                data={otherFilters}
                renderItem={({item}) => {
                  return (
                    <CheckBoxFilter
                      item={item}
                      onToggle={() => toggleOtherFilter(item)}
                      checked={checkOtherFilterApplied(item)}
                    />
                  )
                }}
              />
            </FilterSection>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            padding: 15,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              minHeight: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#01272F',
              marginRight: 15
            }}
            onPress={onResetFilters}
          >
            <Text style={[{textAlign: 'center', fontFamily: 'Gordita-Bold',color:'#01272F'},]}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              minHeight: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00C1BC',
              borderRadius: 15,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#00C1BC'
            }}
            onPress={onApplyFilter}
          >
            <Text style={[{textAlign: 'center', color: '#FFFFFF', fontFamily: 'Gordita-Bold', },]}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default FiltersPage;