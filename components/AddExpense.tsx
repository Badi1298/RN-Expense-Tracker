import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';

import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

import BaseButton from './ui/BaseButton';
import { set } from 'date-fns';

type Props = {
    showModal: boolean;
    onHideModal: () => void;
};

export default function AddExpense({ showModal, onHideModal }: Props) {
    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        date: dayjs(),
    });
    const [date, setDate] = useState(dayjs());

    function hideModalHandler() {
        onHideModal();
    }

    function addExpenseHandler() {
        console.log(expense);
    }

    return (
        <Modal animationType="fade" transparent={true} visible={showModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Expense</Text>
                    <View style={styles.inputContainer}>
                        <Text>Expense Title:</Text>
                        <TextInput
                            value={expense.title}
                            style={styles.textInput}
                            onChangeText={(text) =>
                                setExpense((prev) => ({ ...prev, title: text }))
                            }
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Expense Amount:</Text>
                        <TextInput
                            value={expense.amount}
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(text) =>
                                setExpense((prev) => ({
                                    ...prev,
                                    amount: text,
                                }))
                            }
                        />
                    </View>
                    <DateTimePicker
                        mode="single"
                        date={date}
                        onChange={(params) => {
                            setDate(dayjs(params.date));
                        }}
                    />

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
