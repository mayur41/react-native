
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
    const navigation = useNavigation();
    useEffect(() => {
        AsyncStorage.getItem('token').then((value) => {
            if (value !== null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            }
        }
        )
    }, []);

    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}