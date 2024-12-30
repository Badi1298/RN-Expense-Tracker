import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BaseButton from '../components/ui/BaseButton';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleSignup = () => {
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        // Handle signup logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

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
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
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
});
