import React from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/base';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setCurrentScreen } from '../slices/navSlice';
import { FlatList } from 'react-native-gesture-handler';

const actionData = [
    {
        id: "1",
        icon: "person",
        title: "Edit Profile",
        screenName: "Profile"
    },
    {
        id: "2",
        icon: "home",
        title: "Saved Address",
        screenName: "AddressScreen"
    },
    {
        id: "3",
        icon: "search",
        title: "Activity",
        screenName: "ActivityCard"
    },
    {
        id: "4",
        icon: "star",
        title: "Refer & Earn",
        screenName: "ReferAndEarn"
    },
    {
        id: "5",
        icon: "support-agent",
        title: "Help & Support",
        screenName: "HelpAndSupportScreen"
    },
    {
        id: "6",
        icon: "logout",
        title: "logout",
        screenName: "LogoutScreen"
    },

]

const ProfileCard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const screen_name = "profileScreen";

    let handleOnPress = (screenName1) => {
        dispatch(setCurrentScreen({
            screenName: screen_name
        }))   
        navigation.navigate(screenName1)
    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
           <FlatList 
                data={actionData}
                keyExtractor={(item) => item.id}
                renderItem={({ item: {icon, title, screenName} }) => (
                    <TouchableOpacity 
                        style={tw`flex-row items-center p-5 pb-4`}
                        onPress={() => handleOnPress(screenName)}
                    >
                        <Icon 
                            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                            name={icon}
                            type="material"
                            color="black"
                            size={18}
                        />
                        <Text style={tw`p-2 bg-white font-semibold text-xl`}>{title}</Text>
                    </TouchableOpacity>
                )}
                
           /> 
           <View style={tw`flex-row justify-center p-4`}>
                <Text 
                    onPress={() => Linking.openURL('https://www.wheelz365.com/privacy_policy')}
                    style={tw`text-black text-sm`
                }>
                    Privacy Policy 1.0
                </Text>
                <Text style={tw`text-gray-600 text-sm`}> | </Text>
                <Text 
                    onPress={() => Linking.openURL('https://www.wheelz365.com/terms_and_conditions')}
                    style={tw`text-black text-sm`
                }>
                    Terms & Condition
                </Text>
            </View>
        </SafeAreaView>
    );

}

export default ProfileCard;
