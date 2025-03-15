import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AddressForm from './AddressForm';
import addressSerivice from '../service/address.serivice';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderAddressList, selectUserProfile, setOrderAddressId } from '../slices/navSlice';
import { FlatList } from 'react-native-gesture-handler';


// Fetch this from backend

const screenConfig = {
    empty_address_list : {
        title1: `KNOCK, KNOCK! WHO'S THERE?`,
        title2: `You don't have any address saved. Saving address helps you checkout faster`
    }
}

let data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Raheja Residency, Kormangala, Banglore"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "slice Indiqube, Kormangala, Banglore"
    }
];

const NavFavourities = (props) => {

    const navigation = useNavigation();
    const [origin, setOrigin] = useState(null);
    const [mountAddressList, setMountAddressList] = useState(true);
    const userProfile = useSelector(selectUserProfile);
    const dispatch = useDispatch(selectOrderAddressList);
    const [savedAddressList, setSaveAddressList] = useState([]);

    let handleOnPress = (id) => {
        if(props.param1 === 'dailyPass' || props.param1 === 'ServiceScreen'){
            dispatch(setOrderAddressId(id));
        }
        switch(origin) {
            case 'ServiceScreen':
                setMountAddressList(true);
                return navigation.navigate('ServiceOptionsCard');
            case 'dailyPass':
                setMountAddressList(true);
                return navigation.navigate('PaymentScreen', { amount: '100', time: ' within 24hrs', origin_screen_name: 'dailyPass'});   
            default:
                setMountAddressList(true);
                return navigation.navigate('AddressForm', { origin_screen_name: 'address_list', address_id: id });;
        }

    }

    let fetchAddresList = async () => {
        try {
            const result = await addressSerivice.fetchAllAddress(userProfile.user_id);
            setSaveAddressList(result);
        } catch (err) {
            console.error(`Error in fetching address from backend \n`+err);
        }
    }


    // useFocusEffect(() => {
    //     fetchAddresList();
    // })

    useEffect(() => {
        //console.log(props.param1);
        //console.log(data);
        fetchAddresList();
        // try{
        //     if(mountAddressList) {
        //         fetchAddresList();
        //         setMountAddressList(false)
        //     }
        // } catch(e) {
        //     console.log(`Error in fetch address list \n`+e);
        //     //alert(`Some went wrong !`)
        // }

        if(props.param1){
            setOrigin(props.param1);
        }
    })

    return (
        <SafeAreaView >
            <Text style={tw`flex-row items-center bg-white p-3 font-semibold text-lg ml-2`}>SAVED ADDRESS</Text>
            <View style={tw``}>
            <FlatList 
                data={savedAddressList}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => {
                    <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
                }}
                renderItem={({ item: { location, destination, icon, id } }) => (
                    <TouchableOpacity 
                        onPress={() => handleOnPress(id)}
                        style={tw`flex-row items-center p-5`}
                    >
                        <Icon 
                            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                            name={icon}
                            type="ionicon"
                            color="black"
                            size={18}
                        />
                        <View>
                            <Text style={tw`font-semibold text-lg`}>{location}</Text>
                            <Text style={tw`text-gray-500`}>{destination}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={tw`justify-center items-center`}>
                        <Text style={tw`text-gray-600 text-center font-semibold text-xl`}>{screenConfig?.empty_address_list?.title1}</Text>
                        <Text style={tw`text-gray-600 text-center`}>{screenConfig?.empty_address_list?.title2}</Text>
                    </View>
                )}
            />
            </View>
        </SafeAreaView>
    );

}

export default NavFavourities;
