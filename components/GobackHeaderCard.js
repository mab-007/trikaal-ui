import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import tw from 'twrnc';

const GobackHeaderCard = (props) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={tw`flex-row items-center pb-3 p-4`}>
                {props.param2 === 'true' && <Icon 
                    name='arrow-back-outline'
                    type='ionicon'
                />}
                <Text style={tw`p-4 font-bold text-2xl border-b border-gray-700 text-gray-700`}>{props.param1}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default GobackHeaderCard;