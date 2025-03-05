import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_URL } from '../utils/URL';
import { PostApiRequestNoRedux } from '../utils/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const payload = {
            email,
            password
        }
        const loginRes = await PostApiRequestNoRedux({
            url: LOGIN_URL,
            body: payload
        });
        setLoading(false);
        console.log(loginRes, "loginRes=====>");

        if (loginRes?.status === "success") {
            AsyncStorage.setItem('token', loginRes?.data?.authToken);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Let's Login</Text>
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
                    onPress={handleLogin}>
                    Login
                </Button>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ color: 'blue', marginLeft: 5 }}>Signup</Text>
                    </TouchableOpacity>
                </View>
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
    loginContainer: {
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
    loginTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    }
});
