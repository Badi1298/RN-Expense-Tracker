import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootBottomTabs from './navigation/RootBottomTabs';

export default function App() {
    return (
        <NavigationContainer>
            <RootBottomTabs />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
