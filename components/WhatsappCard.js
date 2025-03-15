import React from 'react';
import {  Image, TouchableOpacity } from 'react-native';

const WhatsAppButton = () => {
  const phoneNumber = '+911234567890'; // Replace with the actual phone number
  const url = `whatsapp://send?phone=${phoneNumber}`;

  let handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={require('./whatsapp-logo.png')} // Replace with the actual logo
        style={{ width: 50, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default WhatsAppButton;