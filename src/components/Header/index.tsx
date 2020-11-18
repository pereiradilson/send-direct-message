import React, { useCallback } from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';
import { Container, Title, Button, Empty, HeaderImage } from './styles';

interface HeaderProps {
  title: string;
  backButton?: boolean;
  showCancel?: boolean;
  image?: ImageSourcePropType;
}

const Header: React.FC<HeaderProps> = ({
  title,
  backButton,
  showCancel,
  image,
}) => {
  const navigation = useNavigation();

  return (
    <Container>
      {backButton ? (
        <Button onPress={navigation.goBack}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </Button>
      ) : (
        <Empty />
      )}

      {image ? <HeaderImage source={image} /> : <Title>{title}</Title>}

      {showCancel ? (
        <Button onPress={() => {}}>
          <Feather name="info" size={24} color="#fff" />
        </Button>
      ) : (
        <Empty />
      )}
    </Container>
  );
};

export default Header;
