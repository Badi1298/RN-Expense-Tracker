import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import { RootState } from '../store';
import { useSelector } from 'react-redux';

import { RootTabParamsList } from '../navigation/RootBottomTabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { isAfter, subDays } from 'date-fns';

import ExpensesList from '../components/ExpensesList';

type Props = BottomTabScreenProps<RootTabParamsList, 'RecentExpenses'>;

export default function RecentExpensesScreen({ navigation }: Props) {
    const expenses = useSelector((state: RootState) => state.expenses);

    const lastSevenDaysExpenses = expenses.filter((expense) =>
        isAfter(new Date(expense.date), subDays(new Date(), 7))
    );

    const lastSevenDaysExpensesTotal = lastSevenDaysExpenses.reduce(
        (acc, curr) => {
            return acc + parseFloat(curr.amount);
        },
        0
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
                    Last <Text style={styles.clickableText}>7</Text> days
                </Text>
                <Text style={styles.cardText}>
                    ${lastSevenDaysExpensesTotal.toFixed(2)}
                </Text>
            </View>
            <ExpensesList
                expenses={lastSevenDaysExpenses}
                onItemPress={expenseItemPressHandler}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clickableText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
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
