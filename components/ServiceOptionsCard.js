import React, { useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectFeatureFlags, selectOrderAddressId, selectOrderAddressList, selectService, selectUserProfile } from '../slices/navSlice';
import activityService from '../service/activity.service';
import offeringService from '../service/offering.service';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet from 'react-native-simple-bottom-sheet';
// import PhonePePaymentSDK from 'react-native-phonepe-pg';
// import base64 from 'react-native-base64';
// import sha256 from 'sha256';


const carData = [
    {
        id: "1",
        title: "Normal",
        price: 699,
        offerPrice: 600,
        image: require("../assets/uber_car.webp")
    },
    {
        id: "2",
        title: "Suv",
        price: 699,
        offerPrice: 600,
        image: require("../assets/suv.webp")
    },
    {
        id: "3",
        title: "Luxe",
        price: 699,
        offerPrice: 600,
        image:  require("../assets/luxe.webp")
    }
    
]

const bikeData = [
    {
        id: "1",
        title: "Scooty",
        price: 399,
        offerPrice: 300,
        image:  require("../assets/scooty_logo.png")
    },
    {
        id: "2",
        title: "Bike",
        price: 399,
        offerPrice: 300,
        image:  require("../assets/bike_logo.png")
    },
    {
        id: "3",
        title: "Luxe",
        price: 399,
        offerPrice: 300,
        image:  require("../assets/bike-luxe.jpg")
    }
    
]



