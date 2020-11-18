import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-community/picker';

import { Alert } from 'react-native';

import Ads from '../../components/Ads';

import {
  Container,
  Content,
  ContentText,
  SelectPicker,
  ContainerAds,
} from './styles';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const languages = [
    { key: 'en', value: t('english') },
    { key: 'pt', value: t('portuguese') },
  ];

  const handleChangeLanguage = useCallback(
    data => {
      i18n.changeLanguage(data);
      setLanguage(data);

      Alert.alert(t('messageChangeLanguage'));
    },
    [i18n, t],
  );

  return (
    <Container>
      <Content>
        <ContentText>{t('language')}</ContentText>
        <SelectPicker style={{ elevation: 5 }}>
          <Picker
            selectedValue={language}
            onValueChange={handleChangeLanguage}
            mode="dialog"
          >
            {languages.map(value => {
              return (
                <Picker.Item
                  key={value.key}
                  label={value.value}
                  value={String(value.key)}
                />
              );
            })}
          </Picker>
        </SelectPicker>
      </Content>

      <ContainerAds>
        <Ads code="google-ads-code" />
      </ContainerAds>
    </Container>
  );
};

export default Settings;
