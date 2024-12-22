import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';

import BaseButton from './ui/BaseButton';

type Props = {
    showModal: boolean;
    onHideModal: () => void;
};

export default function AddExpense({ showModal, onHideModal }: Props) {
    function hideModalHandler() {
        onHideModal();
    }

    function addExpenseHandler() {
        // Add expense logic here
    }

    return (
        <Modal animationType="fade" transparent={true} visible={showModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Expense</Text>
                    <View style={styles.inputContainer}>
                        <Text>Expense Title:</Text>
                        <TextInput style={styles.textInput} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Expense Amount:</Text>
                        <TextInput style={styles.textInput} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Expense Date:</Text>
                        <TextInput style={styles.textInput} />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <BaseButton title="Close" onPress={hideModalHandler} />
                        <BaseButton title="Save" onPress={addExpenseHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
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

    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    inputContainer: {
        width: '100%',
        rowGap: 4,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15,
    },

    buttonsContainer: {
        flexDirection: 'row',
        columnGap: 16,
    },
});
