import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';


const screenConfig = {
  emialMsg: 'Invalid email',
  phoneMsg: ''
}

const TextBox = (props) => {
  const [defaultEditButton, setDefaultEditButton] = useState(true);
  const [secureEntry, setSecureEntry] = useState(false);
  const [valueText, setValueText] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if(props.param3 === 'false') {
      setDefaultEditButton(false)
    }
    if(props.param1 === 'PASSWORD' || props.param1 === 'RE-ENTER PASSWORD')
      setSecureEntry(true);
  });

  let handleTextChange = async (text) => {
    await setValueText(text);
    console.log(props.param5 && !props?.param5?.regex?.test(text));
    if(props.param5 && !props?.param5?.regex?.test(text)){
      setError(!!props?.param5?.errorMessage);
      return setErrorMessage(props?.param5?.errorMessage);
    } else {
      setError('');
    }
    props.udpateTextValue(text);
  }
  
  return (
    <View style={tw`pb-10`}>
        <TextInput
            style={tw`border rounded-2xl border-gray-400 p-4 font-semibold`}
            placeholder={props.param2}
            value={props?.param4 || valueText}
            onChangeText={handleTextChange}
            secureTextEntry={secureEntry}
            underlineColorAndroid="transparent"
            readOnly={!!props.param6}
        />
        <Text style={tw`absolute ml-5 -mt-2 px-1 bg-white`}>{props.param1}</Text>
        {defaultEditButton && 
          <TouchableOpacity 
            style={tw`absolute right-5 top-4`}
          >
              <Text style={tw`text-gray-500`}>EDIT</Text>
          </TouchableOpacity>
        }
        {error && <Text style={tw`text-red-400 p-4`}>{errorMessage}</Text>}
    </View>
  );
};

export default TextBox;