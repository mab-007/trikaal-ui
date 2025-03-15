import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React, {  useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import ScreenConfig from '../service/screenConfig';
import { Dimensions, useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');



const NavOptions = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [flatListConfigData, setFlatListConfigData] = useState(props?.param2 || []);
    const [mountScreenConfig, setMountScreenConfig] = useState(true);
    // Move it to config
    const screen_name = "home_screen";

    let handleOnPress = (item) => {
        navigation.navigate(item.screen, {origin_screen_name: props.param1, title: item.title})
    }

    fetchScreenConfigData = () => {
        
    }

    useEffect(() => {   
        if(mountScreenConfig) {
            const config = ScreenConfig.fetchHelpAndSupportScreenConfig(screen_name);
            setMountScreenConfig(false);
        }
            
    }, []);

    return (
        <View>
            <FlatList
            data={flatListConfigData} 
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={tw`justify-center flex-1`}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleOnPress(item)}
                    style= {tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-${width*0.1} h-${height*0.08} rounded-xl`}
                >
                    <View>
                        <Image 
                            style= {{ width: 100, height: 80, resizeMode: 'cover'}}
                            source={item.image}
                        />
                    </View>
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name="arrowright"
                        color="white"
                        type='antdesign'
                    />
                </TouchableOpacity>
            )}

            />
        </View>
    );
}

export default NavOptions;