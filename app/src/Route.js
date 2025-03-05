import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

export default function Route() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}