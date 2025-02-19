import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ThirdPartyLoginButton = ({ source, containerStyle }) => {
  return (
    <TouchableOpacity className={`${containerStyle}`}>
        <Image source={source} className="rounded-full w-12 h-12 " resizeMode='cover'/>
    </TouchableOpacity>
  )
}

export default ThirdPartyLoginButton