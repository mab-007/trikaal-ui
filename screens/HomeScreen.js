import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import NavOptions from "../components/NavOptions";
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import PassCard from "../components/PassCard";
import ActivityListCard from '../components/ActivitiesListCard';
import ScreenConfigService from '../service/screenConfig';
import { StatusBar } from 'expo-status-bar';

//TODO: Backend

let screenConfig = {
    nav_options: {
        card_title_name: 'Car Wash',
        bike_title_name: 'Bike Wash'
    }
}


const data = [
    {
        id: "123",
        title: screenConfig.nav_options.card_title_name,
        image: require("../assets/uber_car.webp"),
        screen: 'ServiceScreen'
    },
    {
        id: "456",
        title: screenConfig.nav_options.bike_title_name,
        image: require("../assets/motor-min.png"),
        screen: 'ServiceScreen'
    }
];

// Check if to change design of logo
const HomeScreen = () => {
    const navigation = useNavigation();
    const [mountScreenConfig,setMountScreenConfig] = useState(true);
    
    fetchScreenConfig = async () => {
        try {
            const result = await ScreenConfigService.fetchScreenConfig('home_screen_customer_app');
            if(result){
                screenConfig = result.data;
            }     
        } catch(err) {
            console.error(`Error in fetching screen config from backend for home screen +\n` + err);
        }
    }

    useEffect(() => {
        // Revisit on this as if you put setMountScreenConfig in try it might stuck in loop
        if(mountScreenConfig) {
            fetchScreenConfig();
            setMountScreenConfig(false);
        }
    })

    return (
        <SafeAreaView style={tw`bg-white flex-1 h-full`}>
            <View style={tw`flex p-5 flex-row items-center h-1/10`}>
                <Text style={tw`rounded bg-white text-2xl font-bold`}>WHEELZ 365</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("ProfileScreen")}
                    style={tw`bg-gray-100 absolute right-6 z-50 p-3 rounded-full shadow rounded-full shadow-lg`}
                >
                    <Icon name="menu"/>
                </TouchableOpacity>
            </View>
            <View style={tw`h-9/10`}>
                <NavOptions param1='HomeScreen' param2={data} />
                <PassCard />
                <ActivityListCard param1='HomeScreen' param2='enableArrow' style={tw`flex-grow`}/>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;