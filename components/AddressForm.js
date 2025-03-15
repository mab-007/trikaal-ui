import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import ServiceOptionsCard from './ServiceOptionsCard';
import { useSelector } from 'react-redux';
import { selectFeatureFlags, selectOrderAddressId, selectUserProfile } from '../slices/navSlice';
import GobackHeaderCard from './GobackHeaderCard';
import addressSerivice from '../service/address.serivice';
import activityService from '../service/activity.service';
import { FlatList } from 'react-native-gesture-handler';

const tag = [
    {
        id: 1,
        title: "Home",
        icon: "home",
        color:"gray",
        enable: "true"
    },
    {
        id: 2,
        title: "Work",
        icon: "work",
        color:"gray",
        enable: "true"
    },
    {
        id: 3,
        title: "Friends & Faimly",
        icon: "group",
        color:"gray",
        enable: "true"
    },
    {
        id: 4,
        title: "Others",
        icon: "group",
        color:"gray",
        enable: "false"
    },
];

const regexPincode = /^\d{6}$/;
const pincodeMessage = 'Invalid Pin Code';


const AddressForm = (props) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [saveAsVisible, setSaveAsVisible] = useState(0);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [vehicleNoOrParkingNo, setVehicleNoOrParkingNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [saveAs, setSaveAs] = useState('');
  const [alternatePhoneNo, setAlternatePhoneNo] = useState('');
  const userProfile = useSelector(selectUserProfile);
  const [submmitText, setSubmmitText] = useState('Save');
  const orderAddressId = useSelector(selectOrderAddressId);



  const route = useRoute();
  const origin_screen_name = route.params?.origin_screen_name;
  const address_id = route.params?.address_id;

  const [address, setAddress] = useState({
    houseNo: null,
    apartment: null,
    saveAs: null,
    phoneNo: null,
  });

  const [carNo, setCarNo] = useState(null)
  const [inputError, setInputError] = useState(null);
  const [pincodeError, setPincodeError] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const featureFlags = useSelector(selectFeatureFlags);

  let handleSaveOnPress = (id, title) => {
    setDisableSaveButton(false);

    console.log(id);
    setSelectedId(id);
    setSelectedType(title)

  }


  let saveAddress = async (addressObj) => {
    try {
        const result = await addressSerivice.addNewAddress(userProfile.user_id,addressObj);
        if(!result) throw new Error(`Error in adding new address`);
    } catch(err) {
        console.error(`Error in saving address to db`);
        alert(`Something went wrong!, Pelase try back after some time`)
    }
  }

  let udpateAddress = async (addressObj) => {
    try {
        const result = await addressSerivice.updateAddressDetails(userProfile.user_id,addressObj);
        if(!result) throw new Error(`Error in adding new address`);
    } catch(err) {
        console.error(`Error in saving address to db`);
        alert(`Something went wrong!, Pelase try back after some time`)
    }
  }



  let createActivity = async () => {
        try {
            const obj = {
                user_id : userProfile.user_id,
                plan_id: 'Daily-Pass-Default',
                date_of_purchase: new Date(),
                plan_start_date: new Date(),
                plan_type: 'Monthly',
                address_id: orderAddressId
            }
            const result = await activityService.createActivity(obj);
            if(!result)
                throw new Error(`Error in creating order`);
        }catch(e) {
            console.error(`Some thing went wrong !\n` + e);
            alert(`Some thing went wrong !`);
        }
    }


    let handleTextChange = (text) => {
        if(text && !regexPincode.test(text)){
            setPincodeError(true);
        }else {
            setPincodeError(false);
        }
        setPinCode(text);
    }


  let handleSubmit = (submmitText) => {
    // Handle form submission here
    if(!addressLine1 || !addressLine2 || !vehicleNoOrParkingNo || !pinCode){
        return alert(`Address feilds cannot be empty!`);
    }
    const addressObj = {
        address_id: 'CUST'+ new Date().getTime(),
        user_id: userProfile?.user_id,
        address_line_1 : addressLine1,
        address_line_2 : addressLine2,
        vehichle_or_parking_no: vehicleNoOrParkingNo,
        alternate_phone_no: alternatePhoneNo || userProfile?.user_phone_no,
        address_type: selectedType,
        pincode: pinCode,
        address_tag: 'other'
    }
    if(submmitText === 'Save')
        saveAddress(addressObj);
    else if(submmitText === 'Edit')
        udpateAddress(addressObj);
    switch(origin_screen_name){
        case "ServiceScreen":
            return navigation.navigate(ServiceOptionsCard);
        case "dailyPass":
            createActivity();
            return navigation.navigate('PaymentScreen', { amount: '100', time: ' within 24hrs', origin_screen_name: 'dailyPass'});   
        default:
            return navigation.goBack();
    }
  };

  let fetchAddressDetailsById = async (id) => {
    try {
        const result = await addressSerivice.fetchAddressDetailsById(id);
        setAddressLine1(result?.address_line_1);
        setAddressLine2(result?.address_line_2);
        setVehicleNoOrParkingNo(result?.vehichle_or_parking_no);
        setPinCode(result?.pincode);
        setSubmmitText('Edit');
    } catch (err){
        console.error(`Error in fetching address details from backend`);
    }
  }

  useEffect(() => {
    if(origin_screen_name === 'address_list'){
        fetchAddressDetailsById(address_id);
    }

    if (selectedId === 4) {
      setSaveAsVisible(1);
    } else {
        setSaveAsVisible(0);
    }
  }, [selectedId, addressLine1, addressLine2, vehicleNoOrParkingNo]);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>

        <View style={tw`bg-white justify-center text-xl p-2 h-full`}>
            <GobackHeaderCard param1='Add new address' param2='true'/>
            <View style={tw`bg-gray-200 rounded-md p-4 m-2 text-white`}>
                <Text style={tw`text-gray-400`}>A detailed address will help our Partner reach your destination easily</Text>
            </View>
            <TextInput
                style={tw`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                placeholder="House/Flat/Floor No."
                value={addressLine1 || ''}
                onChangeText={setAddressLine1}
            />
            {inputError && <Text style={tw`text-red-400 p-4 mr-2 ml-2 mb-4`}>{inputError}</Text>}
            <TextInput
                style={tw`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                placeholder="Apartment/Road/Area"
                value={addressLine2 || ''}
                onChangeText={(text) => setAddressLine2(text)}
            />
            {inputError && <Text  style={tw`text-red-400 p-4 mr-2 ml-2 mb-4`}>{inputError}</Text>}
            <TextInput
                style={tw`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                placeholder="Vehicle No./Parking No."
                value={vehicleNoOrParkingNo || ''}
                onChangeText={(text) => setVehicleNoOrParkingNo(text)}
            />
            <TextInput
                style={tw`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                placeholder="Pincode"
                value={pinCode || ''}
                onChangeText={(text) => handleTextChange(text)}
            />
            {pincodeError && <Text style={tw`text-red-400 p-4 mr-2 ml-2 mb-4`}>{pincodeMessage}</Text>}
            <View>
            <Text style={tw`border-b border-gray-300 p-2 font-semibold text-left text-lg rounded-lg mr-2 `}> Save As </Text>
            <FlatList 
                data={tag}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ItemSeparatorComponent={() => {
                    <View style={[tw`bg-gray-200`, {height: 0.1}]} />
                }}
                renderItem={({item: { id, title, icon, color, enable }}) => enable === 'true' && (
                    <TouchableOpacity
                        disabled={pincodeError}
                        onPress={()=> handleSaveOnPress(id, title)}
                        style={tw`flex flex-row justify-between px-4 py-3 rounded-full`}
                    >
                        <Icon
                            style={tw`mr-2`}
                            name={icon}
                            type="material"
                            color={selectedId === id ? 'black': color}
                            size={24}
                        />
                        <Text syle={tw`bg-white text-center`}>{title}</Text>
                    </TouchableOpacity>
                )}
            />
            </View>
            
            {saveAsVisible === 1 ? 
            <View>
                <TextInput
                    style={tw`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                    placeholder="Save As"
                    value={address.saveAs}
                    onChangeText={(text) => setSaveAs(text)}
                />
                <TextInput
                    style={tw`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                    placeholder="Phone no"
                    value={address.saveAs}
                    onChangeText={(text) => setAlternatePhoneNo(text)}
                />
            </View>
            : null}

            <View style={tw`flex flex-grow justify-end mb-10`}>
                <TouchableOpacity 
                    disabled={disableSaveButton}
                    style={tw`bg-black py-3 m-3 rounded-xl ${disableSaveButton && 'bg-gray-300'}`} 
                    onPress={() => handleSubmit(submmitText)}
                >
                    <Text style={tw`text-center text-white text-xl`}> {submmitText} </Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
};

export default AddressForm;