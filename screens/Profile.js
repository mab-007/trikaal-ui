import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBox from '../components/TextBox';
import tw from 'twrnc';
import GobackHeaderCard from '../components/GobackHeaderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectUserProfile } from '../slices/navSlice';

let screenConfig = {
  normal_phone : {
      regex: /^\d{10}$/,
      errorMessage: 'Invalid phone number'
  },
  normal_password : {
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      errorMessage: 'Password must be at least 8 characters, including uppercase, lowercase, digits, and special characters'
  },
  normal_email : {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: 'Invalid email address'
  },
  refferal_code : {
      regex: '',
      errorMessage: 'Refferal code not found'
  }
}



const Profile = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userProfile = useSelector(selectUserProfile);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  // const [veichleNo, setVeichleNo] = useState('');
  const [updatePending, setUpdatePending] = useState(true);

  updateData = () => {
    if('updateValueText' in props)
      props.updateValueText({email_id: email || props.param2, phone_no: phoneNo || props.param3, user_name: name})
  }

  useEffect(() => {
    updateData();
  }, [name, email, phoneNo])


  return (
    <SafeAreaView style={tw`bg-white h-full p-6`}>
      <GobackHeaderCard  param2='true' param1='Edit Profile' />
      <TextBox param1='NAME' param2='Enter your name' param3={props.param1} 
        param4={'' || userProfile?.user_name}
        udpateTextValue={setName}
      />
      <TextBox param1='EMAIL ADDRESS' param2='Enter your email address' param3={props.param1}
        param4={props.param2 || '' || userProfile?.email} param5={screenConfig.normal_email} param6={props.param4}
        udpateTextValue={(text) => setEmail(text || props.param2)}
      />
      <TextBox param1='PHONE NUMBER' param2='Enter your phone number' param3={props.param1}
        param4={props.param3 || '' || userProfile?.user_phone_no} param5={screenConfig.normal_phone} param6={props.param5}
        udpateTextValue={(text) => setPhoneNo(text || props.param3)}
      /> 
      {/* <TextBox param1='VEHICLE NUMBER' param2='Enter your vehicle number' param3={props.param1}
        param4={''}
        udpateTextValue={setVeichleNo}
      /> */}
    </SafeAreaView>
  );
};

export default Profile;