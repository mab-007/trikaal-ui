import React, {  useEffect } from 'react'
import {  SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AddNewAddress from "./AddNewAddress";
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavFavourities from "../components/NavFavourities";
import { useDispatch, useSelector } from 'react-redux';
import {  selectPreviousScreen, selectUserProfile } from '../slices/navSlice';

//Need to work on the search bar opitons and take info from urbancompany
// TODO: Replace the Good Morning and fetch it from backend
const NavigateCard = (props) => {

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const previousScreen = useSelector(selectPreviousScreen);
    const origin_screen_name = route.params?.origin_screen_name?.toString() || props.param1?.toString();
    const service_title = route.params?.service_title;
    const userProfile = useSelector(selectUserProfile);


    let handleOnPress = () => {
        // dispatch(setCurrentScreen({
        //     screenName: screen_name
        // }));
        console.log(origin_screen_name);
        //console.log(service_title);
        // navigation.navigate("ServiceOptionsCard")
    }

    useEffect(() => {
        console.log(origin_screen_name);
    })



    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <View style={tw``}>
                <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style={tw`absolute top-3 left-5 p-3 rounded-full z-10`}
                >
                    <Icon 
                        name="chevron-left"
                        type="fontawesome"
                    />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text>
            </View>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <AddNewAddress param1= {origin_screen_name === 'dailyPass' ? 'dailyPass' : 'ServiceScreen'} />
                </View>
                <NavFavourities param1={origin_screen_name === 'dailyPass' ? 'dailyPass' : 'ServiceScreen'}/>
            </View>
            {/* <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity 
                    onPress={() => handleOnPress()}
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="car" type="font-awesome" color="black" size={16} />
                    <Text syle={tw`bg-white text-center`}>Cars</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="bicycle-outline" type="ionicon" color="black" size={16} />
                    <Text syle={tw`text-center`}>Bikes</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    );

}

export default NavigateCard;
