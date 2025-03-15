import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsLoggedOut, setIsLoggedIn, setIsLoggedOut } from '../slices/navSlice';
import { View } from 'react-native';
import { Text } from 'react-native';

//TODO: Add sms and push notification

const LogoutCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoggedOut = useSelector(selectIsLoggedOut);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if(!isMounted){
      dispatch(setIsLoggedOut(true));
      dispatch(setIsLoggedIn(false));
      navigation.navigate('BannerScreen');
      setIsMounted(true);

    }

    console.log(isLoggedIn + " " + isLoggedOut);
  }, [dispatch, navigation]);

  return (
    <View>
      <Text>Yos</Text>
    </View>
  );
};

export default LogoutCard;