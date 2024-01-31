import styled from "styled-components";

export const HeaderTitle = styled.Text`
  font-family: Gordita-Bold;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -1px;
  text-align: left;
  padding-left: 10px;
  ${props => props.style}
  ${Platform.OS == "ios" ? "padding-top: 10px" : ""}
`