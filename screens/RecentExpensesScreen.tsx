import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { RootState } from '../store';
import { useSelector } from 'react-redux';

import { RootTabParamsList } from '../navigation/RootBottomTabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { isAfter, subDays } from 'date-fns';

import ExpensesList from '../components/ExpensesList';

type Props = BottomTabScreenProps<RootTabParamsList, 'RecentExpenses'>;

export default function RecentExpensesScreen({ navigation }: Props) {
    const [range, setRange] = useState(7);

    const expenses = useSelector((state: RootState) => state.expenses);

    const expensesInRange = expenses.filter((expense) =>
        isAfter(new Date(expense.date), subDays(new Date(), range))
    );

    const expensesInRangeTotal = expensesInRange.reduce((acc, curr) => {
        return acc + parseFloat(curr.amount);
    }, 0);

    function expenseItemPressHandler(id: number) {
        const foundExpense = expenses.find((expense) => expense.id === id);

        if (!foundExpense) return;

        navigation.navigate('AddExpense', { expenseId: foundExpense.id });
    }

    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.cardText}>
                    Last{' '}
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={range.toString()}
                        onChangeText={(text: string) => setRange(Number(text))}
                    />{' '}
                    days
                </Text>
                <Text style={styles.cardText}>
                    ${expensesInRangeTotal.toFixed(2)}
                </Text>
            </View>
            <ExpensesList
                expenses={expensesInRange}
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
        color: '#666666',
        textDecorationLine: 'underline',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
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
