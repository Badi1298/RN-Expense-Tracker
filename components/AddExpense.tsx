import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense } from '../store/slices/expensesSlice';

import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

import BaseButton from './ui/BaseButton';

type Props = {
    showModal: boolean;
    onHideModal: () => void;
};

export default function AddExpense({ showModal, onHideModal }: Props) {
    const expenses = useSelector((state: RootState) => state.expenses);
    const dispatch = useDispatch();

    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        date: dayjs(),
    });

    function hideModalHandler() {
        onHideModal();
    }

    function addExpenseHandler() {
        if (expense.title === '' || expense.amount === '') {
            return;
        }

        dispatch(
            addExpense({
                id: expenses.length + 1,
                title: expense.title,
                amount: expense.amount,
                date: expense.date.toString(),
            })
        );

        setExpense({
            title: '',
            amount: '',
            date: dayjs(),
        });

        hideModalHandler();
    }

    return (
        <Modal animationType="fade" transparent={true} visible={showModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Expense</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Expense Title:</Text>
                        <TextInput
                            value={expense.title}
                            style={styles.textInput}
                            onChangeText={(text) =>
                                setExpense((prev) => ({
                                    ...prev,
                                    title: text,
                                }))
                            }
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Expense Amount:</Text>
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
                        date={expense.date}
                        onChange={(params) => {
                            setExpense((prev) => ({
                                ...prev,
                                date: dayjs(params.date),
                            }));
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
        backgroundColor: 'rgba(0,0,0,0.5)',
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
        marginBottom: 15,
    },
    labelText: {
        marginBottom: 4,
    },
    textInput: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
