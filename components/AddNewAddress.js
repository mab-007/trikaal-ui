import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const AddNewAddress = (props) => {
  const navigation = useNavigation();

  let handleOnPress = () => {
    navigation.navigate('AddressForm', {origin_screen_name: props.param1});
  }

  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  
    const { search } = this.state;

    return (
      <View style={tw`flex flex-grow`}>
        <TouchableOpacity 
            onPress={() => handleOnPress()}
            style={tw`flex flex-row px-4 py-3 rounded-full bg-gray-100 border-gray-900 py-3 m-3`}
        >
            <Icon
                name="add-outline"
                type="ionicon"
                color="black"
                size={30}
            />
            <Text style={tw`text-center  text-xl ml-5 tracking-wide`}>Add new address</Text>
        </TouchableOpacity>
    </View>
        
    );
  
}

export default AddNewAddress;