import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { RootTabParamsList } from '../navigation/RootBottomTabs';

import { Ionicons } from '@expo/vector-icons';

type Props = BottomTabScreenProps<RootTabParamsList, 'RecentExpenses'>;

export default function RecentExpensesScreen({ navigation }: Props) {
    const [showModal, setShowModal] = useState(false);

    navigation.setOptions({
        headerRight: () => (
            <Ionicons
                name="add"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
                onPress={() => setShowModal(true)}
            />
        ),
    });

    return (
        <View>
            <Text>RecentExpensesScreen</Text>
            <Modal animationType="slide" transparent={true} visible={showModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowModal(!showModal)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
