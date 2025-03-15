import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import NavFavourities from "../components/NavFavourities";
import { SafeAreaView } from 'react-native-safe-area-context';
import AddressForm from './AddressForm';
import GobackHeaderCard from './GobackHeaderCard';

const SavedAdressOption = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <GobackHeaderCard  param2='true' param1='Addresses' />
            <View>
                <NavFavourities param1='addressList' />
            </View>
            <View style={tw`flex-1 justify-end mb-1`}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate(AddressForm)}
                    style={tw`flex flex-row px-4 py-3 rounded-full bg-gray-100 border-gray-900 py-3 m-3`}
                >
                    <Icon
                        name="add-outline"
                        type="ionicon"
                        color="black"
                        size={30}
                    />
                    <Text style={tw`text-center  text-xl ml-5 tracking-wide`}>Add new address</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

export default SavedAdressOption;