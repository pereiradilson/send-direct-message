import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;

  background: #128c7e;

  padding-top: 20px;
`;

export const Header = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 140px;

  padding: 0px 20px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderImage = styled.Image``;

export const Content = styled.ScrollView`
  width: ${Dimensions.get('window').width}px;
  flex: 1;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  padding-top: 15px;

  background: #ece5dd;
`;

export const ContentText = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 20px;
  margin: 5px 15px;
  color: #000;
`;

export const Footer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 70px;

  padding: 0px 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #128c7e;
`;

export const Button = styled(RectButton)`
  width: 70px;
  height: 40px;

  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background: #fff;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_900Black';
  color: #fff;
`;

export const ContainerAds = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 50px;

  justify-content: center;
  align-items: center;

  background: #000;
`;

export const SelectPicker = styled.View`
  height: 54px;
  background: #fff;
  border-radius: 8px;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 10px;

  margin-left: 15px;
  margin-right: 15px;
`;

export const NextButton = styled(RectButton)`
  background: #128c7e;
  border-radius: 8px;
  height: 56px;
  margin-top: 10px;
  margin-bottom: 30px;

  margin-left: 15px;
  margin-right: 15px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NextButtonText = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 20px;
  color: #fff;
  margin-left: 5px;
`;

export const BannerMessage = styled.View`
  justify-content: center;
  align-items: center;

  margin: 5px 15px 20px 15px;
  padding: 15px;
  border: 1px solid #e1f0c4;

  background: #e1f0c4;
  border-radius: 15px;
`;

export const BannerMessageText = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 20px;
  text-align: center;
`;
