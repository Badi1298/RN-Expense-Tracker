import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { saveExpense, Expense } from '../store/slices/expensesSlice';

import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../navigation/RootStack';

type Props = StackScreenProps<RootStackParamsList, 'AddExpense'>;

export default function AddExpense({ route }: Props) {
    const expenseId = route.params.expenseId;

    const expenses = useSelector((state: RootState) => state.expenses);
    const dispatch = useDispatch();

    const [expense, setExpense] = useState<Expense>({
        id: null,
        title: '',
        amount: '',
        date: dayjs().toString(),
    });

    useEffect(() => {
        if (expenseId) {
            const foundExpense = expenses.find(
                (expense) => expense.id === expenseId
            );

            if (foundExpense) {
                setExpense(foundExpense);
            }
        }
    });

    return (
        <ScrollView>
            <View style={styles.centeredView}>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Expense Title:</Text>
                    <TextInput value={expense.title} style={styles.textInput} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Expense Amount:</Text>
                    <TextInput
                        value={expense.amount}
                        style={styles.textInput}
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Text style={styles.labelText}>Expense Date:</Text>
                    <DateTimePicker mode="single" date={expense.date} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 20,
    },

    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    labelText: {
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
});
