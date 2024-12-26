import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { RootState } from '../store';
import { useSelector } from 'react-redux';

import { RootTabParamsList } from '../navigation/RootBottomTabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { isAfter, subDays } from 'date-fns';
import { debounce } from 'lodash';

import ExpensesList from '../components/ExpensesList';

type Props = BottomTabScreenProps<RootTabParamsList, 'RecentExpenses'>;

export default function RecentExpensesScreen({ navigation }: Props) {
    const [range, setRange] = useState(7);
    const [tempRange, setTempRange] = useState('');
    const debouncedSetRange = useCallback(
        debounce((value) => {
            const numericValue = Number(value);
            if (isNaN(numericValue)) return;

            setRange(numericValue);
        }, 500),
        []
    );

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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.cardText}>Last</Text>
                    <TextInput
                        style={styles.input}
                        value={tempRange}
                        keyboardType="numeric"
                        onChangeText={(value) => {
                            setTempRange(value);
                            debouncedSetRange(value);
                        }}
                    />
                    <Text style={styles.cardText}>days</Text>
                </View>
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
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontWeight: 'bold',
        color: '#666666',
        padding: 0,
        marginHorizontal: 5,
        minWidth: 34,
        fontSize: 18,
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
