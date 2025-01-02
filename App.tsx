import React, { useEffect } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Provider, useSelector } from 'react-redux';
import { store, useAppDispatch } from './store/index';
import { loadAuthToken } from './store/slices/authSlice';

import RootStack from './navigation/RootStack';

function AppContent() {
    const dispatch = useAppDispatch();
    const authStatus = useSelector((state: { auth: { status: string } }) => state.auth.status);

    useEffect(() => {
        // Load the auth token from async storage
        dispatch(loadAuthToken());
    }, [dispatch]);

    if (authStatus === 'loading') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', rowGap: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                    Checking logged in status...
                </Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (authStatus === 'failed') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center' }}>Failed to load auth token!</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}
