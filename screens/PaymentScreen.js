import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import GobackHeaderCard from '../components/GobackHeaderCard';
import { Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectOrderAddressId, selectUserProfile } from '../slices/navSlice';
import activityService from '../service/activity.service';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const PaymentScreen = () => {

    const navigation = useNavigation()
    const route = useRoute();
    const amount = route.params?.amount || 'XX';
    const time = route.params?.time || '';
    const origin_screen_name = route.params?.origin_screen_name;
    const userProfile = useSelector(selectUserProfile);
    const orderAddressId = useSelector(selectOrderAddressId);


    let createActivity = async () => {
        try {
            const obj = {
                user_id : userProfile.user_id,
                plan_id: "Daily-Pass-Default",
                date_of_purchase: new Date(),
                plan_start_date: new Date(),
                plan_type: 'Daily',
                address_id: orderAddressId
            }
            const result = await activityService.createActivity(obj);
            if(!result)
                throw new Error(`Error in creating order`);
            navigation.navigate('PendingScreen');
        }catch(e) {
            console.error(`Some thing went wrong !\n` + e);
            alert(`Some thing went wrong !`);
        }
    }

    let handleOnPress = () => {
      //move to pending screen
      createActivity();
      // if(origin_screen_name === 'dailyPass'){
      //   createActivity();
      // }

    }

    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <GobackHeaderCard  param2='true' param1='Payment Screen'/>
        <Image 
          source={require('../assets/payment-qr.png')}
          style={tw`justify-center h-${height * 0.10} w-${width * 0.25}`}
        />
        <Text style={tw`p-5 text-2xl text-center text-gray-700`}>We're currently setting up our online payment system. In the meantime, please use the QR code below to make a payment of 
          ₹<Text style={tw`text-3xl font-semibold`}>{amount}</Text>{time}.
        </Text>
        <TouchableOpacity 
          onPress={() => handleOnPress()}
          style={tw`p-6 border bg-gray-700 rounded-xl flex-row px-4 m-3 p-4 mr-4 justify-center`}
        >
          <Text style={tw`text-white text-xl`}>Confirm</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
}

export default PaymentScreen;
