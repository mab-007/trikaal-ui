import React, {  useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import PhoneInput from 'react-native-phone-number-input';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeatureFlags, setIsLoggedIn } from '../slices/navSlice';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from '../utils/supbase';

// import { initializeApp } from '@react-native-firebase/app';
// import { getAuth, signInWithPopup, GoogleAuthProvider, auth } from '@react-native-firebase/auth';

/**
 * 
 * @returns 
 * ISSUE: 
 * - Implement otp
 * - Implement signin by google
 * - Fetch Data from backend
 */

let screenConfig = {
  titleHeader : {
    text: 'Log in or create a trikaal account'
  },
  normalEmailSignin : {
    text: 'Continue with Email',
    icon: 'mail',
    iconType: 'ionicon',
    iconColor: 'balck'
  },
  normalPhoneSignin : {
    text: 'Continue with Phone No',
    icon: 'phone',
    iconType: 'material',
    iconColor: 'balck'
  },
  googleSingIn : {
    text: 'Continue with Google',
    icon: 'logo-google',
    iconType: 'ionicon',
    iconColor: 'balck'
  },
  phoneOtpSignIn : {
    text: 'Enter your mobile number',
    buttonText: 'Continue',
  }

}

// const firebaseConfig = {
//   // Your Firebase config
// };


// let handleSignIn = async () => {
//         try{
//             const result = await signinService.login(id, password);
//             fetchAndSaveUserData();
//             if(result === 'Login Successful.'){
//                 dispatch(setIsLoggedIn(true));
//                 navigation.navigate('HomeScreen')
//             } else {
//                 alert(result);
//             }
//         } catch(e){
//             console.log(e);
//             alert('Error in sign in. Please try again');
//         }
//     }


const SignInScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNuber] = useState(null);
    const [confirmationOtpResult, setConfirmationOtpResult] = useState(null);
    const [phoneNumberWithCountryCode, setPhoneNumberWithCountryCode] = useState(null);
    const [disableFeature, setDisableFeature] = useState(false);
    const [mountScreenConfig, setMountScreenConfig] = useState(false);
    const featureFlags = useSelector(selectFeatureFlags);


    let handleOnPress = () => {
      if(!phoneNumber){
        alert('Phone number cannot be empty');
      } else {
        //sendOtpFirebase();
        navigation.navigate('OtpScreen');
      }
    }

    let handleNormalSignIn = (tag) => {
      navigation.navigate('SigninCard', {input_tag_name : tag})
    }

    const handleGoogleSignIn = async () => {
      console.log('Google Sign In');
      try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        if (userInfo.data.idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: userInfo.data.idToken,
          })
          console.log(error, data)
          dispatch(setIsLoggedIn(true));
          navigation.navigate('HomeScreen')
        } else {
          throw new Error('no ID token present!')
        }
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          alert('Something went wrong. Please try again');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          alert('Operation already in process. Please try again');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          alert('Something went wrong. Play service is not available');
        } else {
          // some other error happened
          alert('Something went wrong. Please try again');
        }
      }
    };


    useEffect(() => {
      GoogleSignin.configure({
        webClientId: '293297707646-5gl080j71gvkebhf1jp90v97kpi937mc.apps.googleusercontent.com', // Get this from Google Cloud Console
        offlineAccess: true
      });
      if(!mountScreenConfig){
        //BACKEND: Fetch from backend and update

        setMountScreenConfig(true);
      }
    },[mountScreenConfig])

    return (
      <SafeAreaView style={tw`bg-rose-100 h-full p-2`}>

        <View style={tw`flex p-5 flex-row justify-center items-center`}>
          <Text style={tw`rounded items-center text-2xl font-bold`}>TRIKAAL</Text>
        </View>
        {featureFlags?.sign_in?.phoneOtp?.flag && <View>
          <Text style={tw`p-4 text-2xl`}>{screenConfig?.phoneOtpSignIn?.text}</Text>
          <View style={tw`bg-slate-50 mr-4`} >
          <PhoneInput
            onChangeText={(text) => {
              setPhoneNuber(text);
            }}
            onChangeFormattedText={(text) => {
              setPhoneNumberWithCountryCode(text);
            }}
          />
          </View>
          <TouchableOpacity 
            onPress={() => handleOnPress()}
            style={tw`p-6 border bg-black rounded-xl flex-row px-4 m-3 p-4 mr-4 justify-center`}
          >
            <Text style={tw`text-white text-xl`}>{screenConfig.phoneOtpSignIn.buttonText}</Text>
          </TouchableOpacity>
        </View>}
        {featureFlags?.sign_in?.or_divider?.flag && <Text style={tw`self-center mt-2 px-1 bg-white text-xl`}>OR</Text>}
        <Text style={tw`p-4 font-bold text-xl text-center`}>{screenConfig?.titleHeader?.text}</Text>
    
        <View style={tw`mt-5 p-4`}>
            {featureFlags?.sign_in?.googleSignIn?.flag && <TouchableOpacity
              onPress = {() => handleGoogleSignIn()}
              style={tw`flex-row items-center justify-center py-3 px-5 bg-rose-200 rounded-lg`}
            >
              <Icon
                name={screenConfig.googleSingIn.icon}
                type={screenConfig.googleSingIn.iconType}
                color={screenConfig.googleSingIn.iconColor}
                style={tw`p-2`}
              />
              <Text style={tw`text-lg font-semibold`}>{screenConfig.googleSingIn.text}</Text>
            </TouchableOpacity>}
            {featureFlags?.sign_in?.googleSignIn?.flag && <Text style={tw`self-center mt-2 px-1 bg-rose-100 text-xl`}>OR</Text>}
            {featureFlags?.sign_in?.normalEmailSignIn?.flag && <TouchableOpacity 
              onPress={() => handleNormalSignIn('EMAIL ID')}
              style={tw`flex-row items-center justify-center py-3 px-5 bg-rose-200 rounded-lg mt-5`}
            >
              <Icon
                name={screenConfig.normalEmailSignin.icon}
                type={screenConfig.normalEmailSignin.iconType}
                color={screenConfig.normalEmailSignin.iconColor}
                style={tw`p-2`}
              />
               <Text style={tw`text-lg font-semibold`}>{screenConfig.normalEmailSignin.text}</Text>
            </TouchableOpacity>}
            {featureFlags?.sign_in?.normalPhoneSignIn?.flag &&<TouchableOpacity 
              onPress={() => handleNormalSignIn('PHONE NUMBER')}
              style={tw`flex-row items-center justify-center py-3 px-5 bg-rose-200 rounded-lg mt-5`}
            >
              <Icon
                name={screenConfig.normalPhoneSignin.icon}
                type={screenConfig.normalPhoneSignin.iconType}
                color={screenConfig.normalPhoneSignin.iconColor}
                style={tw`p-2`}
              />
               <Text style={tw`text-lg font-semibold`}>{screenConfig?.normalPhoneSignin?.text}</Text>
            </TouchableOpacity>}
          </View>
          <View style={tw`absolute bottom-0 p-4 left-0 bg-rose-200 rounded-full ml-5 mb-5`}>
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

export default SignInScreen;