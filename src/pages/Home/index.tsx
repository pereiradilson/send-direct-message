import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

import Input from '../../components/Input';
import Ads from '../../components/Ads';
import countries from '../../utils/countries';

import imageLogo from '../../../assets/icon_header.png';

import {
  Container,
  Header,
  HeaderImage,
  Content,
  ContentText,
  Footer,
  Button,
  ContainerAds,
  SelectPicker,
  NextButton,
  NextButtonText,
  BannerMessage,
  BannerMessageText,
} from './styles';

interface WhatsAppFormData {
  phoneNumber: string;
  message: string;
}

interface PhoneProps {
  id: string;
  phone: string;
  date: Date;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const [country, setCountry] = useState('+93');
  const [listRecentPhones, setListRecentPhones] = useState<PhoneProps[]>([]);

  useEffect(() => {
    async function getLastCountry(): Promise<void> {
      const lastCountryCode = await AsyncStorage.getItem('country_code');

      if (lastCountryCode !== null) {
        setCountry(lastCountryCode);
      }
    }

    getLastCountry();
  }, []);

  useEffect(() => {
    async function getListRecentPhones(): Promise<void> {
      const lastPhones = await AsyncStorage.getItem('list_recent_phones');

      if (lastPhones !== null) {
        const phones = JSON.parse(lastPhones);

        setListRecentPhones(phones);
      }
    }

    getListRecentPhones();
  }, [listRecentPhones]);

  const selectChangeCountry = useCallback(
    async (data: React.ReactText) => {
      try {
        await AsyncStorage.setItem('country_code', String(data));

        setCountry(String(data));
      } catch (e) {
        Alert.alert(t(''));
      }
    },
    [t],
  );

  const handleNavigateToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const handleNavigateToPhoneList = useCallback(() => {
    navigation.navigate('RecentPhoneList');
  }, [navigation]);

  const handleSubmit = useCallback(
    async (data: WhatsAppFormData) => {
      try {
        formRef.current?.setErrors({});

        let phoneNumber = '';

        if (data.phoneNumber === '') {
          Alert.alert(t('checkPhoneNumber'));
          return;
        }

        phoneNumber = `${country.trim()}${data.phoneNumber.trim()}`;

        if (data.message) {
          phoneNumber = `${phoneNumber}&text=${data.message.trim()}`;
        }

        const uuid = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          Math.random().toString(),
        );

        listRecentPhones.push({
          id: uuid,
          phone: `${country.trim()}${data.phoneNumber.trim()}`,
          date: new Date(),
        });

        await AsyncStorage.setItem(
          'list_recent_phones',
          JSON.stringify(listRecentPhones),
        );

        Linking.openURL(`whatsapp://send?phone=${phoneNumber}`)
          .catch(() => {
            Alert.alert(t('whatsappNotInstalled'));
          })
          .finally(() => {
            formRef.current?.reset();
            formRef.current?.setFieldValue('phoneNumber', '');
            formRef.current?.setFieldValue('message', '');
          });
      } catch {
        formRef.current?.reset();
        formRef.current?.setFieldValue('phoneNumber', '');
        formRef.current?.setFieldValue('message', '');

        Alert.alert(t('messageErrorSubmit'));
      }
    },
    [country, t, listRecentPhones],
  );

  return (
    <Container>
      <Header>
        <HeaderImage source={imageLogo} resizeMode="contain" />
      </Header>
      <Content>
        <BannerMessage style={{ elevation: 5 }}>
          <BannerMessageText numberOfLines={3}>
            {t('headerMessage')}
          </BannerMessageText>
        </BannerMessage>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <ContentText>{t('selectCountry')}</ContentText>
          <SelectPicker style={{ elevation: 5 }}>
            <Picker
              selectedValue={country}
              onValueChange={selectChangeCountry}
              mode="dialog"
            >
              {countries.map(value => {
                return (
                  <Picker.Item
                    key={value.code}
                    label={value.name}
                    value={String(value.dial_code)}
                  />
                );
              })}
            </Picker>
          </SelectPicker>

          <ContentText>{t('phoneNumber')}</ContentText>
          <Input
            name="phoneNumber"
            keyboardType="phone-pad"
            placeholder={t('phoneNumberPlaceHolder')}
            style={{ elevation: 5, fontFamily: 'Roboto_400Regular' }}
          />

          <ContentText>{t('inputMessage')}</ContentText>
          <Input
            name="message"
            style={{
              elevation: 5,
              fontFamily: 'Roboto_400Regular',
            }}
            placeholder={t('inputMessagePlaceHolder')}
          />

          <NextButton
            onPress={() => formRef.current?.submitForm()}
            style={{ elevation: 5 }}
          >
            <Feather name="send" size={20} color="#fff" />
            <NextButtonText>{t('sendButton')}</NextButtonText>
          </NextButton>
        </Form>
      </Content>

      <Footer>
        <Button onPress={handleNavigateToPhoneList}>
          <Feather name="list" size={24} color="#06534A" />
        </Button>

        <Button onPress={handleNavigateToSettings}>
          <Feather name="settings" size={24} color="#06534A" />
        </Button>
      </Footer>

      <ContainerAds>
        <Ads code="google-ads-code" />
      </ContainerAds>
    </Container>
  );
};

export default Home;
