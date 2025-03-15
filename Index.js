import {  KeyboardAvoidingView, Platform } from "react-native";
import {  useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./store/store";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActivityCard from './components/ActivityCard';
import ReferAndEarn from "./screens/ReferAndEarn";
import AddressForm from "./components/AddressForm";
import Profile from "./screens/Profile";
import SaveAddressOption from "./components/SavedAddressOption";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuccessScreen from "./screens/SuccessScreen";
import NavigateCard from "./components/NavigateCard";
import PaymentScreen from "./screens/PaymentScreen";
import SignInScreen from "./screens/SignInScreen";
import ActivityDetailsCard from "./components/ActivityDetailsCard";
import HelpAndSupport from "./screens/HelpAndSupport";
import Banner from "./screens/Banner";
import OtpCard from "./components/OtpCard";
import LogoutCard from "./components/LogoutCard";
import SigninCard from "./components/SigninCard";
import PendingScreen from "./screens/PendingScreen";
import PassCardNavigation from "./components/PassCardNavigation";
import ServiceScreen from "./screens/ServiceScreen";
import SaveProfileCard from "./components/SaveProfileCard";
import { selectFeatureFlags, selectIsLoggedIn, selectIsLoggedOut, selectPendingProfile, setFeatureFlags, setPendingProfile } from "./slices/navSlice";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";

//TODO
// Populate Backend

let featureFlag = {
  activity_details : {
    enableWarning : { flag: true }
  },
  sign_in : {
    phoneOtp: { flag: false },
    or_divider: { flag: false },
    googleSignIn: { flag: true },
    normalEmailSignIn : { flag: true },
    normalPhoneSignIn: { flag: true }
  },
  add_address : {
    home : { flag: false },
    other: { flag: true },
    work: {flag: false}
  },
  payment_enable : {
    flag: true
  }
}


enableScreens();

export default function App() {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const isLoggedOut = useSelector(selectIsLoggedOut);
  const isProfileUpdatePending = useSelector(selectPendingProfile);
  const [defaultFeatureFlags, setDefaultFeatureFlags] = useState(null);
  const [mountFeatureFlags, setMountFeatureFlags] = useState(true);
  const featureFlagStore = useSelector(selectFeatureFlags);

  useEffect(() => {
    console.log('Profile Pending: ' + isProfileUpdatePending);
    console.log(mountFeatureFlags);
    if(mountFeatureFlags){
      setDefaultFeatureFlags(featureFlag);
      dispatch(setFeatureFlags(featureFlag));
      setMountFeatureFlags(false);
    }
  },[mountFeatureFlags])

  return (
      <NavigationContainer independent>
        <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator
                initialRouteName= {isLoggedIn ? isProfileUpdatePending ? 'SaveProfileScreen' : 'HomeScreen' : isLoggedOut ? 'BannerScreen' : 'HomeScreen'}
            >
              <Stack.Screen 
                name="BannerScreen"
                component={Banner}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name='SignInScreen' 
                component={SignInScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name='HomeScreen' 
                component={HomeScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false
                }}
              />
              <Stack.Screen 
                name='ProfileScreen' 
                component={ProfileScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                  name="ActivityCard"
                  component={ActivityCard}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="AddressForm"
                  component={AddressForm}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="AddressScreen"
                  component={SaveAddressOption}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                name='HelpAndSupportScreen' 
                component={HelpAndSupport}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                  name="ReferAndEarn"
                  component={ReferAndEarn}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="Profile"
                  component={Profile}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="SuccessScreen"
                  component={SuccessScreen}
                  options={{
                      headerShown: false,
                      gestureEnabled: false
                  }}
              />
              <Stack.Screen 
                  name="PaymentScreen"
                  component={PaymentScreen}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="PendingScreen"
                  component={PendingScreen}
                  options={{
                      headerShown: false,
                      gestureEnabled: false
                  }}
              />
              <Stack.Screen 
                  name="NavigateCard"
                  component={NavigateCard}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="SaveProfileScreen"
                  component={SaveProfileCard}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                  name="ActivityDetailsScreen"
                  component={ActivityDetailsCard}
                  options={{
                      headerShown: false
                  }}
              />
              <Stack.Screen 
                name="OtpScreen"
                component={OtpCard}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name="LogoutScreen"
                component={LogoutCard}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name="SigninCard"
                component={SigninCard}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
        </PersistGate>
      </NavigationContainer>
  );
}
