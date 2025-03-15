import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectFeatureFlags, setCurrentScreen } from '../slices/navSlice';
import PassCardDetails from './PassCardNavigation';
import DailyPassCard from './DailyPassCard';
import ScreenConfigService from '../service/screenConfig';

//p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 h-60 rounded-xl

let screenConfig = {
    daily_pass : {
        title1: 'Daily Pass',
        title2: 'A comprehensive cleaning with wash, glass and interior cleaning',
        icon:'ticket-outline',
        iconType:'ionicon',
        iconColor:'black'
    }
}

const PassCard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const screen_name = "dailyPass";
    const featureFlag = useSelector(selectFeatureFlags);
    const [mountScreenConfig, setMountScreenConfig] = useState(true);

    let handleOnPress = () => {
        // add a logic of feature flag
        if(featureFlag?.daily_pass?.multipleOptionsView?.flag){
            navigation.navigate(DailyPassCard)
        } else {
            navigation.navigate(PassCardDetails, {origin_screen_name: 'DailyPass'});
        }
        
    }

    fetchScreenConfig = () => {
        try {
            //const result = await 
        } catch(err) {

        }
    }

    useEffect(() => {
        if(mountScreenConfig){
            // let updateScreenConfig = ScreenConfigService.fetchPassCardConfig('pass_card');
            // screenConfig = updateScreenConfig || screenConfig;
            // console.log(screenConfig);
            // setMountScreenConfig(false)
        }
    })

    return (
      <View>
            <TouchableOpacity
                onPress={() => handleOnPress()}
                style={tw`justify-center  m-7 bg-gray-200 p-2 rounded-xl`}
            >
                <View style={tw`bg-gray-200 rounded-md m-2 flex-row items-center`}>
                        <Icon 
                            style={tw`mr-2 `}
                            name={screenConfig?.daily_pass?.icon}
                            type={screenConfig?.daily_pass?.iconType}
                            size={44}
                            color={screenConfig?.daily_pass?.iconColor}
                        />
                        <View style={tw`flex-shrink`}>
                            <Text style={tw`font-bold text-xl`}>{screenConfig.daily_pass.title1}</Text>
                            <Text style={tw`mt-2`}>{screenConfig.daily_pass.title2}</Text>
                        </View>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4 mb-8`}
                            name="arrowright"
                            color="white"
                            type='antdesign'
                        />
                </View>
            </TouchableOpacity>
      </View>
    );
}

export default PassCard;
