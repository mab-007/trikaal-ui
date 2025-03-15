import React from 'react'
import {   TouchableOpacity, View } from 'react-native'
import Service from "../components/service"
import tw from 'twrnc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from "../components/NavigateCard";
import ServiceOptionsCard from "../components/ServiceOptionsCard";
import { Icon } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



const ServiceScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const route = useRoute();
    const title = route.params?.title;
    const origin_screen_name = route.params?.origin_screen_name;

    

    return (
        <SafeAreaView style={tw`bg-white h-full`}>

            <View style={tw`h-1/3 bg-white`}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("ProfileScreen")}
                    style={tw`bg-gray-100 absolute right-6 z-50 p-3 rounded-full shadow rounded-full shadow-lg`}
                >
                    <Icon name="menu"/>
                </TouchableOpacity>
                <Service param1={title}/>
            </View>

            <View style={tw`h-2/3`}>
               <Stack.Navigator>
                <Stack.Screen 
                    name="NavigateCard"
                    component={NavigateCard}
                    initialParams={{service_title : route.params?.title, origin_screen_name : 'ServiceScreen'}}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="ServiceOptionsCard"
                    component={ServiceOptionsCard}
                    initialParams={{service_title : route.params?.title, origin_screen_name : 'ServiceScreen'}}
                    options={{
                        headerShown: false
                    }}
                />
               </Stack.Navigator>
            </View>
        </SafeAreaView>
    );
}

export default ServiceScreen;
