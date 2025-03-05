import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SIGNUP_URL } from '../utils/URL';
import { PostApiRequestNoRedux } from '../utils/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSingup = async () => {
        setLoading(true);
        const payload = {
            name,
            email,
            password
        }
        const singupRes = await PostApiRequestNoRedux({
            url: SIGNUP_URL,
            body: payload
        });
        setLoading(false);

        if (singupRes?.status === "success") {
            AsyncStorage.setItem('token', singupRes?.data?.authToken);
            navigation.navigate('Home');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.signupContainer}>
                <Text style={styles.signupTitle}>Sing Up</Text>
                <TextInput
                    mode="outlined"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={{ marginBottom: 20 }}
                />
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={{ marginBottom: 20 }}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                <Button
                    mode="contained"
                    loading={loading}
                    style={{ marginTop: 20 }}
                    onPress={handleSingup}>
                    Signup
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    signupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    }
});