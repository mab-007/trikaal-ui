import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import activityService from '../service/activity.service';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../slices/navSlice';

// Fetch this from backend

const screenConfig = {
    activity_list : {
        title1: 'KNOCK, KNOCK! HI THERE?',
        title2: `You don't have any activity yet. Book first service know to unlock the experience`
    }
}

const ActivityListCard = (props) => {

    const navigation = useNavigation();
    const userProfile = useSelector(selectUserProfile);
    const [recentActivity, setRecentActivity] = useState([]);
    const [mountActivityList, setMountActivityList] = useState(true);

    let fetchActivityList = async () => {
        try {
            const response = await activityService.fetchActivityList(userProfile.user_id);
            let activityData = [];
            for(let i = 0; i<response.length;i++){
                let obj = {
                    id: response[i]?.activity_id,
                    icon: "local-activity",
                    location: response[i]?.plan_title,
                    destination: response[i]?.plan_description
                }
                activityData.push(obj);
                if(props.param1 === 'HomeScreen' && i==2)break;

            }
            setRecentActivity(activityData);
        } catch(err) {
            console.error(`Error in fetching activity list`);
        }
    }

    let handleOnPress = (id) => {
        navigation.navigate("ActivityDetailsScreen", { activity_id: id})
    }

    useEffect(() => {
        // fetchActivityList();
        //console.log(recentActivity);
        if(mountActivityList){
            fetchActivityList();
            setMountActivityList(false);
        }
    })

    return (
        <SafeAreaView style={tw`h-full flex-1`}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ActivityCard')}
                style={tw`flex-row items-center justify-between p-4`}>
                <Text style={tw`flex-row items-center p-3 font-semibold text-lg`}>RECENT ACTIVITIES</Text>
                {props.param2 === 'enableArrow' && <Icon 
                    name='arrow-forward-outline'
                    type='ionicon'
                />}
            </TouchableOpacity>
            <View style={tw`flex-1`}>
                {recentActivity.length > 0 && 
                <FlatList 
                    data={recentActivity}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={true}
                    ItemSeparatorComponent={() => {
                        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
                    }}
                    renderItem={({ item: { location, destination, icon, id } }) => (
                        <TouchableOpacity 
                            onPress={() => handleOnPress(id)}
                            style={tw`flex-row items-center p-5`}
                        >
                            <Icon 
                                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                                name={icon}
                                type="material"
                                color="black"
                                size={18}
                            />
                            <View>
                                <Text style={tw`font-semibold text-lg`}>{location}</Text>
                                <Text style={tw`text-gray-500`}>{destination}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <View style={tw`justify-center items-center`}>
                            <Text style={tw`text-gray-600 text-center font-semibold text-xl`}>{screenConfig.activity_list.title1}</Text>
                            <Text style={tw`text-gray-600 text-center m-2`}>{screenConfig.activity_list.title2}</Text>
                        </View>
                    )}
                />}
            </View>        
        </SafeAreaView>
    );

}

export default ActivityListCard;
