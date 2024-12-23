import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Expense } from '../store/slices/expensesSlice';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../navigation/RootStack';

import { Ionicons } from '@expo/vector-icons';

import { isAfter, subDays } from 'date-fns';

import ExpensesList from '../components/ExpensesList';

type Props = StackScreenProps<RootStackParamsList, 'Tabs'>;

export default function RecentExpensesScreen({ navigation }: Props) {
    const expenses = useSelector((state: RootState) => state.expenses);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add"
                    size={24}
                    color="black"
                    style={{ marginRight: 10 }}
                    onPress={() =>
                        navigation.navigate('AddExpense', { expenseId: null })
                    }
                />
            ),
        });
    }, [navigation]);

    const lastSevenDaysExpenses = expenses.filter((expense) =>
        isAfter(new Date(expense.date), subDays(new Date(), 7))
    );

    function expenseItemPressHandler(id: number) {
        const foundExpense = expenses.find((expense) => expense.id === id);

        if (!foundExpense) return;

        navigation.navigate('AddExpense', { expenseId: foundExpense.id });
    }

    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.cardText}>
                    Expenses for the last{' '}
                    <Text style={styles.clickableText}>7</Text> days
                </Text>
            </View>
            <ExpensesList
                expenses={lastSevenDaysExpenses}
                onItemPress={expenseItemPressHandler}
            />
            <Button
                title="Go To Add Expense Screen"
                onPress={() => {
                    navigation.navigate('AddExpense', { expenseId: null });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ddd',
        padding: 16,
        margin: 10,
        borderRadius: 6,
    },
    clickableText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

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
