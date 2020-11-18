import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;

  background: #ece5dd;

  padding-top: 20px;
`;

export const Content = styled.View`
  width: ${Dimensions.get('window').width}px;
  flex: 1;
`;

export const ContentText = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 20px;
  margin: 5px 15px;
  color: #000;
`;

export const SelectPicker = styled.View`
  height: 54px;
  background: #fff;
  border-radius: 8px;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;

  margin: 0px 15px;
`;

export const ContainerAds = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 50px;

  justify-content: center;
  align-items: center;

  background: #000;
`;
