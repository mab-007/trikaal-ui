import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import tw from "twrnc";
import { Dimensions, useWindowDimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const Banner = () => {
    const navigation = useNavigation();
    return (
        <View style={tw`bg-blue-300 h-${height*0.5}`}>
        <SafeAreaView style={tw`bg-rose-100  h-${height*0.5}`}>
            <View style={tw`p-4 justify-center items-center`}>
                <Text style={tw` m-10 mt-20 text-black text-4xl text-center font-sans font-semibold`}>TRIKAAL</Text>
                <Image 
                    source={require("../assets/banner.png")}
                    style={tw`justify-center h-${height * 0.11} w-${width * 0.25}`}
                />
                <Text style={tw` m-1 text-black text-2xl text-center font-mono font-semibold mb-5`}>WITH YOU IN YOU PAST, PRESENT AND FUTURE</Text>
            </View>
            <View style={tw`flex-1`}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={tw`bottom-0 left-0 right-0 p-6 border bg-zinc-700 justify-between rounded-xl flex-row px-4 m-3`}
                >
                    <Text style={tw`text-white text-xl ml-5`}>Get Started</Text> 
                    <Icon 
                        name='arrow-forward-outline'
                        type='ionicon'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </View>
    );
}

export default Banner;