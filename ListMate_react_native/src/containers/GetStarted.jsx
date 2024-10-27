import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import verifyToken from '../service/VerifyToken';
import { useAuth } from '../service/AuthContext';

const GetStartedScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { handleLogout } = useAuth();

    const checkUserAuth = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.log('is here is the error 1');
            Toast.show({
                text1: 'Authentication Error',
                text2: 'No token found. Redirecting to Sign In.',
                type: 'error',
            });
            navigation.navigate('SignIn');
            return;
        }

        const networkState = await NetInfo.fetch();
        if (!networkState.isConnected) {
            Toast.show({
                text1: 'Internet Connection',
                text2: 'Please turn on your internet',
                type: 'error',
            });
            return;
        }

        setLoading(true);
        setIsButtonDisabled(true);

        Toast.show({
            text1: 'Checking Token',
            text2: 'Verifying your authentication token...',
            type: 'info',
        });

        const isValid = await verifyToken(token);
        if (!isValid) {
            Toast.show({
                text1: 'Session Expired',
                text2: 'Logging you out due to invalid token.',
                type: 'error',
            });
            handleLogout();
        } else {
            Toast.show({
                text1: 'Success',
                text2: 'Token is valid. Redirecting...',
                type: 'success',
            });
        }

        setLoading(false);
        setIsButtonDisabled(false);
        navigation.navigate(isValid ? 'Tabs' : 'SignIn');
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#4A90E2" />}
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <Text style={styles.welcomeText}>Welcome to List Mate</Text>
            <Text style={styles.subText}>Your Product Manager</Text>

            <TouchableOpacity
                style={[styles.button, isButtonDisabled && styles.disabledButton]}
                onPress={checkUserAuth}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            {/* <Toast autoHide={true} visibilityTime={2500} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#B0C4DE',
    },
});

export default GetStartedScreen;
