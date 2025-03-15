import React from 'react'
import { Image, View } from 'react-native'

const Logo = () => {

    return (
      <View>
        <Image
            source={require('../assets/app_logo.png')}
            style={{
                width: 100,
                height: 100,
                margin: 20,
                padding: 10,
            }}
        />
      </View>
    )
}

export default Logo;
