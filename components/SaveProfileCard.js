import { SafeAreaView, View } from "react-native";
import Profile from "../screens/Profile";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from 'twrnc';
import { Icon } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { selectPendingProfile, selectProfileData, selectUserProfile, setPendingProfile, setUserProfile } from "../slices/navSlice";
import { useEffect, useState } from "react";
import profileService from "../service/profile.service";

const SaveProfileCard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const pendingProfile = useSelector(selectPendingProfile)
    const userProfile = useSelector(selectUserProfile);
    const profileData = useSelector(selectProfileData);
    const[details, setDetails] = useState(null);
    const route = useRoute();
    const phone_no = route?.params?.phone_no;
    const email_id = route?.params?.email_id;

    let updateData = async () => {
        try {
            const result  = await profileService.updateUserProfile(userProfile.user_id, details.user_name, details.phone_no, details.email_id);
            dispatch(setUserProfile ({
                    ...userProfile,
                    user_email : details.email_id,
                    user_phone_no : details.phone_no,
                    user_name :  details.user_name,
                    refferal_code: result.data.refferal_code
            }))
            if(!result?.success)
                throw new Error('Some thing went wrong !');

        } catch (err) {
            alert('Something went wrong !');
        }
    }

    let handleSaveProfile = async () => {
        if(!details.email_id || !details.phone_no || !details.user_name){
            return alert(`Please complete your profile.`);
        }
        updateData();
        console.log(userProfile);
        dispatch(setPendingProfile(false));
        navigation.navigate('HomeScreen');
    }

    useEffect(() => {
        console.log(details);
    },[details])
      


    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <Profile param1='false' param2={email_id} param3={phone_no} param4={!!email_id} param5={!!phone_no} updateValueText={setDetails}/>
            <View style={tw` flex-row absolute bottom-0 p-4 mr-5 right-0 bg-gray-200 rounded-full ml-5 mb-5`}>
                <TouchableOpacity
                    onPress={() => handleSaveProfile()}
                >
                    <Icon
                        name='arrow-forward-outline'
                        type='ionicon'
                        color="black"
                        size={40}
                        style={tw`p-2`}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SaveProfileCard;