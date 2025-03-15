import { Icon } from "@rneui/base";
import {  View, Linking, Clipboard, Platform } from "react-native";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import tw from 'twrnc';
import GobackHeaderCard from "../components/GobackHeaderCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHelpAndSupportData, selectUserProfile } from "../slices/navSlice";
import helpSupportService from "../service/help&Support.service";
import { Dimensions, useWindowDimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import ScreenConfigService from '../service/screenConfig';
import { FlatList } from "react-native-gesture-handler";


let screenConfig = {
    data : [
        {
            id: 1,
            title:'Call Us',
            icon:'call-outline',
            description:'Our team is on the line Mon-Sun'
        },
        {
            id:2,
            title:'Whatsapp us',
            icon:'logo-whatsapp',
            description:'Our team is online Mon-Sun',
        }
    ],
    content_config : {
        title1: 'Contact Us',
        title2: `Don't hesitate to contact us whether you have a suggestion on our improvement, a complaint to discuss or an issue to solve.`
    }
}

const HelpAndSupport = () => {
    const [mountScreenConfig, setMountScreenConfig] = useState(true);
    const helpAndSupportData = useSelector(selectHelpAndSupportData);
    const userProfile = useSelector(selectUserProfile);
    const [screenConfigScreen, setScreenConfigScreen] = useState(null);
    
    fetchScreenConfigData = async () => {
        try {
            console.log('here');
            const result = await ScreenConfigService.fetchScreenConfig('help_and_support_screen');
            if(result){
                setScreenConfigScreen(result);
            }     
        } catch(err) {
            console.error(`Error in fetching screen config from backend for home screen +\n` + err);
        }
    }

    useEffect(() =>{
        console.log(screenConfigScreen);
        if(mountScreenConfig){
            fetchScreenConfigData();
            setMountScreenConfig(false);
        }
    })

    let handlePress = async (title, phoneNumber) => {
        console.log(title + ' ' + phoneNumber);
        if (title === 'Call Us') {
            console.log(`here here`);
            Clipboard.setString(phoneNumber);
            let url = '';
            console.log(url + '<--url');
            if(Platform.OS === 'ios')
                url = `tel:+91${phoneNumber}`
            if(Platform.OS === 'android')
                url = `tel:${phoneNumber}`
            console.log(url+ '<--url');
            try {
                console.log(`here`);
                Linking.openURL(url);
            } catch (error) {
                Alert.alert(
                'Error',
                'Unable to make call. Please check phone settings.'
                );
            }
            alert('Phone number copied to clipboard');
        } else if (title === 'Whatsapp us') {
            const url = `https://wa.me/${phoneNumber}?text=Hello, I need support regarding.`;
            console.log(url);
            try {
                Linking.openURL(url);
            } catch (error) {
                Alert.alert(
                    'Error',
                    'Unable to open WhatsApp. Please make sure WhatsApp is installed and try again.'
                );
            }
            // Clipboard.setString(email);
            // alert('Email copied to clipboard');
        }

        await helpSupportService.postHelpAndSupportQuery(userProfile?.user_id, title, 'ninja_app');
    };

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <GobackHeaderCard  param2='true' param1='Help & Support'/>
            <View style={tw`p-6`}>
                <Text style={tw`font-semibold text-4xl`}>{screenConfig.content_config.title1}</Text>
                <Text style={tw`text-gray-700 text-xl mr-4 mt-4`}>{screenConfig.content_config.title2}</Text>
                <View style={tw`items-center`}>
                    <FlatList 
                        data={screenConfig.data}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={({ item : { icon, title, description }}) => (
                            <TouchableOpacity
                                style= {tw`p-4 pb-8 pt-4 bg-gray-200 m-2 w-${width*0.1} h-40 mt-10 rounded-xl`}
                                onPress={() => handlePress(title, screenConfigScreen?.phoneConfig?.phone_number)}
                            >
                                <Icon 
                                    name={icon}
                                    type="ionicon"
                                    size={width*0.15}
                                    color='black'                        
                                />
                                <Text style={tw`text-center p-2`}>{description}</Text>
                            </TouchableOpacity>
                        )}
                        
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HelpAndSupport;