const ServiceOptionsCard = () => {
    const refRBSheet = useRef();

    const navigation = useNavigation();
    const serviceStoreData = useSelector(selectService);

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [mountServiceOptions, setMountServiceOptions] = useState(true);
    const [listData, setListData] = useState(carData);
    const orderAddressId = useSelector(selectOrderAddressId);
    const featureFlag = useSelector(selectFeatureFlags);
    const route = useRoute();
    const service_title = route.params.service_title;
    const userProfile = useSelector(selectUserProfile);
    const [appId, setAppId] = useState(null);
    const [environment, setEnvironment] = useState("SANDBOX");
    const [merchantId, setMerchantId] = useState("PGTESTPAYUAT86");
    const [enableLogging, setEnableLogging] = useState(true);

    const getListOptionData = () => {
        switch(serviceStoreData?.serviceName) {
            case "Car Service":
                return carData;
            case "Bike Service":
                return bikeData;
            default:
                return carData;
        }
    }

    let handleOnPress = () => {
        createActivity();
        navigation.navigate('PaymentScreen', {amount: selectedPlan.offerPrice});
        //createTranscation();
        // if(featureFlag?.payment_enable?.flag)
        //     navigation.navigate('PaymentScreen');
        // navigation.navigate('SuccessScreen');

    }

    let createActivity = async () => {
        try {
            const obj = {
                user_id : userProfile.user_id,
                plan_id: selectedPlan.id,
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


    let handleDescriptionOnPress = (id, title, price, offerPrice) => {
        setSelectedPlan({id, title, price, offerPrice})
        setShowModal(true);
        //TODO: Add backend logic for the screen name

    }

    // const generateTransactionId = () => {
    //     const timestamp = Date.now();
    //     const random = Math.floor(Math.random() * 1000000)
    // }

    // let createTranscation = () => {
    //     PhonePePaymentSDK.init(environment, merchantId, appId, enableLogging)
    //     .then((resp) => {
    //         const requestBody = {
    //             merchantId: merchantId,
    //             merchantTransactionId: generateTransactionId(),
    //             merchantUserId: '',
    //             amount: 100*100,
    //             mobileNumber: '8918074172',
    //             callbackUrl: '',
    //             paymentInstrument : {
    //                 type: 'PAY_PAGE'
    //             }
    //         }

    //         const salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
    //         const salt_index = 1;
    //         const payload = JSON.stringify(requestBody);
    //         const payload_main = base64.encode(payload);
    //         const endpointString = payload_main + '/pg/v1/pay' + salt_key;
    //         const checkSum = sha256(endpointString) + '###' + salt_index;

    //         PhonePePaymentSDK.startTransaction(payload_main, checkSum, null, null)
    //         .then(resp => {
    //             console.log(resp);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    const handleDragEnd = (event) => {
        console.log('Hello');
        const { nativeEvent } = event;
        const { dy } = nativeEvent;
    
        // Check if user dragged down
        if (dy > 0) {
          setShowModal(false);
        }
      };

    let fetchPlanOffering = async () => {
        let result = null;
        try{
            if(service_title === 'Bike Wash'){
                result = await offeringService?.fetchActiveBikeCleaningPlan('Two Wheeler') || bikeData;
            } else {
                result = await offeringService?.fetchActiveCarCleaningPlan('Four Wheeler') || carData;
            }
            setListData(result);
        } catch(e) {
            console.error(`Some issue happen in fetching plan \n` + e);
            return getListOptionData();
        }  
    }

    useState(() => {
        console.log('Checking params');
        console.log(route.params);
        if(mountServiceOptions) {
            fetchPlanOffering(); 
            setMountServiceOptions(false);
        }
    })

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
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
            <Text style={tw`text-center py-5 text-xl`}>Pick a service !!</Text>
        </View>
            <FlatList 
                data={listData}
                keyExtractor={(item) => item.id}
                renderItem={({item: { id, title, image, price, offerPrice, description }}) => (
                    <TouchableOpacity 
                        onPress={() => setSelectedPlan({id, title, price, offerPrice}) }
                        style={tw`flex-row justify-between items-center px-10 ${id === selectedPlan?.id && "bg-gray-200"}`}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain"
                            }}
                            source={image}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <TouchableOpacity onPress={() => handleDescriptionOnPress(id, title, price, offerPrice)}>
                                <Text style={tw`text-gray-500`}>details...</Text>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <Text style={tw`text-gray-500 line-through`}>₹{price}</Text>
                            <Text > ₹{offerPrice}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View>
                <TouchableOpacity 
                    disabled={!selectedPlan} 
                    onPress={handleOnPress}
                    style={tw`bg-black py-3 m-3 ${!selectedPlan && 'bg-gray-300'}`}
                >
                    <Text style={tw`text-center text-white text-xl`}> Choose your plan</Text>
                </TouchableOpacity>
            </View>

            {showModal && <BottomSheet onClose={() => setShowModal(false)} >
                <View style={tw`p-4 `}>
                        <Text style={tw`text-lg font-bold text-2xl text-black`}>Pass Benefits</Text>
                        <View style={tw`mt-4`}>
                        <Text style={tw`font-semibold text-gray-500 text-xl`}>Foam wash</Text>
                        <Text style={tw`font-normal text-gray-500 text-sm`}>on all types of cars</Text>
                        </View>
                        <View style={tw`mt-4`}>
                        <Text style={tw`font-semibold text-gray-600 text-xl`}>Glass and Tyre cleaning</Text>
                        <Text style={tw`font-normal text-gray-500 text-sm`}>on all types of cars</Text>
                        </View>
                        <View style={tw`mt-4`}>
                        <Text style={tw`font-semibold text-gray-600 text-xl`}>Interior cleaning</Text>
                        <Text style={tw`font-normal text-gray-500 text-sm`}>on all types of cars</Text>
                        </View>
                </View>

                <View>
                    <TouchableOpacity 
                        disabled={!selectedPlan} 
                        onPress={handleOnPress}
                        style={tw`bottom-0 left-0 right-0 p-4 border bg-black justify-between rounded-2xl flex-row px-4 m-3`}
                    >
                        <Text style={tw`text-white text-xl ml-5`}>Book now at only <Text style={tw`line-through transform rotate-2`}>₹{selectedPlan.price}</Text> ₹{selectedPlan.offerPrice}</Text> 
                        <Icon 
                            name='arrow-forward-outline'
                            type='ionicon'
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </BottomSheet>}
        </SafeAreaView>
    );

}

export default ServiceOptionsCard;
