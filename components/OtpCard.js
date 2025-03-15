import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import tw from "twrnc";

const OtpCard = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const [resentOtp, setResentOtp] = useState(false);
    const phone = '08918074172';
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    }, []);
    let handleOtpChange = (text) => {
      setOtp(text);
    };
  
    let handleResendOtp = () => {
      setResentOtp(true);
      navigation.navigate('HomeScreen')
      // Add your resend OTP logic here
    };
    
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
          <View style={tw`p-4`}>
            <Text style={tw` text-3xl font-semibold mt-5`}>Welcome !</Text>
            <Text style={tw`mt-5 text-l`}>Enter the 4-digit code sent to you at {phone}. </Text>
          </View>
          
          <View style={tw`flex-row justify-center mt-10`}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <View key={index} style={tw`w-10 h-10 rounded-md border-gray-400 mr-2 flex bg-gray-200 justify-center items-center`}>
                  {otp.length > index ? (
                    <Text style={tw`text-center text-2xl`}>{otp[index]}</Text>
                  ) : (
                    <Text style={tw`text-center text-2xl`}></Text>
                  )}
                </View>
              ))}
            <TextInput
              ref={inputRef}
              value={otp}
              onChangeText={setOtp}
              maxLength={4}
              keyboardType="numeric"
              style={tw`w-0 h-0 bg-gray-400`}
            />
          </View>

          {resentOtp ? (
            <Text style={tw`text-center text-lg mt-5`}>OTP resent successfully!</Text>
          ) : (
            <TouchableOpacity style={tw`mt-10`} onPress={handleResendOtp}>
              <Text style={tw`text-center text-lg`}>Resend OTP</Text>
            </TouchableOpacity>
          )}

            <TouchableOpacity style={tw`flex-row justify-center mt-10`} onPress={handleResendOtp}>
                <Text style={tw`py-3 px-5 bg-gray-200 font-semibold`}>Verify OTP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default OtpCard;