import React from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';

type Props = {
    title: string;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
};

export default function BaseButton({ title, onPress, style }: Props) {
    return (
        <Pressable
            style={[styles.button, styles.buttonClose, style]}
            onPress={onPress}
        >
            <Text style={styles.textStyle}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#3D3D3D',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
