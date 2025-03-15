import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native';

//Add a redux logic on which the image changes
const Service = (props) => {
    
    getImage = () => {
        switch(props?.param1) {
            case "Car Wash":
                return require("../assets/service_car_background.jpg");
            case "Bike Wash":
                return require("../assets/service-bike-backgroud.jpg");
            default:
                return require("../assets/service_car_background.jpg");
        }
        
    }

    return (
        <View>
            <Image 
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                source={getImage()}
            />
        </View>
    );

}

export default Service;
