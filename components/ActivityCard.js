import React from 'react'
import {  SafeAreaView } from 'react-native'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import ActivityListCard from './ActivitiesListCard';
import GobackHeaderCard from './GobackHeaderCard';

const data = [
    {
        id: 1,
        key: "Service Type",
        value: 'Monthly'
    },
    {
        id: 2,
        key: "Date",
        value: "15/07/2024"
    },
    {
        id: 3,
        key: "Valid Till",
        value: "15/07/2024"
    },
    {
        id: 4,
        key: "Plan Id",
        value: "test-id-dummy"
    }
]

const ActivityCard = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={[tw`bg-white h-full p-6`]}>
            <GobackHeaderCard  param2='true' param1='Activities' />
            <ActivityListCard />
        </SafeAreaView>
    );

}

export default ActivityCard;