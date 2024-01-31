import React from 'react';
import { Image, View, Text, ActivityIndicator, } from 'react-native';
import styles, { ItemWrapper, ItemContainer, ItemName, SuggestionTitle, ItemNameBold } from './styles';
import { formatSuggestion } from '../../../utils/validate';

const Keyword = ({ onPress, word, enteredWord, termPrefix, textColor }) => {
  const formattedText = formatSuggestion(enteredWord, word);
  return (
    <ItemWrapper
      underlayColor="transparent"
      onPress={() => {
        onPress(word);
      }}
    >
      <ItemContainer>
        <Image source={require("../Images/recent.png")} style={{ marginRight: 15 }} />
        <ItemName
          style={[styles.itemName, textColor ? { color: textColor } : {}]}
        >
          {termPrefix ? termPrefix : ''}
          {formattedText.preFix}
          {formattedText.bold != '' ? <ItemNameBold>{formattedText.bold}</ItemNameBold> : ''}
          {formattedText.suffix}
        </ItemName>
      </ItemContainer>
    </ItemWrapper>
  );
}

const SuggestionList = (props) => {
  const {
    listTitle,
    enteredWord,
    suggestionList,
    onPressSuggestion,
    loading,
    children,
  } = props;

  const validLength = enteredWord && enteredWord.length >= 3;
  if (loading) {
    return (
      <View
        style={{
          marginVertical: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={{ marginVertical: 35, }}>
      <SuggestionTitle>{validLength ? listTitle : ''}</SuggestionTitle>
      {
        (suggestionList || []).map((word, index) => (
          <Keyword
            key={'suggesiton' + index}
            word={word}
            enteredWord={enteredWord}
            onPress={onPressSuggestion}
          />
        ))
      }
      {validLength ? (
        <Keyword
          word={enteredWord}
          termPrefix="Search For "
          textColor={'#00C1BC'}
          enteredWord={""}
          onPress={onPressSuggestion}
        />
      ) : null}

      {children}
    </View>
  )
}

export default SuggestionList;