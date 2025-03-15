import { SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from 'twrnc'
;
import TextBox from "./TextBox";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Icon } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, setIsLoggedIn, setIsLoggedOut, setPendingProfile, setUserProfile } from "../slices/navSlice";
import ProfileService from "../service/profile.service";
import signinService from "../service/signin.service";
import profileService from "../service/profile.service";
import screenConfigService from "../service/screenConfig";
/**
 * 
 * @returns 
 * TOOD
 * - Integrate with backend
 */

let screenConfig = {
    normal_phone : {
        regex: /^\d{10}$/,
        errorMessage: 'Invalid phone number'
    },
    normal_password : {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        errorMessage: 'Password must be at least 8 characters, including uppercase, lowercase, digits, and special characters'
    },
    normal_email : {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: 'Invalid email address'
    },
    refferal_code : {
        regex: '',
        errorMessage: 'Refferal code not found'
    }
}


const SigninCard = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();

    const [newCustomer, setNewCustomer] = useState(false);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [manatoryFieldsCheck, setMandatoryFieldCheck] = useState(true);
    const tag = route.params?.input_tag_name;
    const [mountScreenConfig, setMountScreenConfig] = useState(true);
    const [flow, setFlow] = useState('SignIn');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    const [refferCode, setRefferCode] = useState(null);
    const [fetchIdData, setFetchIdData] = useState(true);
    const [resetPassword, setResetPasswor] = useState(false);
    const userProfile = useSelector(selectUserProfile);
    

    let handleSignUp = async () => {
        //Backend: Create User
        try {
            if(!password || !rePassword || !id){
                setMandatoryFieldCheck(false);
            }
            const signUpstatus = await signinService.signup(id, password, refferCode);
            if(!signUpstatus?.status){
                console.log(`Sign Up failed due to: \n` + signUpstatus);
                throw new Error('Sign Up failed')
            }
            dispatch(setIsLoggedIn(true));
            dispatch(setIsLoggedOut(false))
            if(tag == 'PHONE NUMBER')
                dispatch(setUserProfile({
                    phone: phone,
                    user_id: signUpstatus.data.user_id,
                    refferal_code: signUpstatus?.data?.refferal_code
                }))
                
            if(tag == 'EMAIL ID')
                dispatch(setUserProfile({
                    email: email,
                    user_id: signUpstatus.data.user_id,
                    refferal_code: signUpstatus?.data?.refferal_code
                }))
            
            dispatch(setPendingProfile(true));
            navigation.navigate('SaveProfileScreen', { phone_no: phone || '', email_id: email || ''});

        } catch(e){
            console.log(e);
            //alert(`Something went wrong !`)
        }
    }

    let fetchAndSaveUserData = async () => {
        try {

            const details = await profileService.fetchProfileDetails(userProfile?.user_id);
            if(!details)
                throw new Error(`Error in fetching user details`);
            dispatch(setUserProfile({
                ...userProfile,
                user_email : details.user_email_id,
                user_phone_no : details.user_phone_no,
                user_name :  details.user_name,
                refferal_code: details?.data?.refferal_code
            }));
        } catch(err) {
            console.error(`Error in fetching user Details \n` + err);
            throw new Error('Error in fetching user details');
        }
    }


    let handleSignIn = async () => {
        try{
            const result = await signinService.login(id, password);
            fetchAndSaveUserData();
            if(result === 'Login Successful.'){
                dispatch(setIsLoggedIn(true));
                navigation.navigate('HomeScreen')
            } else {
                alert(result);
            }
        } catch(e){
            console.log(e);
            alert('Error in sign in. Please try again');
        }
    }



    const fetchData = async () => {     
        if(id && fetchIdData){
            try {
                const result = await signinService.checkIfIdPresent(id);
                if(result?.isPresent){
                    screenConfig.normal_password.Text = '';
                    dispatch(setUserProfile({
                        user_id: result?.user_id
                    }));
                } else {
                    setNewCustomer(true);
                }
                setFetchIdData(false);
            } catch(e) {
                alert('Some thing went wrong');
                console.error('Error in fetching data')
            }
        }     
    }

    useEffect(() => {
        //Backend: Check if use exisit or not
        if(tag === 'EMAIL ID' && email) {
            setFlow('email');
            setId(email)
        } else {
            setFlow('phone');
            setId(phone);
        }
        
        fetchData();
        if(mountScreenConfig) {
            console.log(`inside mount config`);
            setMountScreenConfig(false);
        }

        if(password && rePassword){
            if(password !== rePassword) setPasswordMatch(false);
            else setPasswordMatch(true);
        }

            
    })

    let handleForgotPassword = async () => {
        setResetPasswor(true);
        try {
            console.log('why here');
            if(resetPassword){
                const result = await signinService.triggerForgotPassword(userProfile.user_id);
                if(result)
                    alert(result);
            }
        } catch (err) {
            console.error(`Error in trigger new Passowrd \n` + err);
            alert(`Error in trigger new Passowrd`)
        }
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
          <ScrollView style={tw`p-4 flex-1`}>
            <Text style={tw` text-3xl font-semibold mt-5`}>Welcome !</Text>
            <Text style={tw`mt-5 text-xl mb-5`}>Enter enter your details below </Text>
            {tag === 'EMAIL ID' && <TextBox param1={tag} param2={`Enter your email`} param3='false' param5={screenConfig.normal_email}
                udpateTextValue={setEmail}
            />}
            {tag === 'PHONE NUMBER' && <TextBox param1={tag} param2={`Enter your phone no`} param3='false' param5={screenConfig.normal_phone}
                udpateTextValue={setPhone}
            />}
            <TextBox param1='PASSWORD' param2='Enter your password' param3='false' param5={screenConfig.normal_password} 
                udpateTextValue={setPassword}
            />
            {!newCustomer &&
                <TouchableOpacity 
                    disabled={!id}
                    onPress={() => handleForgotPassword()}
                    style={tw`items-end`}
                >
                    <Text style={tw`text-black ${!id && `text-gray-400`}`}>Forgot Password ?</Text>
                </TouchableOpacity>

            }
            {newCustomer &&
                <TextBox param1='RE-ENTER PASSWORD' param2='Re-Enter your password' param3='false' param5={screenConfig.normal_password} 
                udpateTextValue={setRePassword}
                />
            }
            {newCustomer &&
                <TextBox param1='REFERRAL CODE(Optional)' param2='Enter referral code' param3='false' param5={screenConfig.refferal_code} 
                udpateTextValue={setRefferCode}
                />
            }
            {!passwordMatch &&
                <Text style={tw`text-red-400`}>Password didn't match, please renter !</Text>
            }

            {!manatoryFieldsCheck &&
                <Text style={tw`text-red-400`}>Mandatory Fields cannot be empty !</Text>
            }
          </ScrollView>
           
          <View style={tw` flex-row absolute bottom-0 p-4 mr-5 right-0 bg-gray-200 rounded-full ml-5 mb-5`}>
            {newCustomer ? 
                    <TouchableOpacity
                        onPress={() => handleSignUp()}
                    >
                        <Icon
                        name='arrow-forward-outline'
                        type='ionicon'
                        color="black"
                        size={40}
                        style={tw`p-2`}
                        />
                    </TouchableOpacity>
                :
                
                    <TouchableOpacity
                        onPress={() => handleSignIn()}
                    >
                        <Icon
                        name='arrow-forward-outline'
                        type='ionicon'
                        color="black"
                        size={40}
                        style={tw`p-2`}
                        />
                    </TouchableOpacity>
            }
            </View>
            <View style={tw`absolute bottom-0 p-4 left-0 bg-gray-200 rounded-full ml-5 mb-5`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                    name='arrow-back-outline'
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

export default SigninCard;