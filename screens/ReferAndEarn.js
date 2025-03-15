import { Icon } from '@rneui/base';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import GobackHeaderCard from '../components/GobackHeaderCard';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../slices/navSlice';

//TODO: Add functionality of copy here
const ReferAndEarn = () => {
    const userProfile = useSelector(selectUserProfile);

    const code = userProfile?.refferal_code || "&Wheelz365";
    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <GobackHeaderCard  param2='true' param1='Refer & Earn'/>
        <View style={tw`p-4 bg-white h-full justify-center`}>
          <Text style={tw`text-center font-bold p-12 text-4xl tracking-widest`}>Invite & Earn upto ₹ 100</Text>
          <Text style={tw`p-12 text-gray-400 font-semibold text-xl tracking-wide text-center`}>Invite friends and get upto ₹100 each when they complete booking their first service</Text>

          <View style={tw`bg-white p-8 border-gray-200 rounded-lg mt-8`}>
            <TouchableOpacity 
              style={tw`flex flex-row items-center justify-between px-8 py-6 rounded-full bg-gray-100`}
            >
              <Text style={tw`text-center font-bold text-2xl tracking-wide`}>{code}</Text>
              <Icon 
                style={tw`ml-8 p-4`}
                name="copy-outline"
                type="ionicon"
                color="gray"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
}

export default ReferAndEarn;
