import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob'
import env from '../../env.config';
function Banner() {
    // console.log(env)
    return (
        <BannerAd
            // unitId={TestIds.BANNER}
            unitId={env.admob.bannerId}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
                console.log('Advert loaded');
            }}
            onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);
            }}
        />
    )
}

export default Banner;