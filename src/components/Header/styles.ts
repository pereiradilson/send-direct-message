import styled from 'styled-components/native';

import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 20px;
  background: #128c7e;
  border-bottom-width: 1px;
  border-color: #128c7e;
  padding-top: 44px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 100px;
`;

export const Title = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 20px;
  color: #fff;
`;

export const Button = styled(BorderlessButton)``;

export const Empty = styled.View``;

export const HeaderImage = styled.Image``;
