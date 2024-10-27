import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontFamily } from '../../GlobalStyles';

const GetStartedScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/icon.png')}
                style={styles.icon}
            />

            <Text style={styles.welcomeText}>Welcome to List Mate</Text>
            <Text style={styles.subText}>Your Product Manager</Text>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GetStartedScreen;

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
        fontFamily: FontFamily.Arial
    },
    subText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: FontFamily.Arial

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
        fontFamily: FontFamily.Arial

    },
});
