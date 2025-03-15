import { SafeAreaView, Text, View } from "react-native";
import NavigateCard from "./NavigateCard";
import tw from 'twrnc';

/**
 * 
 *  Foam wash
Glass and tyre cleaning
Interior cleaning
 */
const PassCardNavigation = () => {
    return (
        <SafeAreaView style={tw`bg-white h-full`} >
            <View style={tw`p-4 `}>
                <View style={tw`bg-white p-6 border border-gray-200 rounded-xl shadow-md shadow-gray-500 bg-gray-200`}>
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
            </View>
            <NavigateCard param1='dailyPass' />
        </SafeAreaView>
    );

}

export default PassCardNavigation;