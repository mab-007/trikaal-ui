import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Dimensions, useWindowDimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const SuccessScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 2000); // 5000 milliseconds = 5 seconds
    }, []);

    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`h-full items-center justify-center`}>
        <Icon
          name="check-circle"
          type='material'
          color="gray"
          size={height * 0.2}
          style={tw`mb-5 bg-white rounded-full h-${height * 0.05} w-${height * 0.05}`}
        />
          <View>
            <Text style={tw`text-black text-4xl font-semibold text-center`}>Success</Text>
            <Text style={tw`text-black text-2xl p-6 w-80 font-semibold text-center`}>We will assign a cleaning ninja to you shortly!</Text>
          </View>
        </View>

      </SafeAreaView>
    )
}

export default SuccessScreen;
