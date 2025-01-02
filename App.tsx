import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { loadAuthToken } from './store/slices/authSlice';

import { store, useAppDispatch } from './store/index';
import { Provider, useSelector } from 'react-redux';

import RootStack from './navigation/RootStack';
import { Text } from 'react-native';

function AppContent() {
    const dispatch = useAppDispatch();
    const authStatus = useSelector((state: { auth: { status: string } }) => state.auth.status);

    useEffect(() => {
        // Load the auth token from async storage
        dispatch(loadAuthToken());
    }, [dispatch]);

    if (authStatus === 'loading') {
        return <Text>Loading...</Text>;
    }

    if (authStatus === 'failed') {
        return <Text>Failed to load auth token!</Text>;
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
