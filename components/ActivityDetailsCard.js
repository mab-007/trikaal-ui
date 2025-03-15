import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import activityService from '../service/activity.service';

const ActivityDetailsCard = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const activity_id = route.params?.activity_id;
    const [mountActivityDetails, setMountActivityDetails] = useState(true);
    const [activityDetails, setActivityDetails] = useState(null);

    let fetchActivityDetails = async () => {
      try {
        const result = await activityService.fetchActivityDetailsById(activity_id);
        setActivityDetails(result);
      } catch(err) {
        console.error(`Error in fetchgin activity details \n` + err);;
        alert(`Something went wrong!`)
      }
    }

    useEffect(() => {
      console.log(activityDetails);
      if(mountActivityDetails){
        fetchActivityDetails();
        setMountActivityDetails(false)

      }
    })

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={tw`flex-row items-center pb-3 p-4`}>
        <Icon 
          name='arrow-back-outline'
          type='ionicon'
        />
        <Text style={tw`p-4 font-bold text-2xl border-b border-gray-700 text-gray-700`}>Activity Details</Text>
      </TouchableOpacity>
      <View style={tw`p-4`}>
        <View style={tw`bg-white rounded-lg shadow-md p-4`}>
          <View style={tw`flex flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-600 text-xl`}>Service Name:</Text>
            <Text style={tw` text-gray-800 text-xl`}>{activityDetails?.activity_name || ''}</Text>
          </View>
          <View style={tw`flex flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-600 text-xl`}>Service Valid Till:</Text>
            <Text style={tw` text-gray-800 text-xl`}>{new Date(activityDetails?.activity_end_date).toDateString() || ''}</Text>
          </View>
          <View style={tw`flex flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-600 text-xl`}>Date of Purchase:</Text>
            <Text style={tw`text-gray-800 text-xl`}>{new Date(activityDetails?.activity_start_date).toDateString() || ''}</Text>
          </View>
          <View style={tw`flex flex-row justify-between`}>
            <Text style={tw`text-gray-600 text-xl`}>Activity Amount:</Text>
            <Text style={tw`text-gray-800 text-xl`}>{activityDetails?.activty_amount || ''}</Text>
          </View>
        </View>
      </View>
      <View style={tw`p-4`}>
        <View style={tw`bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`p-4 font-bold text-2xl border-b border-gray-300 text-gray-700`}>Activity Photos</Text>
          <Text style={tw`p-4`}>Comming Soon !!</Text>
        </View>
        
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ActivityDetailsCard;