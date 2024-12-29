import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { Expense, removeExpense } from '../store/slices/expensesSlice';

import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../navigation/RootStack';

import BaseButton from '../components/ui/BaseButton';
import {
    useGetExpensesQuery,
    useStoreExpenseMutation,
    useUpdateExpenseMutation,
} from '../services/expenses';

type Props = StackScreenProps<RootStackParamsList, 'AddExpense'>;

export default function AddExpense({ route, navigation }: Props) {
    const { data: expenses } = useGetExpensesQuery();
    // const expenses = useSelector((state: RootState) => state.expenses);
    const dispatch = useDispatch();

    const { expenseId } = route.params;

    const [storeExpense] = useStoreExpenseMutation();
    const [updateExpense] = useUpdateExpenseMutation();

    const [expense, setExpense] = useState<Expense>({
        id: null,
        title: '',
        amount: '',
        date: dayjs().toString(),
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (expenseId) {
            const foundExpense = expenses?.find(
                (expense) => expense.id === expenseId
            );

            if (foundExpense) {
                setExpense(foundExpense);
            }
        }
    }, [expenseId, expenses]);

    const validateExpense = () => {
        setSubmitted(true);

        const invalidTitle = expense.title === '';
        const invalidAmount =
            expense.amount === '' || parseInt(expense.amount) < 0;

        if (invalidTitle || invalidAmount) return false;

        return true;
    };

    const handleSaveExpense = () => {
        if (!validateExpense()) return;

        if (expense.id) {
            updateExpense(expense);
        } else {
            storeExpense(expense);
        }

        navigation.goBack();
    };

    const handleDeleteExpense = () => {
        if (!expense.id) return;

        dispatch(removeExpense(expense.id));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.centeredView}>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Expense Title:</Text>
                    <TextInput
                        value={expense.title}
                        style={[
                            styles.textInput,
                            submitted &&
                                !expense.title && { borderColor: 'red' },
                        ]}
                        multiline={true}
                        onChangeText={(text) =>
                            setExpense((prev) => ({ ...prev, title: text }))
                        }
                    />
                    {submitted && expense.title === '' && (
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            Enter a title for your expense
                        </Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Expense Amount:</Text>
                    <TextInput
                        value={expense.amount}
                        style={[
                            styles.textInput,
                            submitted &&
                                !expense.amount && { borderColor: 'red' },
                        ]}
                        keyboardType="decimal-pad"
                        onChangeText={(text) =>
                            setExpense({ ...expense, amount: text })
                        }
                    />
                    {submitted && expense.amount === '' && (
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            Enter the amount for your expense
                        </Text>
                    )}
                    {submitted && parseInt(expense.amount) < 0 && (
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            Enter a valid amount
                        </Text>
                    )}
                </View>
                <View>
                    <Text style={styles.labelText}>Expense Date:</Text>
                    <DateTimePicker
                        mode="single"
                        date={expense.date}
                        selectedItemColor="#3D3D3D"
                        onChange={(params) =>
                            setExpense((prev) => ({
                                ...prev,
                                date:
                                    params.date?.toString() ||
                                    dayjs().toString(),
                            }))
                        }
                    />
                </View>
                <View style={{ rowGap: 10 }}>
                    <BaseButton
                        title="Save Expense"
                        onPress={handleSaveExpense}
                    />
                    {
                        // Only show the delete button if the expense has an id
                        expense.id && (
                            <BaseButton
                                title="Delete Expense"
                                onPress={handleDeleteExpense}
                            />
                        )
                    }
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
