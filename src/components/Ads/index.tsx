import React from 'react';
import { AdMobBanner } from 'expo-ads-admob';

interface AdsProps {
  code: string;
}

const Ads: React.FC<AdsProps> = ({ code }) => {
  return <AdMobBanner bannerSize="banner" adUnitID={code} />;
};

export default Ads;
