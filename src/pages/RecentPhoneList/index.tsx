import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';

import Ads from '../../components/Ads';

import {
  Container,
  Content,
  ListContainer,
  DataContainer,
  DataContainerText,
  ItemContainer,
  ItemContent,
  ItemContentTitle,
  ItemContentRight,
  ContainerAds,
} from './styles';

interface ItemProps {
  id: string;
  phone: string;
  date: number;
}

const RecentPhoneList: React.FC = () => {
  const { t } = useTranslation();

  const [listRecentPhones, setListRecentPhones] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function getListRecentPhones(): Promise<void> {
      const lastPhones = await AsyncStorage.getItem('list_recent_phones');

      if (lastPhones !== null) {
        const phones = JSON.parse(lastPhones);

        setListRecentPhones(phones);
      }
    }

    getListRecentPhones();
  }, []);

  const handleRemovePhoneOfList = useCallback(
    async data => {
      const listPhoneIndex = listRecentPhones.findIndex(
        item => item.id === data,
      );

      listRecentPhones.splice(listPhoneIndex, 1);

      await AsyncStorage.setItem(
        'list_recent_phones',
        JSON.stringify(listRecentPhones),
      );

      setListRecentPhones([...listRecentPhones]);
    },
    [listRecentPhones],
  );

  const handleToWhatsApp = useCallback(
    (data: string) => {
      try {
        Linking.openURL(`whatsapp://send?phone=${data}`).catch(() => {
          Alert.alert(t('whatsappNotInstalled'));
        });
      } catch {
        Alert.alert(t('messageErrorSubmit'));
      }
    },
    [t],
  );

  return (
    <Container>
      <Content>
        <FlatList
          data={listRecentPhones}
          renderItem={({ item }) => {
            const date = format(new Date(item.date), t('formatDate'));

            return (
              <ListContainer key={item.id}>
                <DataContainer>
                  <DataContainerText>{date}</DataContainerText>
                </DataContainer>

                <ItemContainer>
                  <ItemContent onPress={() => handleToWhatsApp(item.phone)}>
                    <Feather name="phone" size={20} color="#000" />
                    <ItemContentTitle>{item.phone}</ItemContentTitle>
                  </ItemContent>

                  <ItemContentRight
                    onPress={() => handleRemovePhoneOfList(item.id)}
                  >
                    <Feather name="trash-2" size={20} color="#000" />
                  </ItemContentRight>
                </ItemContainer>
              </ListContainer>
            );
          }}
          keyExtractor={item => item.id}
        />
      </Content>

      <ContainerAds>
        <Ads code="google-ads-code" />
      </ContainerAds>
    </Container>
  );
};

export default RecentPhoneList;
