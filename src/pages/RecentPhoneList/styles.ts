import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;

  background: #ece5dd;
`;

export const Content = styled.SafeAreaView`
  width: ${Dimensions.get('window').width}px;
  flex: 1;
`;

export const ContainerAds = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 50px;

  justify-content: center;
  align-items: center;

  background: #000;
`;

export const ListContainer = styled.View`
  flex-direction: column;

  margin: 10px 15px;
  padding: 15px;
  border-radius: 8px;

  background: #fff;
`;

export const DataContainer = styled.View`
  margin: 0px 0px 5px 0px;
`;

export const DataContainerText = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 14px;
  color: #c1c1c1;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItemContent = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ItemContentTitle = styled.Text`
  font-family: 'Roboto_900Black';
  font-size: 14px;

  margin-left: 10px;
`;

export const ItemContentRight = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
