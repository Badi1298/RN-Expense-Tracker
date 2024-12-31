import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { signIn, signUp } from '../services/auth';

import { Ionicons } from '@expo/vector-icons';

import BaseButton from '../components/ui/BaseButton';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loggingIn, setLoggingIn] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);

    const handleLogin = async () => {
        setLoggingIn(true);
        const token = await signIn(email, password);
        setLoggingIn(false);

        console.log(token);
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        setCreatingUser(true);
        const token = await signUp(email, password);
        setCreatingUser(false);

        console.log(token);
    };

    if (creatingUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Creating User...</Text>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (loggingIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Logging In...</Text>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                />
                <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                    style={styles.icon}
                    onPress={() => setShowPassword((prev) => !prev)}
                />
            </View>
            {!isLogin && (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoCapitalize="none"
                        secureTextEntry={!showConfirmPassword}
                    />
                    <Ionicons
                        name={showConfirmPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="gray"
                        style={styles.icon}
                        onPress={() => setShowConfirmPassword((prev) => !prev)}
                    />
                </View>
            )}
            <BaseButton
                style={styles.buttonContainer}
                title={isLogin ? 'Login' : 'Sign Up'}
                onPress={isLogin ? handleLogin : handleSignup}
            />
            <BaseButton
                style={[
                    styles.buttonContainer,
                    { backgroundColor: 'transparent', elevation: 0 },
                ]}
                textStyle={{ color: 'black' }}
                title={
                    isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Login'
                }
                onPress={() => setIsLogin((prev) => !prev)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    buttonContainer: {
        marginTop: 12,
    },
    passwordContainer: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 8,
        top: 8,
        marginLeft: 8,
    },
});
