import React from 'react';
import tw from 'twrnc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileCard from "../components/ProfileCard";
import { Icon } from '@rneui/base';
import { SafeAreaView } from 'react-native';
import GobackHeaderCard from '../components/GobackHeaderCard';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Dimensions, useWindowDimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const actionData = [
    {
        id: "1",
        icon: "home",
        title: "Edit Profile"
    },
    {
        id: "2",
        icon: "Saved Address",
        title: "Saved Address"
    },
    {
        id: "3",
        icon: "",
        title: "Activity"
    },
    {
        id: "4",
        icon: "",
        title: "logout"
    }

]


const ProfileScreen = () => {
    const Stack = createNativeStackNavigator();

    const getIconSize = () => {
        const smallestSide = Math.min(width, height);
        return smallestSide < 400 ? 40 : smallestSide < 700 ? 50 : 60; 
    };
    
    const getIconPadding = () => {
        const smallestSide = Math.min(width, height);
        return smallestSide < 400 ? 8 : smallestSide < 700 ? 12 : 16; 
    };

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <GobackHeaderCard  param2='true' param1='Home' />
            <View style={tw`h-1/3 bg-white items-center justify-center flex-shrink`}>
            <Icon 
                style={[tw`rounded-full p-${getIconPadding()}`]}
                name="person"
                type="material"
                size={getIconSize()}
            />
                <Text style={tw`text-xl font-semibold text-center`}>Profile Screen</Text>
            </View>
            <View style={tw`h-2/3`} >
               <Stack.Navigator>
                <Stack.Screen 
                    name="ProfileCard"
                    component={ProfileCard}
                    options={{
                        headerShown: false
                    }}
                />
               </Stack.Navigator>
            </View>
        </SafeAreaView>
    );

}

export default ProfileScreen;
