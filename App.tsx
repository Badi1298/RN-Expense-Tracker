import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './store/index';
import { Provider } from 'react-redux';

import RootStack from './navigation/RootStack';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </Provider>
    );
}
